<script lang="ts">
    import { onMount } from "svelte";
    import { Network } from "vis-network";

    export let nodes: Array<{[key: string]: any}>;
    export let edges: Array<string | {[key: string]: any}>;
    export let boldEdges: Array<string> = [];
    export let directed = false;
    export let width = 500;
    export let height = 350;
    export let options = {};
    
    let innerWidth: number;

    $: calcWidth = Math.min(width, Math.max((0.8 * innerWidth || 999999), 250));
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
    $: convertedEdges = edges.map(e => {
      const extraArgs: {[key: string]: any} = {};
      if (typeof e === 'string') {
        if (boldEdges.includes(e)) {
          extraArgs.width = 5;
        }
        const spl = e.split('-');
        e = {from: parseInt(spl[0]), to: parseInt(spl[1])}
      }
      return {...e, ...extraArgs}
    })
    if (directed) {
      options.edges = {arrows: 'to'}
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

<svelte:window bind:innerWidth />
<div
  bind:this={container}
  class='fixedNodeGraph canvasBreadcrumb'
  style={`width:${calcWidth}px;height:${calcHeight}px;`}
/>

<style>
  .fixedNodeGraph {
    margin: auto;
  }
</style>
