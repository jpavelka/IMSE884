<script lang="ts">
    import FixedNodeGraph from "./FixedNodeGraph.svelte";
    import MathInline from "./MathInline.svelte";

    export let nodes: Array<{[key: string]: any}>;
    export let edges: Array<string>;
    export let nodeSize: undefined | number = undefined;
    export let width: undefined | number = undefined;
    export let height: undefined | number = undefined;

    let d: {[key: string]: number} = {};
    let dHist: Array<{[key: string]: number}> = [];
    let p: {[key: string]: string} = {};
    let pHist: Array<{[key: string]: string}> = [];
    let U: Array<string> = [];
    let UHist: Array<Array<string>> = [];
    let v: string | undefined;
    let vHist: Array<string | undefined> = [];
    for (const n of nodes) {
        d[n.label] = n.label === 's' ? 0 : Infinity;
        p[n.label] = '';
        U.push(n.label);
    }
    let edgeObj: {[key: string]: {[key: string]: number}} = {};
    for (const e of edges) {
        const [source, target, dist] = e.split('-');
        if (!Object.keys(edgeObj).includes(source)) {
            edgeObj[source] = {};
        }
        edgeObj[source][target] = parseInt(dist);
    }
    $: vEdges = Object.keys(edgeObj[v || ''] || {}).map(u => `${v}-${u}`);
    $: shorterPaths = vEdges.map(e => e.split('-')[1]).filter(u => p[u] === v);
    let extraEdgeAttrs: {[key: string]: any} = {};
    $: for (const e of edges) {
        let extra: {[key: string]: any} = {}
        let color = U.includes(e.split('-')[0]) ? '' : '#bc5';
        if (vEdges.includes(e.split('-').slice(0, 2).join('-'))) {
            color = 'orange';
        }
        if (color !== '') {
            extra.color = {
                color: color,
            }
        }
        extraEdgeAttrs[e] = extra;
    }
    $: graphNodes = nodes.map(n => {
        let extraAttrs: {[key: string]: any} = {
            extraLabel: `(${
                d[n.label] === Infinity ? '∞' : d[n.label]
            },${
                p[n.label] === '' ? '-' : p[n.label]
            })`
        }
        if (!U.includes(n.label)) {
            extraAttrs.color = {
                background: n.label === v ? 'orange' : 'yellow',
            };
        }
        if (shorterPaths.includes(n.label)) {
            extraAttrs.font = {color: '#d70'};
        }
        return {...n, ...extraAttrs}
    })
    const lastClick = () => {
        d = dHist[dHist.length - 1];
        dHist = dHist.slice(0, -1);
        p = pHist[pHist.length - 1];
        pHist = pHist.slice(0, -1);
        U = UHist[UHist.length - 1];
        UHist = UHist.slice(0, -1);
        v = vHist[vHist.length - 1];
        vHist = vHist.slice(0, -1);
    }
    const nextClick = () => {
        dHist.push({...d});
        pHist.push({...p});
        UHist.push([...U]);
        vHist.push(v);
        if (U.length === 0) {
            v = undefined;
            return
        }
        v = U.sort((a, b) => {
            return d[a] - d[b];
        })[0];
        U = U.filter(u => u !== v);
        for (const u of Object.keys(edgeObj[v] || {})) {
            if (d[u] > d[v] + edgeObj[v][u]) {
                d[u] = d[v] + edgeObj[v][u];
                p[u] = v;
            }
        }
    }
    let bestPath: Array<string> = [];
    $: if (U.length === 0 && !v) {
        bestPath = [];
        let nextV = 't';
        while (!!p[nextV]) {
            bestPath = [nextV].concat(bestPath);
            extraEdgeAttrs[`${p[nextV]}-${nextV}-${edgeObj[p[nextV]][nextV]}`].width = 5;
            nextV = p[nextV];
        }
        bestPath = [nextV].concat(bestPath);
    }
</script>

<FixedNodeGraph
    nodes={graphNodes}
    edges={edges}
    directed={true}
    nodeSize={nodeSize}
    extraEdgeAttrs={extraEdgeAttrs}
    width={width}
    height={height}
/>
<div class=buttonDiv>
    <button
        disabled={U.length === nodes.length}
        on:click={lastClick}
    >Last</button>
    <button
        disabled={U.length === 0 && !v}
        on:click={nextClick}
    >Next</button>
</div>
{#key v}{#if U.length === nodes.length}
    Initialize: Set <MathInline>U={'\\{'}{U}{'\\}'}</MathInline>. For each <MathInline>v\in V</MathInline>, <MathInline>p(v)</MathInline> is undefined and <MathInline>d(v)=\infty</MathInline> (except <MathInline>d(s)=0</MathInline>).
{:else if !!v}
    <div>
        Minimum <MathInline>d(\cdot)</MathInline> value at vertex <MathInline>{v}</MathInline>.
    </div>
    <div>
        {#if U.length === 0}
            <MathInline>U=\emptyset</MathInline>
        {:else}
            <MathInline>U={'\\{'}{U}{'\\}'}</MathInline>
        {/if}
    </div>
    {#if shorterPaths.length === 0}
        No shorter paths found.
    {:else}
        <div>Shorter path{shorterPaths.length === 1 ? '' : 's'} found to <MathInline>{shorterPaths}</MathInline> (with <MathInline>{v}</MathInline> as new predecessor).</div>
    {/if}
{:else}
    <div><MathInline>U</MathInline> is empty, main loop complete. Shortest path has distance <MathInline>d(t)={d['t']}</MathInline>. Constructing path:</div>
    <ul style=margin:0>
        {#each bestPath.toReversed() as u}
            {#if u !== 's'}
                <li>Predecessor of <MathInline>{u}</MathInline> is <MathInline>{p[u]}</MathInline></li>
            {/if}
        {/each}
    </ul>
    <div>Best <MathInline>s-t</MathInline> path: <MathInline>{bestPath.join(' \\rightarrow ')}</MathInline></div>
{/if}{/key}

<div class=spacer/>

<style>
    .buttonDiv {
        display: flex;
        justify-content: center;
    }
</style>
