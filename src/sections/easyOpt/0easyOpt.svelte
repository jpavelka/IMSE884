<script>
    import Heading from "$lib/Heading.svelte";
    import LpViz from "$lib/LpViz.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
</script>

<Heading refId=easyOpt level=1>
    When <ProblemRef refId=combOpt link={false}/>s are easy
</Heading>

<!-- <LpViz constraints={[
    [1, 1, 1, '<', 3],
    [2, 3, 1, '<', 5.5],
    [0, 0, 1, '<', 2.3]
]}/> -->

Before we dive headlong into the world of $$\NP$$-hard optimization problems, let's take a bit longer to reflect on problems where polynomial-time algorithms do exist. It's worth learning a bit about some theory that ties them together, so we may learn to recognize them when encountered in the wild.

<!-- 
lp and polyhedra
 - intersection of halfspaces = convex hull of points
 - basic solutions = corner points, always an optimal at corner points
 - solving lps: simplex, interior point
 - integral polyhedra (ip for free)
total unimodularity
network flows
matroids
-->
