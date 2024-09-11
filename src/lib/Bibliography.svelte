<script>
    import Algorithms from "../sections/combOptIntro/Algorithms.svelte";
import Heading from "./Heading.svelte";
    import { citations, printMode } from "./stores";

    let citeList = [];
    for (const citeId of Object.keys($citations)) {
        const ct = $citations[citeId];
        if (ct.referenced) {
            citeList.push({
                ...{citeId: citeId},
                ...ct
            });
        }
    }
</script>

<Heading refId=bibliography level=1 includeDispSecNum={false}>References</Heading>
<div class=bib>
    {#each citeList.sort() as ct}
        <div
            class={'bibline' + ($printMode ? ' biblinePrintMode' : '')}
            id={ct.citeId}
        >
            {#if !!ct.image}
                <div style=display:flex;flex-direction:row>
                    <img 
                        style=max-height:5rem;margin-right:1rem;
                        src={ct.image}
                        alt="Book cover"
                    />
                    <div>
                        {@html ct.biblio}
                        {#if !!ct.libLink}
                            <div class=libLink>
                                Available online from the <a href={ct.libLink} target="_blank">K-State library</a>
                            </div>
                        {/if}
                    </div>
                </div>
            {:else}
                {@html ct.biblio}
            {/if}
        </div>
    {/each}
</div>

<style>
    .bib {
        border-top: 1pt solid #ddd;
        padding-top: 1rem;
    }
    .bibline {
        overflow-x: auto;
        font-size: 1.3rem;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1pt solid #ddd;
    }
    .biblinePrintMode {
        font-size: 1rem;
    }
    .libLink {
        margin-top: 0.5rem;
        font-size: 1rem;
    }
</style>
