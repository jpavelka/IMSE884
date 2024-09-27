<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import FixedNodeGraph from "./FixedNodeGraph.svelte";
    import MathInline from "./MathInline.svelte";

    export let nodes: Array<{[key: string]: any}>;
    export let edges: Array<string>;
    export let nodeSize: undefined | number = undefined;
    export let width: undefined | number = undefined;
    export let height: undefined | number = undefined;
    
    let U: Array<string> = [nodes[0].label];
    let UHist: Array<Array<string>> = [U];
    let T: Array<string> = [];
    let THist: Array<Array<string>> = [U];
    let extraEdgeAttrs: {[key: string]: any} = {};;
    const lastClick = () => {
        U = UHist[UHist.length - 1];
        UHist = UHist.slice(0, -1);
        T = THist[THist.length - 1];
        THist = THist.slice(0, -1);
    }
    const nextClick = () => {
        UHist.push([...U]);
        THist.push([...T]);
        let nextVertex = '';
        let nextEdge = '';
        let nextEdgeCost = Infinity;
        for (const e of edges) {
            const eSpl = e.split('-');
            if ((U.includes(eSpl[0]) && !U.includes(eSpl[1])) || (!U.includes(eSpl[0]) && U.includes(eSpl[1]))) {
                if (parseFloat(eSpl[2]) < nextEdgeCost) {
                    nextVertex = U.includes(eSpl[0]) ? eSpl[1] : eSpl[0];
                    nextEdge = e;
                    nextEdgeCost = parseFloat(eSpl[2]);
                }
            }
        }
        U = U.concat([nextVertex]);
        T = T.concat([nextEdge]);
    }
    $: for (const e of edges) {
        extraEdgeAttrs[e] = {}
        if (T.includes(e)) {
            extraEdgeAttrs[e] = {width: 5};
        }
    }
</script>

<FixedNodeGraph
    nodes={nodes}
    edges={edges}
    nodeSize={nodeSize}
    extraEdgeAttrs={extraEdgeAttrs}
    width={width}
    height={height}
/>
<div class=buttonDiv>
    <button
        disabled={U.length === 1}
        on:click={lastClick}
    >Last</button>
    <button
        disabled={U.length === nodes.length}
        on:click={nextClick}
    >Next</button>
</div>
{#key T}
{#if T.length === 0}
    Initializing
{:else}
    Added edge <MathInline>{`(${T[T.length - 1].split('-')[0]},${T[T.length - 1].split('-')[1]})`}</MathInline> as minimum-cost edge out of previous <MathInline>U</MathInline>
{/if}
<div><MathInline>U={'\\{'}{U}{'\\}'}</MathInline></div>
<div>
    {#if T.length === 0}
        <MathInline>T=\emptyset</MathInline>
    {:else}
        <MathInline>T={'\\{'}{T.map(e => `(${e.split('-')[0]},${e.split('-')[1]})`)}{'\\}'}</MathInline>
    {/if}
</div>
{#if U.length === nodes.length}
    Spanning tree created, algorithm complete!
{/if}
{/key}
<div style=margin-bottom:calc(0.5*var(--standardFontSize))/>