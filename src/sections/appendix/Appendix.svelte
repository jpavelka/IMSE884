<script>
    import Heading from "$lib/Heading.svelte";
    import GraphTheory from "./GraphTheory.svelte";
    import Symbols from "./Symbols.svelte";
</script>

<Heading refId=appendix level=1 dispSecNum='A' includeDispSecNum={false}>
    Appendix
    <span slot=context>Extra content you may find useful for this course.</span>
</Heading>
<GraphTheory/>
<Symbols/>