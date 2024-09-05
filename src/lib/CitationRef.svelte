<script lang="ts">
    import { citations } from "./stores";
    import PopupToggle from "./PopupToggle.svelte";
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
</script>

{#if citationExists}
    <PopupToggle show={showPopup}>
        {@html citeObj.biblio}
    </PopupToggle><span
        class="ref"
        role=button
        tabindex="0"
        aria-label="Toggle popup"
        on:keydown={popupOpenClose}
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
