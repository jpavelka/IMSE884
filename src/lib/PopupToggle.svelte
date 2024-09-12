<script lang="ts">
    import { onMount } from "svelte";
    import { popupShown, layoutInfo } from "./stores";
    export let show: Boolean
    export let divId = ''
    let popupEl: HTMLElement
    const handleClose = (e: any) => {
        show = false;
    }
    let checkForOpenPopups = () => {return false}
    onMount(() => {
        checkForOpenPopups = () => {
            let keepPopupShown = false;
            for (let el of Array.from(document.getElementsByClassName('popup') as HTMLCollectionOf<HTMLElement>)) {
                if (el.style.display === 'block' && el !== popupEl) {
                    keepPopupShown = true;
                }
            }
            return keepPopupShown;
        }
    })
    $: popupShown.update(() => {
        if (show) {
            return true;
        }
        return checkForOpenPopups();
    });
</script>

<div
    bind:this={popupEl} 
    style={`display:${show ? 'block' : 'none'}`}
    class={`popup popup${$layoutInfo.popupPlacement}`}
    id={divId}
>
    <div
        class="closeX"
        role=button
        tabindex="0"
        aria-label="Toggle popup"
        on:keydown={handleClose}
        on:click={handleClose}
    >×</div>
    <slot/>
</div>

<style>
    .popup {
        border: 1pt solid black;
        border-radius: 10pt;
        position: absolute;
        background-color: #f4f4f4;
        padding: calc(var(--popupPadding) * 1px);
        box-shadow: 2px 3px 5px #999;
        z-index: 1;
        width: calc(var(--popupWidth) * 1px);
    }
    .popupCenter {
        left: 50%;
        transform: translateX(-50%);
    }
    .popupSide {
        left: calc(var(--popupLeft) * 1px);
        transform: translateY(-2rem);
    }
    .popupTop {
        top: 0;
        transform: translate(-50%, 0);
    }
    .closeX {
        color: #222;
        font-size: 30pt;
        font-weight: bold;
        float: right;
        margin-top: -1.2rem;
        margin-right: -0.2rem;
        cursor: pointer;
    }
</style>