<script lang="ts">
    import { onMount } from "svelte";
    import { Network } from "vis-network";
    import { scaleFactor, windowInfo } from "./stores";

    export let nodes: Array<{[key: string]: any}>;
    export let edges: Array<string | {[key: string]: any}>;
    export let boldEdges: Array<string> = [];
    export let extraEdgeAttrs: {[key: string]: any} = {};
    export let directed = false;
    export let width = 500;
    export let height = 350;
    export let nodeSize = 60;
    export let options: {[key: string]: any} = {};

    $: calcWidth = Math.min(width, Math.max((0.8 * $windowInfo.innerWidth || 999999), 250));
    $: calcHeight = calcWidth * (height / width);
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
    if (!options.interaction) {
      options.interaction = {
        zoomView: false,
        dragView: false
      }
    }
    if (!options.nodes) {
      options.nodes = {
        margin: 1,
        shape: 'circle'
      }
    }
    if (!options.physics) {
      options.physics = {
        enabled: false
      }
    }
    let nodeLabelToId: {[key: string]: number} = {};
    $: for (const n of convertedNodes) {
      nodeLabelToId[n.label] = n.id;
    }
    $: convertedEdges = edges.map(e => {
      let extraArgs: {[key: string]: any} = {};
      if (typeof e === 'string') {
        extraArgs = extraEdgeAttrs[e] || {};
        if (boldEdges.includes(e.split('-').slice(0, 2).join('-'))) {
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
    $: finalConvertedNodes = convertedNodes.map(x => {
      if (!!x.extraLabel) {
        x.label += `\n${x.extraLabel}`
      }
      return x;
    });
    let container: HTMLElement;
    let network: Network;
    onMount(() => {
      const data = {
        nodes: finalConvertedNodes,
        edges: convertedEdges,
      };
      network = new Network(container, data, options);
    });
    $: if (!!network) {
      network.setData({
        nodes: finalConvertedNodes,
        edges: convertedEdges
      })
      network.redraw();
    }
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
