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
                    class=fontSizeButton
                    disabled={$scaleFactor === 0.5}
                    on:click={() => scaleFactor.update(f => f - 0.125)}
                >-</button>
                <button
                    class=fontSizeButton
                    disabled={$scaleFactor === 1.5}
                    on:click={() => scaleFactor.update(f => f + 0.125)}
                >+</button>
            </div>
        </div>
        <div class=menuItem style=display:block>
            Glossary lookup
            <input
                bind:value={searchString}
                style=height:1.5rem;width:90%;
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
        line-height: 2.1rem;transition: 0.3s;
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
    }
    .fontSizeButton {
        width: 3rem;
        height: 2rem;
        font-size: 1.4rem;
        border-radius: 0.5rem;
    }
    .s--inner button span {
        user-select: none;
        pointer-events:none;
        padding: 0.25em;
    }
    .s--inner button:focus {
        outline: var(--accent-color) solid 1px;
    }
    .s--slider {
        display: flex;
        align-items: center;
    }
    .s--slider button {
        width: 3em;
        height: 1.6em;
        position: relative;
        margin: 0 0 0 0.5em;
        background: var(--gray);
        border: none;
    }
    .s--slider button::before {
        content: '';
        position: absolute;
        width: 1.3em;
        height: 1.3em;
        background: #fff;
        top: 0.13em;
        right: 1.5em;
        transition: transform 0.3s;
    }
    .s--slider button[aria-checked='true']{
        background-color: var(--accent-color)
    }
    .s--slider button[aria-checked='true']::before{
        transform: translateX(1.3em);
        transition: transform 0.3s;
    }
    .s--slider button:focus {
        box-shadow: 0 0px 0px 1px var(--accent-color);
    }
</style>