<script lang="ts">
    import { refNumbering } from "$lib";
    import { figures } from "./stores";
    export let refId: string;

    refId = refNumbering(figures, refId, "fig");
    const figNum = $figures.numbers[refId];
    $: returnId = $figures.returnIds[refId];
</script>

<div class=figDiv id={refId}>
    <slot />
    <div class="caption"><b>Figure {figNum}:</b> <slot name="caption" /></div>
    {#if !!returnId}    
        <a
        style="float:right;"
        href={"#" + returnId}
        on:click={() => {
            figures.update((s) => {
                delete s.returnIds[refId];
                return s;
            });
        }}
        >
        ↩︎</a
        >
    {/if}
</div>

<style>
    .figDiv {
        max-width: 90%;
        overflow-x: auto;
        overflow-y: hidden;
    }
    .caption {
        font-size: 1.2rem;
    }
</style>
