<script lang="ts">
    export let refId: string;
    export let searchStr: string;
</script>

<div id={'sym:' + refId} style=text-indent:-1em;padding-left:1em;>
    <div style=display:inline-block;min-width:1rem;f><slot/></div><span style=margin-left:0.5rem><slot name=desc/></span>
</div>