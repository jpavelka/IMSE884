<script>
    import GlossaryLookup from "./GlossaryLookup.svelte";
import Slider from "./Slider.svelte";
    import TocInner from "./TOCInner.svelte";
    import { sections, showMenu, highlightKeyPoints } from "./stores";
    import { slide } from "svelte/transition";

    let showToc = false;
    const toggleTocFunc = () => {
        showToc = !showToc;
    }
    let searchString = '';
</script>

<div class=menu style={`width:${$showMenu ? 'calc(var(--tocWidth) * 1px)' : '0px'}`}>
    <div class=menuItem>
        Contents
        <span
            class=menuExpand
            role=button
            tabindex="0"
            aria-label="Toggle expand"
            on:keydown={toggleTocFunc}
            on:click={toggleTocFunc}
        >
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
    <div class=menuItem style=display:block>
        Glossary lookup
        <input
            bind:value={searchString}
            style=height:1.5rem;width:90%;
        />
        <GlossaryLookup searchString={searchString.trim()} />
    </div>
</div>

<style>
    .menu {
        height: calc(100% - 3.5rem);
        width: 0;
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
    .menuExpand {
        float: right;
        cursor: pointer;
        font-size: 2.5rem;
        font-family: 'Courier New', Courier, monospace;
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