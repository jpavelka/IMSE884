<script lang="ts">
    import { figures, printMode } from "./stores";
    import PopupToggle from "./PopupToggle.svelte";
    
    export let refId: string;
    
    refId = "fig:" + refId;
    const refNum = ($figures.numRefs[refId] || 0) + 1;
    figures.update((s) => {
        if (!Object.keys(s.numRefs).includes(refId)) {
            s.numRefs[refId] = 0;
        }
        s.numRefs[refId] += 1;
        return s;
    });
    $: retId = refId + "-ref" + refNum;
    $: showPopup = false;
    const followBreadcrumbs = (el: HTMLElement, currentTrail: Array<any> = []) => {
        let completedPaths: Array<Array<string>> = [];
        const results = nextBreadcrumbs(el);
        for (const res of results) {
            const nextTrail = currentTrail.concat([res[0]])
            if (res[1] === 'complete') {
                completedPaths.push(nextTrail);
            } else {
                const childEl = el.children[parseInt(res[0])] as HTMLElement;
                completedPaths = completedPaths.concat(followBreadcrumbs(childEl, nextTrail));
            }
        }
        return completedPaths
    }
    const nextBreadcrumbs = (el: HTMLElement) => {
        const path = [];
        for (const childInd in el.children) {
            const childEl = el.children[childInd] as HTMLElement;
            if (!childEl.tagName) {
                continue
            }
            else if (new Set(childEl.classList).intersection(new Set(['canvasBreadcrumb', 'vis-network'])).size > 0) {
                path.push([childInd, 'incomplete']);
            } else if (childEl.tagName.toLowerCase() === 'canvas') {
                path.push([childInd, 'complete']);
            }
        }
        return path;
    }
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
                const canvasPaths = followBreadcrumbs(el);
                for (const cpath of canvasPaths) {
                    let cEl = el as HTMLElement;
                    let cClonedEl = clonedNode as HTMLElement;
                    for (const c of cpath) {
                        cEl = cEl.children[parseInt(c)] as HTMLElement;
                        cClonedEl = cClonedEl.children[parseInt(c)] as HTMLElement;
                    }
                    const context = (cClonedEl as HTMLCanvasElement).getContext('2d');
                    context?.drawImage((cEl as CanvasImageSource), 0, 0);
                }
                popupEl?.appendChild(clonedNode);
                const linkEl = document.createElement("a");
                linkEl.innerHTML = "jump to";
                linkEl.setAttribute("href", "#" + refId);
                linkEl.style.fontSize = "1.2rem";
                linkEl.style.float = "right";
                linkEl.onclick = () => {
                    figures.update((s) => {
                        s.returnIds[refId] = retId;
                        return s;
                    });
                };
                popupEl?.appendChild(linkEl);
            }, timeout);
        }
    };
</script>

{#if $printMode}
    <a class=figRef href={`#${refId}`}
        >Figure {$figures?.numbers[refId]}</a>
{:else}
    <PopupToggle show={showPopup} divId={retId}></PopupToggle>
    <span
        class="eqRef"
        id={retId}
        role=button
        tabindex="0"
        aria-label="Toggle popup"
        on:keydown={popupOpenClose}
        on:click={popupOpenClose}
    >Figure {$figures?.numbers[refId]}</span>
{/if}

<style>
    .eqRef {
        color: green;
        cursor: pointer;
    }
</style>
