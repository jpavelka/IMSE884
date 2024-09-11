<script lang="ts">
    import { onMount } from "svelte";

    export let refId: string;
    export let makeCopy = false;
    
    let div: HTMLElement;
    onMount(() => {
        setTimeout(() => {    
            const itemEl = document.getElementById(refId + ':glossaryEntry') as HTMLElement;
            if (makeCopy) {
                div.innerHTML = itemEl.innerHTML;
            } else {
                itemEl.style.display = 'block';
                div.appendChild(itemEl);
            }
        }, 1)
    })
</script>

<div id={refId + ':InGlossary'} bind:this={div}></div>