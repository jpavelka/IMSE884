<script lang="ts">
    export let searchString = '';
    import { symbols } from "./stores";
    import { browser } from "$app/environment";
    
    $: includeObj = Object.entries($symbols).map(e => {
        let el: HTMLElement | undefined;
        let matchScore: number = 0;
        const [refId, matchStrs] = e;
        if (browser && searchString.trim() !== '') {
            for (const matchStr of matchStrs.split(',')) {
                const score = matchStr.toLowerCase().includes(searchString.toLowerCase()) ? searchString.length / matchStr.length : 0;
                if (score > matchScore) {
                    matchScore = score;
                }
            }
            if (matchScore > 0) {
                el = document.getElementById(e[0])?.cloneNode(true) as HTMLElement;
                const colonEl = document.createElement('span') as HTMLElement;
                colonEl.innerText = ':'
                el.firstChild?.insertBefore(colonEl, el.firstChild?.childNodes[6])
            }
        }
        return {
            key: refId,
            el: el,
            matchScore: matchScore
        };
    }).sort((a, b) => {
        return b.matchScore - a.matchScore;
    });
</script>

{#each includeObj as obj}
    {#if !!obj.el}
        <div class=matchItem>
            {@html obj.el.innerHTML}
        </div>
    {/if}
{/each}

<style>
    .matchItem {
        padding: 0.5rem;
        border-top: 1pt solid lightgray;
    }
</style>
