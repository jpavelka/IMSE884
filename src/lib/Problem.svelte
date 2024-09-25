<script lang='ts'>
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
            <slot name=name/>
            {#if $$slots.abbrev}(<slot name=abbrev/>){/if}
            {#if !!returnId}    
                <a
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
        </div>
        <div class=section>
            <span class=sectionHeader>Instance:</span>
            <slot name=instance/>
        </div>
        <div class=section>
            <span class=sectionHeader>Problem:</span>
            <slot name=problem/>
        </div>
        {#if $$slots.plainEnglish}
            <div class=section>
                <span class=sectionHeader>In English:</span>
                <slot name=plainEnglish/>
            </div>
        {/if}
    </div>
</div>

<style>
    .problemContainer {
        background-color: #ededed;
        padding: 1.7em;
        border: 1pt solid gray;
        margin: 0.5rem;
    }
    .problemTitle {
        font-weight: bold;
        margin-bottom: 0.5rem;
        font-size: calc(1.1 * var(--standardFontSize));
        text-decoration: underline;
    }
    .sectionHeader {
        font-weight: bold;
    }
    .section {
        margin-top: calc(0.7 * var(--standardFontSize));
    }
</style>