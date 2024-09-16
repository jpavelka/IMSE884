<script>
    export let type = '';
</script>

<span class=algoLine>
    {#if type !== ''}
        <span class=directive>
            {type}
        </span>
    {/if}
    <slot />
    <div class=child>
        <slot name=child/>
    </div>    
</span>

<style>
    .algoLine {
        line-height: 2.2rem;
    }
    .directive {
        font-size: var(--standardFontSize);
        font-weight: bold;
    }
    .child {
        padding-left: 2rem;
    }
</style>