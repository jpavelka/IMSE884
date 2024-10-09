<script>
    export let type = '';
</script>

<span class=algoLine>
    <div style=margin-right:0.5rem;>&#8226;</div>
    <div style=width:100%>
        {#if type !== ''}
            <span class=directive>
                {type}
            </span>
        {/if}
        <slot />
    </div>
</span>
<div class=child>
    <slot name=child/>
</div>

<style>
    .algoLine {
        line-height: 2.2rem;
        display: flex;
    }
    .directive {
        font-weight: bold;
        margin-right: 0.5rem;
    }
    .child {
        padding-left: 2rem;
    }
</style>