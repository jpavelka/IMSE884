<script lang="ts">
    import PopupToggle from "./PopupToggle.svelte";
    import { printMode } from "./stores";
    $: showPopup = false;
    const popupOpenClose = () => {
        showPopup = !showPopup;
    };
</script>

{#if $printMode}
    <span></span>
{:else}
    <PopupToggle bind:show={showPopup}>
        <slot/>
    </PopupToggle><span
        class="footnote"
        role=button
        tabindex="0"
        aria-label="Toggle popup"
        on:keydown={(e) => {
            if (e.key === 'Enter') {
                popupOpenClose()
            }
        }}
        on:click={popupOpenClose}
    >[note]</span>
{/if}

<style>
    .footnote {
        cursor: pointer;
        color: green;
        vertical-align: super;
        font-size: 0.7rem;
    }
</style>
