<script lang="ts">
    import { onMount } from "svelte";

    export let refId: string;
    
    let div: HTMLElement;
    onMount(() => {
        setTimeout(() => {    
            const itemEl = document.getElementById(refId + ':glossaryEntry');
            div.innerHTML = itemEl?.innerHTML || '';
        }, 1)
    })
</script>

<div id={refId + ':InGlossary'} bind:this={div}></div>