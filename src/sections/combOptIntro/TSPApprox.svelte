<script>
    import Figure from "$lib/Figure.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import FixedNodeGraph from "$lib/FixedNodeGraph.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
</script>

<Heading level=3 refId=tspApprox>
    <ProblemRef refId=tsp link={false} /> approximation
    <span slot=context>Our first example approximation algorithm (for the <ProblemRef refId=tsp link={false} />)</span>
</Heading>

Let's switch gears a little bit now. Where in the previous sections we were discussing <em>algorithms</em> for <ProblemRef refId=combOpt/>s, we will now give our first example <em>approximation algorithm</em>.

Why an approximation, instead of an algorithm proper? The problem of interest here is the <ProblemRef refId=tsp/> which is a pretty hard problem! There are algorithms to solve it, of course, but they're either simple but hopelessly slow (like enumerating every possible tour in the graph and selecting the shortest one) or too complicated to fit neatly into this section of the notes.

What makes <ProblemRef refId=tsp/> so hard? We'll tackle that question formally later in the class. For now let's just convince ourselves that several simple methods you may come up with don't work.

Let's start with a simple, "greedy" type heuristic known as the "nearest neighbor" heuristic. To start, you select some vertex as your starting vertex. Now choose the vertex in the graph closest to the start vertex i.e. the vertex whose edge connecting to the start has lowest cost. Now, among the vertices not yet visited, choose the one closest to the vertex you last selected. Then, iterate like this until all the vertices have been chosen, and finish off the tour by returning to the start vertex.

It may seem like this should give you a good (maybe optimal?) solution, but it turns out this can go hilariously wrong. Consider the graph in <FigureRef refId=nearestNeighborBad/>.

<Figure refId=nearestNeighborBad>
    <FixedNodeGraph
        nodes={[
            {id: 1, x: 0.25, y: 1},
            {id: 2, x: 0.75, y: 1},
            {id: 3, x: 0, y: 0},
            {id: 4, x: 1, y: 0}
        ]}
        edges={
            [
                '1-2-1',
                '1-3-1000',
                '1-4-2',
                '2-3-2',
                '2-4-1',
                '3-4-1',
            ]
        }
    />
    <span slot=caption>An example <ProblemRef refId=tsp/> instance where the nearest neighbor heuristic fails miserably.</span>
</Figure>

Say you start at vertex 1. The nearest neighbor is vertex 2, with an edge cost of 1. Then the nearest neighbor to vertex 2 is vertex 4, and vertex 4's nearest neighbor is vertex 3. Having visited every vertex, you must now return to vertex 1 with an edge cost of... <em>1000!</em> So the heuristic returns a tour of cost 1003, while an optimal tour (say $$1\rightarrow2\rightarrow3\rightarrow4\rightarrow1$$) would have cost only 6.

The failure mode of nearest neighbor and other greedy algorithms should be pretty clear: By making certain choices early in the algorithm, you may lock yourself into suboptimal decisions later on. A hallmark if greedy algorithms is the lack of ability to alter your path in later portions of the algorithm. Only certain types of problems can be solved by greedy algorithms<Footnote>Reminder: we'll discuss later in the course precisely which problems <em>can</em> be solved by greedy algorithms.</Footnote>, and <ProblemRef refId=tsp /> is not one of them.

You might object that this is a pretty contrived example. Indeed, in practice most <ProblemRef refId=tsp/> instances are of the "metric" variety, which you may recall from our definitions requires that the triangle inequality:
<MathDisp>
    c_{ij} + c_{jk} \geq c_{ik}
</MathDisp>
be satisfied for any three vertices $$i,j,k\in V$$. That cost-1000 edge in <FigureRef refId=nearestNeighborBad/> makes the inequality fail. Alas, it is not too hard to find metric instances for which nearest neighbor fails to find an optimal solution (though it's a little trickier to show on small graphs above, and the failures are less dramatic). Indeed, in most natural instances, the greedy algorithm will not find an optimal solution.

To convince yourself of this, I'd suggest visiting <a href=https://tspvis.com target=_blank>tspvis.com</a>, a slick site that will let you try various <ProblemRef refId=tsp/> heuristics on instances you create on a map. Since these are using real-world distances, the triangle inequality will always be satisfied. Note that the exact solution methods they provide are not at all state-of-the-art, so if you want to find optimal solutions in a short amount of time I'd suggest creating instances with small (single-digit) number of cities.

<!-- algorithm - preorder traversal -->
<!-- proof - needs to specify that the instance satisfies the triangle inequality -->

