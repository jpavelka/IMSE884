<script lang='ts'>
    import { onMount } from "svelte";

    export let refId: string;
    export let linkText = '_unknown_'

    let data: HTMLElement;
    $: onMount(() => {
        if (linkText === '_unknown_'){
            const el = document.getElementById('def:' + refId + ':glossaryDisp');
            linkText = data?.innerHTML || el?.innerHTML || '_unknown_';
            linkText = linkText.trim();
        }
    })
</script>

<div style=display:none; bind:this={data}><slot/></div>
<a href={'#def:' + refId + ':InGlossary'}>{@html linkText}</a>