<script lang="ts">
    import { algorithms, printMode } from "./stores";
    import PopupToggle from "./PopupToggle.svelte";
    
    export let refId: string;
    export let link = true;
    
    refId = "algo:" + refId;
    const refNum = ($algorithms.numRefs[refId] || 0) + 1;
    algorithms.update((s) => {
        if (!Object.keys(s.numRefs).includes(refId)) {
            s.numRefs[refId] = 0;
        }
        s.numRefs[refId] += 1;
        return s;
    });
    $: retId = refId + "-ref" + refNum;
    $: showPopup = false;
    const popupOpenClose = () => {
        showPopup = !showPopup;
        const popupEl = document.getElementById(retId);
        if (popupEl?.childElementCount === 1) {
            let timeout = 0;
            const idEl = document.createElement("div");
            popupEl?.appendChild(idEl);
            setTimeout(function () {
                const el = document.getElementById(refId) as HTMLElement;
                const clonedNode = el.cloneNode(true) as HTMLElement;
                clonedNode.id = clonedNode.id || '';
                clonedNode.id += "Ref" + refNum;
                popupEl?.appendChild(clonedNode);
                const linkEl = document.createElement("a");
                linkEl.innerHTML = "jump to";
                linkEl.setAttribute("href", "#" + refId);
                linkEl.style.fontSize = "1.2rem";
                linkEl.style.float = "right";
                linkEl.onclick = () => {
                    algorithms.update((s) => {
                        s.returnIds[refId] = retId;
                        return s;
                    });
                };
                popupEl?.appendChild(linkEl);
            }, timeout);
        }
    };
    $: algoTextEl = $algorithms.names[refId];
</script>

{#if $printMode}
    <svelte:element
        this={link ? 'a' : 'span'}
        class={link ? 'algoRef' : ''}
        href={`#${refId}`}
    >{@html algoTextEl?.innerHTML}</svelte:element>
{:else}
    {#if link}
        <PopupToggle bind:show={showPopup} divId={retId}></PopupToggle>
        <span
            class="algoRef"
            id={retId}
            role=button
            tabindex="0"
            aria-label="Toggle popup"
            on:keydown={(e) => {
                if (e.key === 'Enter') {
                    popupOpenClose()
                }
            }}
            on:click={popupOpenClose}
        >{@html algoTextEl?.innerHTML}</span>
    {:else}
        {@html algoTextEl?.innerHTML}
    {/if}
{/if}

<style>
    .algoRef {
        color: green;
        cursor: pointer;
    }
</style>
