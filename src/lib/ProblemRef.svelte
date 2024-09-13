<script lang="ts">
    import { problems, printMode } from "./stores";
    import PopupToggle from "./PopupToggle.svelte";
    
    export let refId: string;
    export let desiredRefStyle = 'abbrev';
    export let link = true;
    
    refId = "prob:" + refId;
    const refNum = ($problems.numRefs[refId] || 0) + 1;
    problems.update((s) => {
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
                    problems.update((s) => {
                        s.returnIds[refId] = retId;
                        return s;
                    });
                };
                popupEl?.appendChild(linkEl);
            }, timeout);
        }
    };
    $: refStyle = !$problems.abbrevs[refId] ? 'name' : desiredRefStyle;
    $: probTextEl = refStyle === 'name' ? $problems.names[refId] : $problems.abbrevs[refId];
</script>

{#if $printMode}
    <svelte:element
        this={link ? 'a' : 'span'}
        class={link ? 'eqRef' : ''}
        href={`#${refId}`}
    >{@html probTextEl?.innerHTML}</svelte:element>
{:else}
    {#if link}
        <PopupToggle bind:show={showPopup} divId={retId}></PopupToggle>
        <span
            class="eqRef"
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
        >{@html probTextEl?.innerHTML}</span>
    {:else}
        {@html probTextEl?.innerHTML}
    {/if}
{/if}

<style>
    .eqRef {
        color: green;
        cursor: pointer;
    }
</style>
