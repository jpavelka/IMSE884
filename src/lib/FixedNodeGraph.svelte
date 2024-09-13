<script lang="ts">
    import { onMount } from "svelte";
    import { Network } from "vis-network";
    import { scaleFactor, windowInfo } from "./stores";

    export let nodes: Array<{[key: string]: any}>;
    export let edges: Array<string | {[key: string]: any}>;
    export let boldEdges: Array<string> = [];
    export let directed = false;
    export let width = 500;
    export let height = 350;
    export let options = {};
    
    $: calcWidth = Math.min(width, Math.max((0.8 * $windowInfo.innerWidth || 999999), 250));
    $: calcHeight = calcWidth * (height / width);
    const nodeSize = 30;
    $: widthAvailable = calcWidth - nodeSize;
    $: heightAvailable = calcHeight - nodeSize;

    $: convertedNodes = nodes.map(n => {
      n = JSON.parse(JSON.stringify(n))
      n.fixed = true;
      n.x = n.x * widthAvailable;
      n.y = -n.y * heightAvailable;
      n.widthConstraint = {
        minimum: nodeSize,
        maximum: nodeSize
      }
      n.heightConstraint = {
        minimum: nodeSize,
        maximum: nodeSize
      }
      n.font = {
        size: 20
      }
      if (!n.label) {
        n.label = `${n.id}`;
      }
      return n
    });
    options = {
      interaction: {
        zoomView: false,
        dragView: false
      }
    }
    let nodeLabelToId: {[key: string]: number} = {};
    $: for (const n of convertedNodes) {
      nodeLabelToId[n.label] = n.id;
    }
    $: convertedEdges = edges.map(e => {
      const extraArgs: {[key: string]: any} = {};
      if (typeof e === 'string') {
        if (boldEdges.includes(e)) {
          extraArgs.width = 5;
        }
        const spl = e.split('-');
        const from = parseInt(spl[0]) || nodeLabelToId[spl[0]];
        const to = parseInt(spl[1]) || nodeLabelToId[spl[1]];
        e = {from: from, to: to}
        if (spl.length > 2) {
          e.label = `${spl[2]}`
        }
      }
      return {...e, ...extraArgs}
    })
    if (directed) {
      options.edges = {
        arrows: 'to',
        font: {size: 30, background: 'white'}
      }
    }

    let container: HTMLElement;
    onMount(() => {
      const data = {
        nodes: convertedNodes,
        edges: convertedEdges,
      };
      new Network(container, data, options);
    });
</script>

<div
  bind:this={container}
  class='fixedNodeGraph canvasBreadcrumb'
  style={`width:${calcWidth * $scaleFactor}px;height:${calcHeight * $scaleFactor}px;`}
/>

<style>
  .fixedNodeGraph {
    margin: auto;
  }
</style>
