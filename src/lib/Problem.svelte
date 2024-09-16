<script lang='ts'>
    import BodyText from "./BodyText.svelte";
    import { problems } from "./stores";

    export let refId;
    let nameData: HTMLElement;
    let abbrevData: HTMLElement;

    refId = 'prob:' + refId;
    $: problems.update(p => {
        p.names[refId] = nameData?.firstChild as HTMLElement;
        p.abbrevs[refId] = abbrevData?.firstChild as HTMLElement;
        return p
    })
    $: returnId = $problems.returnIds[refId];
</script>

<span id={refId + ':nameSlot'}  style='display:none' bind:this={nameData}><slot name=name/></span> 
<span id={refId + ':abbrevSlot'} style='display:none' bind:this={abbrevData}><slot name=abbrev/></span>
<div class=problemContainer>
    <div id={refId}>
        <div class=problemTitle>
            <BodyText>
            <slot name=name/>
            {#if $$slots.abbrev}(<slot name=abbrev/>){/if}
            {#if !!returnId}    
                <a
                style="font-size:var(--standardFontSize);"
                href={"#" + returnId}
                on:click={() => {
                    problems.update((s) => {
                        delete s.returnIds[refId];
                        return s;
                    });
                }}
                >
                ↩︎</a
                >
            {/if}
            </BodyText>
        </div>
        <BodyText><div>
            <slot />
        </div></BodyText>
    </div>
</div>

<style>
    .problemContainer {
        background-color: #ededed;
        padding: 1.7em;
        border: 1pt solid gray;
        margin: 0.5rem;
        padding-top: 0;
    }
    .problemTitle {
        font-weight: bold;
        margin-bottom: 0.5rem;
        font-size: calc(1.1 * var(--standardFontSize));
        text-decoration: underline;
    }
</style>