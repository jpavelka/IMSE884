<script>
    import GlossaryItem from "./GlossaryItem.svelte";
    import Heading from "./Heading.svelte";
    import { definitions } from "./stores";

    $: sortedKeys = Object.keys($definitions.plainText).sort((a, b) => {
        return $definitions.plainText[a].toLowerCase() < $definitions.plainText[b].toLocaleLowerCase() ? -1 : 1
    })
</script>

<Heading level=1 refId=glossary includeDispSecNum={false}>
    Glossary
    <span slot=context>Definitions of key terms.</span>
</Heading>

<div style="border-top:1pt solid #ddd"></div>
{#each sortedKeys as defKey}
    <GlossaryItem refId={defKey} />
{/each}
