<script>
    import BodyText from "$lib/BodyText.svelte";
    import Heading from "$lib/Heading.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
</script>

<Heading refId=compOptAlgos level=2>
    Some <ProblemRef refId=combOpt link={false} /> algorithms
    <span slot=context>Exploring special-purpose algorithms for some of our example <ProblemRef refId=combOpt link={false} />s</span>
</Heading>

<!--
<BodyText>
    After the previous section, you hopefully have a good feel for the types of problems we're discussing. By now, you probably want to know how to solve them. Countless research papers have been written discussing each of the problems we've defined, and numerous algorithms for solving each of them exist. In this section, we'll take a look at a few special-purpose algorithms for solving some of the problems we've already defined. Get used to algorithms, prove correctness, all that good stuff.
</BodyText>

<BodyText>
    What is an algorithm, anyway?
</BodyText>

dijkstra's shortest path
knapsack dynamic programming
as much fun as this is, can we take a more unified approach?
-->