<script lang="ts">
    import { citations } from "./stores";
    import PopupToggle from "./PopupToggle.svelte";
    import { onMount } from "svelte";
    export let refId: string;
    
    $: showPopup = false;  
    const popupOpenClose = () => {
        showPopup = !showPopup;
    };
    let citeObj: {[key: string]: any}
    const citationExists = Object.keys($citations).includes(refId);
    if (citationExists) {
        citations.update((c) => {
            c[refId].referenced = true;
            return c;
        });
        citeObj = $citations[refId];
    }
    let popupContentEl: HTMLElement;
    onMount(() => {
        setTimeout(() => {
            const el = document.getElementById(refId) as HTMLElement;
            popupContentEl.innerHTML = el.innerHTML;
        }, 1)
    })
</script>

{#if citationExists}
    <PopupToggle bind:show={showPopup}>
        <div style=font-size:1.3rem;overflow-x:auto; bind:this={popupContentEl} />
    </PopupToggle><span
        class="ref"
        role=button
        tabindex="0"
        aria-label="Toggle popup"
        on:keydown={(e) => {
            if (e.key === 'Enter') {
                popupOpenClose()
            }
        }}
        on:click={popupOpenClose}
    >
        {citeObj.refStr}
    </span>
{:else}
    <span class=missingRef>{`(Referenced citation "${refId}" not found)`}</span>
{/if}

<style>
    .ref {
        cursor: pointer;
        color: green;
    }
    .missingRef {
        font-style: italic;
        color: red;
    }
</style>
