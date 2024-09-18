<script lang="ts">
    import { definitions } from "./stores";

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
    let linkToGlossary = false;
    const makeBlink = () => {
        const el = document.getElementById(refId) as HTMLElement;
        el?.classList.add('blinkingText');
    }
    const removeBlink = () => {
        const el = document.getElementById(refId) as HTMLElement;
        el?.classList.remove('blinkingText');
    }
</script>

<span style=display:none; bind:this={data} class=blinkingText><slot/></span>
<span style=display:none; bind:this={dispData}><slot name=glossaryDisp/></span>
<span id={refId} class=inText>
    <slot />{#if linkToGlossary}<a
        href=#{refId + ':glossaryEntry'}
        class=glossaryLink
        title={'Return to glossary'}
        on:click={() => {
            linkToGlossary = false;
            removeBlink();
        }}
    >↩︎</a>{/if}
</span>
<div id={refId + ':glossaryEntry'} class=glossaryDisp style=display:none;>
    <div>
        <a
            class={'inGlossary'}
            href=#{refId}
            on:click={() => {
                linkToGlossary = true;
                makeBlink();
                setTimeout(() => {
                    linkToGlossary = false;
                    removeBlink();
                }, 300000)
            }}
        >
            <span id={refId + ':glossaryDisp'}>
                {#if $$slots.glossaryDisp}<slot name=glossaryDisp />{:else}<slot 
                />{/if}{#if $$slots.context}&nbsp;(<slot name=context />){/if}</span></a>:
        {#if $$slots.definition}
            <slot name=definition />
        {/if}
    </div>
</div>

<style>
    .inText {
        font-style: italic;
        font-weight: bold;
    }
    .inGlossary {
        font-weight: bold;
    }
    .glossaryDisp {
        border-bottom: 1pt solid #ddd;
        padding: 1rem 0;
    }
    .glossaryLink {
        vertical-align: super;
        font-size: 0.7em;
    }
    @keyframes blink {
        0% {
            color: black;
        }
        15% {
            background-color: yellow;
            font-size: 1.5rem;
        }
        30% {
            background-color: yellow;
            font-size: var(--standardFontSize);
        }
        50% {
            background-color: yellow;
        }
        100% {
            color: black;
        }
    }
    .blinkingText {
        animation: blink 10s; 
    }
</style>