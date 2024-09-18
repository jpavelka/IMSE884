<script lang='ts'>
    export let videoId
    export let params = undefined
    import { afterUpdate } from 'svelte';
    import { printMode, windowInfo } from './stores';

    let srcStr = "https://www.youtube.com/embed/" + videoId;
    let linkStr = "https://www.youtube.com/watch?v=" + videoId;
    if (params !== undefined) {
        srcStr += '?' + Object.entries(params).map(x => `${x[0]}=${x[1]}`).join('&');
    }

    $: seen = false
    let posEl: HTMLElement;
    let pos: number;
    afterUpdate(() => {
        pos = (posEl || {offsetTop: 0}).offsetTop;
        if (pos > 0 && Math.abs(pos - $windowInfo.scrollY) <= 2 * $windowInfo.innerHeight) {
            seen = true;
        }
    })
</script>

<div bind:this={posEl}>
    {#if $printMode}
        (Watch the video at <a href={linkStr}>{linkStr}</a>)
    {:else}
        {#if seen}
            <iframe
                class="basicCenter"
                width="560"
                height="315"
                src={srcStr}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>
        {:else}
            <div>Waiting for <a href={linkStr} target='_blank'>video</a> to load...</div>
        {/if}
    {/if}
</div>
