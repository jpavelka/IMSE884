<script lang="ts">
    import { onMount } from "svelte";

    export let refId: string;
    
    let div: HTMLElement;
    onMount(() => {
        setTimeout(() => {    
            const itemEl = document.getElementById(refId + ':glossaryEntry') as HTMLElement;
            itemEl.style.display = 'block';
            div.appendChild(itemEl);
        }, 1)
    })
</script>

<div id={refId + ':InGlossary'} bind:this={div}></div>