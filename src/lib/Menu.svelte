<script lang="ts">
    import GlossaryLookup from "./GlossaryLookup.svelte";
    import Slider from "./Slider.svelte";
    import TocInner from "./TOCInner.svelte";
    import { sections, highlightKeyPoints, scaleFactor, printMode } from "./stores";
    import { slide } from "svelte/transition";

    let showToc = false;
    const toggleTocFunc = (e: Event) => {
        const target = e.target as HTMLElement
        if (!['menuContentsText', 'menuContentsPlusMinus'].includes(target.id)) {
            return
        }
        showToc = !showToc;
    }
    let searchString = '';
</script>

{#if !$printMode}
    <div class=menu>
        <div
            class="menuItem menuItemClick"
            id=menuContentsText
            role=button
            tabindex="0"
            aria-label="Toggle expand"
            on:keydown={(e) => {
                if (e.key === 'Enter') {
                    toggleTocFunc(e)
                }
            }}
            on:click={toggleTocFunc}
        >
            Contents
            <span class=menuExpand id=menuContentsPlusMinus>
                {showToc ? '-' : '+'}
            </span>
        </div>
        {#if showToc}
            <div transition:slide>
                <TocInner hierarchy={$sections.hierarchy}/>
            </div>
        {/if}
        <div class=menuItem>
            Highlight key points
            <Slider bind:value={$highlightKeyPoints} />
        </div>
        <div class=menuItem>
            Font size
            <div>
                <button
                    style=margin-right:0
                    disabled={$scaleFactor === 0.5}
                    on:click={() => scaleFactor.update(f => f - 0.125)}
                >-</button>
                <button
                    disabled={$scaleFactor === 1.5}
                    on:click={() => scaleFactor.update(f => f + 0.125)}
                >+</button>
            </div>
        </div>
        <div class=menuItem style=display:block>
            Glossary lookup
            <input
                bind:value={searchString}
                class=lookupBox
            />
            <GlossaryLookup searchString={searchString.trim()} />
        </div>
    </div>
{/if}

<style>
    .menu {
        height: calc(100% - 3.5rem);
        width: calc(var(--menuWidth) * 1px);
        position: fixed;
        z-index: 3;
        top: 3.5rem;
        left: 0;
        background-color: #ebebeb;
        overflow-x: hidden;
        transition: 0.5s;
        overflow-y: scroll;
    }
    .menuItem {
        font-size: 1.6rem;
        line-height: 2.5rem;
        transition: 0.3s;
        border-bottom: 1pt solid lightgray;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .menuItemClick {
        cursor: pointer;
    }
    .menuExpand {
        float: right;
        cursor: pointer;
        font-size: 2.5rem;
        font-family: 'Courier New', Courier, monospace;
        transform: translateY(calc(0.2 * var(--standardFontSize)));
    }
    .lookupBox {
        font-size: calc(0.8 * var(--standardFontSize));
        line-height: calc(1.2 * var(--standardFontSize));
        width: 90%;
    }
</style>