<script lang=ts>
    import { printMode, showMenu, windowInnerWidth } from "./stores";

    $: tooNarrow = $windowInnerWidth < 500;
</script>

{#if !$printMode}
    <div class=topBar>
        <div
            id='menuClick'
            class=menu
            role=button
            tabindex="0"
            aria-label="Toggle show menu"
            on:keydown={() => {showMenu.update(s => !s)}}
            on:click={() => {showMenu.update(s => !s)}}
        >
            Menu
        </div>
        <div class=courseNum>
            IMSE 884
        </div>
        {#if !tooNarrow}
            <div class=term>
                Spring 2025
            </div>
        {/if}
    </div>
{/if}

<style>
    .topBar {
        position: fixed;
        top: 0;
        font-size: 1.5rem;
        background-color: #ebebeb;
        width: 100%;
        border-bottom: 1pt solid gray;
        padding: 0.5rem 0;
        display: flex;
        justify-content: space-between;
        font-family: Georgia, serif;
        z-index: 4;
        height: 2.5rem;
    }
    .topBar > div {
        padding: 0.5rem 1rem;
    }
    .menu {
        color: blue;
        cursor: pointer;
    }
</style>