<script lang="ts">
    import { onMount } from "svelte";
    export let refId: string;
    export let makeCopy = false;
    
    let div: HTMLElement;
    const makeBlink = () => {
        const el = document.getElementById(refId) as HTMLElement;
        el?.classList.add('blinkingText');
    }
    const removeBlink = () => {
        const el = document.getElementById(refId) as HTMLElement;
        el?.classList.remove('blinkingText');
    }
    onMount(() => {
        setTimeout(() => {    
            const itemEl = document.getElementById(refId + ':glossaryEntry') as HTMLElement;
            if (makeCopy) {
                div.innerHTML = itemEl.innerHTML;
                const linkEl = div.firstChild?.firstChild?.firstChild as HTMLElement;
                linkEl.onclick = () => {
                    makeBlink();
                    setTimeout(() => {
                        removeBlink();
                    }, 10000)
                }
            } else {
                itemEl.style.display = 'block';
                div.appendChild(itemEl);
            }
        }, 1)
    })
</script>

<div id={refId + ':InGlossary'} bind:this={div}></div>