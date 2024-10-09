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
        <div class=matchItem>
            <GlossaryItem refId={obj.key} makeCopy={true} />
        </div>
    {/if}
{/each}

<style>
    .matchItem {
        padding: 0.5rem;
        border-top: 1pt solid lightgray;
        font-size: calc(0.95 * var(--standardFontSize));
    }
</style>
