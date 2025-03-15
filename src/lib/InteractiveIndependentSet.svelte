<script lang="ts">
  import { onMount } from "svelte";
  import { Network } from "vis-network";
  import { DataSet } from "vis-data"
  import { layoutInfo } from "./stores";
  import MathInline from "./MathInline.svelte";
  import { solve } from "yalps"
  
  export let nodes;
  export let edges;
  export let seed = undefined;
  export let allowZoom = false;
  export let allowDrag = false;
  export let allowDragNodes = false;
  export let height = 300;
  
  $: width = $layoutInfo.notesWidth;
  let indSet = new Set();
  
  const options = {
    nodes: {
      margin: 1,
      shape: "circle",
    },
    physics: {
      enabled: true,
      stabilization: {
        iterations: 500,
      },
    },
    layout: {},
    height: `${height}px`,
    width: `${width}px`,
    clickToUse: true,
    interaction: {
      zoomView: allowZoom,
      dragView: allowDrag,
      dragNodes: allowDragNodes
    }
  };
  if (seed !== undefined) {
    options.layout = {...options.layout, ...{randomSeed: seed}};
  }
  let container: HTMLElement;
  let network: Network;
  $: graphNodes = new DataSet(Object.entries(nodes).map(e => {
    const [id, weight] = e;
    return {
      id: id,
      label: `${id} - ${weight}`,
      widthConstraint: {
        minimum: 50,
      },
      heightConstraint: {
        minimum: 50,
      },
      chosen: false
    };
  }));
  $: graphEdges = new DataSet(edges.map((x) => {
    return { id: x, from: x.split(",")[0], to: x.split(",")[1], chosen: false };
  }));
  const addNodeToIndSet = (nodeId) => {
    const node = graphNodes.get(nodeId);
    indSet.add(nodeId);
    indSet = new Set([...indSet].sort((a, b) => a < b ? -1 : 1));
    node.color = {
      background: 'orange',
    }
    graphNodes.update(node);
  }
  const removeNodeFromIndSet = (nodeId) => {
    const node = graphNodes.get(nodeId);
    indSet.delete(nodeId);
    indSet = new Set([...indSet].sort((a, b) => a < b ? -1 : 1));
    node.color = {
      background: '#97c2fc',
    }
    graphNodes.update(node);
  }
  onMount(() => {
    network = new Network(container, {}, options);
    setTimeout(() => {
      network.setData({
        nodes: graphNodes,
        edges: graphEdges,
      });
      network.redraw();
    }, 1);
    network.on("stabilizationIterationsDone", function () {
      network.setOptions( { physics: {repulsion: {nodeDistance: 0, centralGravity: 0, springConstant: 0 }}} );
    });
    network.on( 'click', function(props) {
      for (const nodeId of props.nodes) {
        if (indSet.has(nodeId)) {
          removeNodeFromIndSet(nodeId);
        } else {
          const node = graphNodes.get(nodeId);
          const neighbors = props.edges.map(e => e.split(',').filter(x => x !== nodeId)[0]);
          const neighborsInSet = indSet.intersection(new Set(neighbors));
          if (neighborsInSet.size === 0) {
            addNodeToIndSet(nodeId);
          } else {
            const neighborEdges = props.edges.filter(e => {
              return neighborsInSet.has(e.split(',').filter(x => x !== nodeId)[0])
            })
            node.color = {
              background: 'firebrick'
            }
            for (const e of neighborEdges) {
              const edge = graphEdges.get(e);
              edge.chosen = true;
              edge.color = 'firebrick'
              graphEdges.update(edge);
            }
            setTimeout(() => {
              node.color = {
                background: '#97c2fc',
              }
              graphNodes.update(node);
              for (const e of neighborEdges) {
                const edge = graphEdges.get(e);
                edge.chosen = false;
                edge.color = '#639eef'
                graphEdges.update(edge);
              }
            }, 1000)
            graphNodes.update(node);
          }
        }
      }
    });
  });
  let solution = undefined;
  const getOpt = () => {
    const modelVars = {}
    const modelConstrs = {}
    for (const [id, w] of Object.entries(nodes)) {
      modelVars[id] = { weight: w };
    }
    for (const e of edges) {
      modelConstrs[e] = { max: 1 };
      for (const n of e.split(',')) {
        modelVars[n][e] = 1;
      }
    }
    const model = {
      direction: "maximize" as const,
      objective: "weight",
      variables: modelVars,
      constraints: modelConstrs,
      binaries: [...Object.keys(modelVars)], // these variables must have an integer value in the solution
    }
    solution = solve(model)
  }
  const clearSelections = () => {
    for (const nodeId of indSet) {
      removeNodeFromIndSet(nodeId);
    }
  }
  const showOpt = () => {
    clearSelections()
    for (const nodeId of solution.variables.filter(x => x[1] > 0.9).map(x => x[0])) {
      addNodeToIndSet(nodeId);
    }
  }
</script>

<div style=margin:auto>
  <div bind:this={container} />
  <div>
    <MathInline alwaysRender={true}>V'={'\\{ \\:'}</MathInline>{[...indSet].join(', ')}<MathInline>{'\\}'}</MathInline>
    {#if [...indSet].length > 0}
      <button on:click={clearSelections} style=line-height:0.4rem>Clear</button>
    {/if}
  </div>
  <div>
    Weight: {[...indSet].map(n => nodes[n]).reduce((a, b) => a + b, 0)}
  </div>
  {#if !!solution}
    <span style=font-weight:bold>Optimal solution:</span>
    <MathInline alwaysRender={true}>V'={'\\{ \\:'}</MathInline
      >{solution.variables.filter(x => x[1] > 0.9).map(x => x[0]).join(', ')}
    <MathInline>{'\\}'}</MathInline>
    (weight {solution.result})
    <button on:click={showOpt}>Show it</button>
    <button on:click={() => {solution = undefined}}>Hide</button>
  {:else}
    <button on:click={getOpt}>Solve</button>
  {/if}
</div>
