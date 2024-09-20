<script lang="ts">
    import { algorithms } from "./stores";

    export let refId;
    let nameData: HTMLElement;

    refId = 'algo:' + refId;
    $: algorithms.update(p => {
        p.names[refId] = nameData?.firstChild as HTMLElement;
        return p
    })
    $: returnId = $algorithms.returnIds[refId];
</script>

<div class=algoWrapper id={refId}>
    <div class=algoName bind:this={nameData}>
        <slot name=name />
        {#if !!returnId}    
            <a
            href={"#" + returnId}
            on:click={() => {
                algorithms.update((s) => {
                    delete s.returnIds[refId];
                    return s;
                });
            }}
            >
            ↩︎</a
            >
        {/if}
    </div>
    <div class=algoSolves>Solves: <slot name=solves /></div>
    <slot />
</div>

<style>
    .algoWrapper {
        background-color: #ededed;
        padding: 1.7em;
        border: 1pt solid gray;
        margin: 0.5rem;
        padding-top: 0;
    }
    .algoName {
        font-weight: bold;
        margin-top: 2rem;
        font-size: calc(1.1 * var(--standardFontSize));
        text-decoration: underline;
    }
    .algoSolves {
        margin-top: 0.25rem;
        margin-bottom: 1rem;
    }
</style>