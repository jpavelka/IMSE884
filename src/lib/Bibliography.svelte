<script>
    import Heading from "./Heading.svelte";
    import { citations, printMode } from "./stores";

    let citeList = [];
    for (const citeId of Object.keys($citations)) {
        const ct = $citations[citeId];
        if (ct.referenced) {
            citeList.push(ct.biblio);
        }
    }
</script>

<Heading refId=bibliography level=1 includeDispSecNum={false}>References</Heading>
<ul class=bib>
    {#each citeList.sort() as ct}
        <li class={'bibline' + ($printMode ? ' biblinePrintMode' : '')}>{@html ct}</li>
    {/each}
</ul>

<style>
    .bib {
        overflow-x: auto;
    }
    .bibline {
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }
    .biblinePrintMode {
        font-size: 1rem;
    }
</style>
