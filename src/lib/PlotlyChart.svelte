<script>
    import { onMount } from 'svelte';
    import { layoutInfo } from '$lib/stores';
    import { maximizePlotlyChartArea } from '$lib';

    export let data;
    export let layout = {};
    export let plotDiv;
    export let height = 500;
    export let maxChartArea = false;
    $: width = 0.9 * $layoutInfo.notesWidth;
    const ts = Date.now();

    onMount(() => {
        new Plotly.newPlot(plotDiv, data, layout);
        if (maxChartArea) {
            maximizePlotlyChartArea(plotDiv);
        }
    })
</script>

<svelte:head>
    
</svelte:head>

<div
    bind:this={plotDiv}
    id=plotlyDiv{ts}
    style=height:{height}px;width:{width}px;
/>