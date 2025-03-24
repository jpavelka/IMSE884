<script>
    import PlotlyChart from "./PlotlyChart.svelte";
    import { Plane, Vector3, Matrix3 } from 'threejs-math';
    import MathInline from "./MathInline.svelte";
    import { maximizePlotlyChartArea } from "$lib";

    export let constraints
    export let eye = {x: -0.94, y: -1.45, z: 0.30}

    const normalOpacity = 0.2;
    const normalColor = '#aaa'
    const constrs = []
    for (const c of [[1, 0, 0, '>', 0], [0, 1, 0, '>', 0], [0, 0, 1, '>', 0]].concat(constraints)) {
        const v = new Vector3(...c.slice(0, 3));
        const vLen = v.length()
        constrs.push({
            input: c,
            plane: new Plane(v.normalize(), -c[4] / vLen),
            sense: c[3],
            intersections: {}
        })
    }
    const threePlanesIntersect = (p1, p2, p3) => {
        let n1 = p1.normal, n2 = p2.normal, n3 = p3.normal;
        let x1 = p1.coplanarPoint(new Vector3());
        let x2 = p2.coplanarPoint(new Vector3());
        let x3 = p3.coplanarPoint(new Vector3());
        let f1 = new Vector3().crossVectors(n2, n3).multiplyScalar(x1.dot(n1));
        let f2 = new Vector3().crossVectors(n3, n1).multiplyScalar(x2.dot(n2));
        let f3 = new Vector3().crossVectors(n1, n2).multiplyScalar(x3.dot(n3));
        let det = new Matrix3().set(n1.x, n1.y, n1.z, n2.x, n2.y, n2.z, n3.x, n3.y, n3.z).determinant();
        let vectorSum = new Vector3().add(f1).add(f2).add(f3);
        let planeIntersection = new Vector3(vectorSum.x / det, vectorSum.y / det, vectorSum.z / det);
        return planeIntersection;
    }
    const minFeasCoord = new Vector3(Infinity, Infinity, Infinity);
    const maxFeasCoord = new Vector3(-Infinity, -Infinity, -Infinity);
    for (let i=0; i<constrs.length; i++) {
        for (let j=i+1; j<constrs.length; j++) {
            for (let k=j+1; k<constrs.length; k++) {
                const p = threePlanesIntersect(constrs[i].plane, constrs[j].plane, constrs[k].plane);
                const validPoint = isFinite(p.x) && isFinite(p.y) && isFinite(p.z);
                let feasible = validPoint ? true : false;
                for (const c of constrs) {
                    if (!feasible) {
                        break
                    }
                    const d = c.plane.distanceToPoint(p);
                    if (Math.abs(d) < 0.000001) {

                    } else if (d < 0 && c.sense == '>') {
                        feasible = false;
                    } else if (d > 0 && c.sense == '<') {
                        feasible = false;
                    }
                }
                if (feasible) {
                    minFeasCoord.x = Math.min(minFeasCoord.x, p.x);
                    minFeasCoord.y = Math.min(minFeasCoord.y, p.y);
                    minFeasCoord.z = Math.min(minFeasCoord.z, p.z);
                    maxFeasCoord.x = Math.max(maxFeasCoord.x, p.x);
                    maxFeasCoord.y = Math.max(maxFeasCoord.y, p.y);
                    maxFeasCoord.z = Math.max(maxFeasCoord.z, p.z);
                }
                if (validPoint) {
                    for (const combo of [[i, j, k], [j, i, k], [k, i, j]]) {
                        constrs[combo[0]].intersections[`${combo[1]},${combo[2]}`] = {point: p, feasible: feasible};
                    }
                }
            }
        }
    }
    const feasSpread = new Vector3(maxFeasCoord.x - minFeasCoord.x, maxFeasCoord.y - minFeasCoord.y, maxFeasCoord.z - minFeasCoord.z);
    const followPointsAroundPath = (points) => {
        const used = [points[0].key];
        while (used.length < points.length) {
            const currentKey = used[used.length - 1];
            const currentKeySplit = currentKey.split(',');
            const unusedPoints = points.filter(p => !used.includes(p.key));
            const commonPoints = [];
            for (const p of unusedPoints) {
                const keySplit = p.key.split(',');
                for (const x of keySplit) {
                    if (currentKeySplit.includes(x)) {
                        commonPoints.push(p.key);
                        break
                    }
                }
            }
            used.push(commonPoints[0]);
        }
        used.push(used[0])
        return used
    }
    const data = [];
    for (const [ind, c] of constrs.entries())
    {
        const axisIntersections = [];
        const feasibleIntersections = [];
        for (const [k, inter] of Object.entries(c.intersections)) {
            const pointObj = {key: k, point: inter}
            if (inter.feasible) {
                feasibleIntersections.push(pointObj)
            }
            if (Math.max(...(k.split(',').map(x => parseInt(x)))) <= 2) {
                axisIntersections.push(pointObj)
            }
        }
        if (ind >= 3) {
            let planeIntersections = axisIntersections;
            if (axisIntersections.length == 1) {
                const intersectingAxes = axisIntersections[0].key.split(',').map(k => ['x', 'y', 'z'][k]);
                const planeCoord = ['x','y','z'].filter(k => !intersectingAxes.includes(k))[0];
                const rectIntersections = [];
                for (const setup of ['min,min', 'min,max', 'max,min', 'max,max']) {
                    const setupSplit = setup.split(',');
                    const newIntersection = new Vector3();
                    newIntersection[planeCoord] = axisIntersections[0].point.point[planeCoord];
                    for (const axisInd of [0, 1]) {
                        newIntersection[intersectingAxes[axisInd]] = setupSplit[axisInd] == 'min' ? (
                            minFeasCoord[intersectingAxes[axisInd]]
                        ) : maxFeasCoord[intersectingAxes[axisInd]];
                    }
                    const k = `${setupSplit[0]}0,${setupSplit[1]}1`
                    rectIntersections.push({key: k, point: {point: newIntersection}})
                }
                planeIntersections = rectIntersections;
            }
            const axisPointPath = followPointsAroundPath(planeIntersections);
            const pointList = axisPointPath.map(k => planeIntersections.filter(pi => pi.key == k)[0].point.point);
            data.push({
                type: 'mesh3d',
                x: pointList.map(x => x.x),
                y: pointList.map(x => x.y),
                z: pointList.map(x => x.z),
                color: normalColor,
                opacity: normalOpacity,
                hoverinfo: 'skip',
                constrindex: ind - 3
            })
        }
        if (feasibleIntersections.length > 0) {
            const feasiblePointPath = followPointsAroundPath(feasibleIntersections);
            data.push({
                type: 'scatter3d',
                x: feasiblePointPath.map(k => c.intersections[k].point.x),
                y: feasiblePointPath.map(k => c.intersections[k].point.y),
                z: feasiblePointPath.map(k => c.intersections[k].point.z),
                mode: 'lines',
                line: {color: '#000'},
                hovertemplate: 'Corner point: (%{x}, %{y}, %{z})',
                name: ''
            })
        } 
    }
    const getRange = (coord, div=20) => {
        return [Math.max(minFeasCoord[coord] - (feasSpread[coord] / div), 0), maxFeasCoord[coord] + (feasSpread[coord] / div)]
    }
    const maxCoordRange = Math.max(...['x', 'y', 'z'].map(c => {
        const range = getRange(c);
        return range[1] - range[0]
    }))
    const layout = {
        scene: {
            xaxis: {range: getRange('x'), title: {text: 'x₁'}, 'showspikes': false},
            yaxis: {range: getRange('y'), title: {text: 'x₂'}, 'showspikes': false},
            zaxis: {range: getRange('z'), title: {text: 'x₃'}, 'showspikes': false},
            camera: {
                eye: eye
            },
            aspectratio: {x: maxFeasCoord.x / maxCoordRange, y: maxFeasCoord.y / maxCoordRange, z: maxFeasCoord.z / maxCoordRange}
        },
        coloraxis: {
            showscale: false
        }
    };

    let plotDiv

    const dropDowns = constraints.map(c => 'show');
    const constrTexts = constraints.map(c => {
        let s = '';
        for (const i in c.slice(0, 3)) {
            const coeff = c[i];
            if (coeff === 0) {
                continue
            }
            if (coeff > 0 && s !== '') {
                s += ' + '
            }
            s += (coeff === 1 ? '' : coeff) + ` x_{${parseInt(i) + 1}} `
        }
        s += c[3] === '<' ? '\\leq' : c[3] === '>' ? '\\geq' : '='
        s += ' ' + c[4]
        return s
    })
    const selectChange = (e) => {
        const ind = e.target.getAttribute('constrindex');
        console.log(e.target.value);
        const [planeTrace, dataInd] = data.map((t, i) => [t, i]).filter(t => parseInt(t[0].constrindex) === parseInt(ind))[0];
        const updateObj = e.target.value === 'show' ? {color: normalColor, opacity: normalOpacity} : (
            e.target.value === 'hide' ? {opacity: 0} : {color: '#ff0', opacity: 0.5}
        )
        Plotly.restyle(plotDiv, updateObj, dataInd);
        maximizePlotlyChartArea(plotDiv);
    }
</script>

<PlotlyChart data={data} layout={layout} maxChartArea={true} bind:plotDiv={plotDiv}/>
<div>Constraints:</div>
<div style=display:flex;flex-wrap:wrap>
    {#each constrTexts as ct, ind}
        <span style='margin:0.25rem 1rem;'>
            <MathInline>{ct}</MathInline>
            <select style=margin-left:0.5rem; bind:value={dropDowns[ind]} on:change={selectChange} constrindex={ind}>
                <option value="show">show</option>
                <option value="hide">hide</option>
                <option value="highlight">highlight</option>
            </select>
        </span>
    {/each}
</div>