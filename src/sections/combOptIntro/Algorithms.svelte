<script>
    import Heading from "$lib/Heading.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import Definition from "$lib/Definition.svelte";
    import DefinitionRef from "$lib/DefinitionRef.svelte";
    import DijkstraAlgo from "./DijkstraAlgo.svelte";
    import PrimAlgo from "./PrimAlgo.svelte";
</script>

<Heading refId=compOptAlgos level=2>
    <ProblemRef refId=combOpt link={false} /> algorithms
    <span slot=context>Exploring special-purpose algorithms for some of our example <ProblemRef refId=combOpt link={false} />s</span>
</Heading>

After the previous section you hopefully have a good feel for the kind of problems we can solve as <ProblemRef refId=combOpt />s. In this section, we turn to actually solving several of the <ProblemRef refId=combOpt />s we've seen. We will be presenting algorithms, working through examples, and proving that the algorithms work as claimed. We won't be describing algorithms for all the <ProblemRef refId=combOpt />s we've seen, but what we show will illustrate how these algorithms generally work. Some of the concepts we present are common to algorithms for several classes of problems.

But before we get started, we really ought to define that "a"-word we've been using. An <Definition refId=algorithm>
    algorithm
    <span slot=definition>
        A finite sequence of instructions for solving some class of problem.
    </span>
</Definition> is a finite sequence of instructions for solving some class of problem. In common parlance, an algorithm is usually just some prescription for doing something, but in this class we require the algorithm <em>actually solves</em> the problem at hand. So, an algorithm for a given problem should find not just a <em>valid</em> solution, not even just a <em>good</em>, but an <em>optimal</em> solution. To emphasize the meaning, we may sometimes use the term <Definition refId=exactAlgorithm>
    exact algorithm
    <span slot=definition>
        See <DefinitionRef refId=algorithm />.
    </span>
</Definition> instead.

Contrast this with a <Definition refId=heuristic>
    heuristic
    <span slot=definition>
        A sequence of instructions for finding an answer to a problem. However, unlike an <DefinitionRef refId=algorithm />, the solutions found have no guarantee to be optimal. A heuristic may even fail to find a valid solution at all.
    </span>
</Definition>, which like an algorithm is a sequence of instructions for finding an answer to a problem. However, a heuristic comes with no guarantee of solution quality, and may not even return a valid solution in every case. is a method to find a solution, with no guarantee on the quality of the solution found.

Lying somewhere in the middle of these two is the <Definition refId=approximationAlgorithm>
    approximation algorithm
    <span slot=definition>
        A finite sequence of instructions for finding solutions to a problem, like an <DefinitionRef refId=algorithm />. But instead of finding optimal solutions, the solution is provably within some pre-defined distance of the optimal value.
    </span>
</Definition>, which is like an algorithm except that the solution produced is not necessarily optimal, but instead is provably within some pre-defined distance of the optimal value. So while an algorithm may find the optimal value to some minimization problem, an approximation algorithm will find a solution that is, say, at most 10% more than optimal (or 50% more, or $2 more, or whatever).

In what follows, we will present both algorithms and approximation algorithms for a few of the <ProblemRef refId=combOpt/>s defined in the previous section. We will return to the concept of heuristics later in the course, specifically in the context of integer programming.

<DijkstraAlgo/>
<PrimAlgo/>

<!--
knapsack (to demonstrate dynamic programming)
tsp 2-approx?
as much fun as this is, can we take a more unified approach?
-->