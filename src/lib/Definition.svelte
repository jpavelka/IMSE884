<script lang="ts">
    import { definitions } from "./stores";
    import BodyText from "./BodyText.svelte";

    export let refId: string;
    export let plainText = '';
    
    refId = 'def:' + refId;
    let data: HTMLElement;
    let dispData: HTMLElement;
    $: if (plainText === '') {
        plainText = dispData?.innerText || data?.innerText || '';
        definitions.update(d => {
            d.plainText[refId] = plainText;
            return d
        })
    }
    definitions.update(d => {
        d.plainText[refId] = plainText;
        return d
    })
</script>

<span style=display:none; bind:this={data}><slot/></span>
<span style=display:none; bind:this={dispData}><slot name=glossaryDisp/></span>
<span id={refId} class=inText>
    <slot />
</span>
<div id={refId + ':glossaryEntry'} style=display:none;>
    <BodyText>
        <a class=inGlossary href=#{refId}>
            <span id={refId + ':glossaryDisp'}>
                {#if $$slots.glossaryDisp}<slot name=glossaryDisp />{:else}<slot 
                />{/if}{#if $$slots.context}&nbsp;(<slot name=context />){/if}</span></a>:
        {#if $$slots.definition}
            <slot name=definition />
        {/if}
    </BodyText>
</div>

<style>
    .inText {
        font-style: italic;
        font-weight: bold;
    }
    .inGlossary {
        font-weight: bold;
    }
</style>