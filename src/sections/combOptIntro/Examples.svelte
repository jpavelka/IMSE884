<script>
    import Heading from "$lib/Heading.svelte";
    import BodyText from "$lib/BodyText.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import Problem from "$lib/Problem.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import Key from "$lib/Key.svelte";
</script>

<Heading level=2 refId=exampleCOPs>
    Example <ProblemRef refId=combOpt link={false}/>s
    <span slot=context>Presenting a few example <ProblemRef refId=combOpt link={false}/>s to help make sense of the definition.</span>
</Heading>

<BodyText>
    It might take a few examples to really internalize the definition. So, let's go ahead and <Key>present a few <ProblemRef refId=combOpt/>s and examine how they fit the framework</Key>. Several of these are most convenient to define in the language of <Key>graph theory</Key>. If you've seen graphs before, then great! If not, you can brush up on the preliminaries in the appendix, <SectionRef refId=graphTheory/>.
</BodyText>

<BodyText>
    We'll start with a basic one:
</BodyText>

<Problem refId=shortestPath>
    <span slot=name>Shortest Path Problem</span>
</Problem>

<Problem refId=matching>
    <span slot=name>Matching Problem</span>
    4.4 (p73)
</Problem>

<Problem refId=shortestPath>
    <span slot=name>Assignment Problem</span>
    p5, but also 4.3 (p67)
</Problem>

<Problem refId=tsp>
    <span slot=name>Traveling Salesman Problem</span>
    <span slot=abbrev>TSP</span>
    p7
</Problem>

<Problem refId=shortestPath>
    <span slot=name>Knapsack Problem</span>
    p6
</Problem>

<Problem refId=setCovering>
    <span slot=name>Set Covering Problem</span>
    p6
</Problem>
