<script lang="ts">
    export let searchString = '';
    import GlossaryItem from "./GlossaryItem.svelte";
    import { definitions } from "./stores";
    
    $: sortedKeys = Object.keys($definitions.plainText).sort((a, b) => {
        return $definitions.plainText[a].toLowerCase() < $definitions.plainText[b].toLocaleLowerCase() ? -1 : 1
    });
    $: includeObj = sortedKeys.map(key => {
        return {
            key: key,
            match: searchString !== '' && $definitions.plainText[key].toLowerCase().includes(searchString.toLowerCase())
        };
    });
</script>

{#each includeObj as obj}
    {#if obj.match}
        <GlossaryItem refId={obj.key} makeCopy={true} />
    {/if}
{/each}
