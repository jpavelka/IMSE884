<script lang=ts>
    import Algorithm from "$lib/Algorithm.svelte";
import AlgorithmRef from "$lib/AlgorithmRef.svelte";
    import AlgoText from "$lib/AlgoText.svelte";
    import Definition from "$lib/Definition.svelte";
    import DefinitionRef from "$lib/DefinitionRef.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import FixedNodeGraph from "$lib/FixedNodeGraph.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import Theorem from "$lib/Theorem.svelte";

    let tourRemoveEdges = ['1-2', '1-3', '1-4', '1-5', '2-3', '2-4', '2-5', '3-4', '3-5', '4-5'];
    let tourRemoveBoldEdges = ['1-2', '2-3', '3-4', '4-5', '1-5'];
    const toggleEdge = '1-5';
    const tourRemoveBoldEdgeChange = () => {
        if (tourRemoveBoldEdges.includes(toggleEdge)) {
            tourRemoveBoldEdges = tourRemoveBoldEdges.filter(x => x !== toggleEdge);
        } else {
            tourRemoveBoldEdges = tourRemoveBoldEdges.concat([toggleEdge]);
        }
    }
    const algoExNodes = [
        {id: 1, x: 0.25, y: 1},
        {id: 2, x: 0.75, y: 1},
        {id: 3, x: 0, y: 0},
        {id: 4, x: 1, y: 0},
        {id: 5, x: 0.5, y: 0.4}
    ]
    const algoExEdges = [
        '1-2-1', '1-3-3', '1-4-4', '1-5-2', '2-3-3',
        '2-4-3', '2-5-1', '3-4-4', '3-5-2', '4-5-4'
    ]
    const mstEdges = ['1-2', '2-4', '2-5', '3-5'];
    const travNodes = [1, 2, 5, 3, 5, 2, 4, 2, 1];
    let graphTravNodes = [travNodes[0]];
    let travExtraEdgeAttrs = {}
    for (const e of mstEdges) {
        travExtraEdgeAttrs[e] = {color: {color: '#ccc'}}
    }
    let travEdges = []
    const addTravNode = () => {
        const curLen = graphTravNodes.length;
        graphTravNodes = graphTravNodes.concat([travNodes[curLen]])
        travEdges = travEdges.concat([{
            from: graphTravNodes[curLen - 1],
            to: travNodes[curLen],
            arrows: 'to',
            smooth: {type: 'curvedCW', roundness: 0.25}
        }]);
    }
    const removeTravNode = () => {
        graphTravNodes = graphTravNodes.slice(0, graphTravNodes.length - 1);
        travEdges = travEdges.slice(0, travEdges.length - 1);
    }
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

To convince yourself of this, I'd suggest visiting <a href=https://tspvis.com target=_blank>tspvis.com</a>, a slick site that will let you try various <ProblemRef refId=tsp/> heuristics on instances you create on a map. Since these are using real-world distances, the triangle inequality will always be satisfied. Note that the exact solution methods they provide are not at all state-of-the-art, so if you want to find optimal solutions in a short amount of time I'd suggest creating instances with a small (single-digit) number of cities.

While there are exact algorithms for <ProblemRef refId=tsp/> that work better than those provide in the above website, we won't be talking about them here. We'll instead take the opportunity to talk about approximation algorithms. As you may recall from earlier, approximation algorithms occupy a middle ground between exact algorithms (which provably find an optimal solution) and heuristics (which may find a solution, but with no guarantee on the quality of the solution). An approximation algorithm finds a solution to a problem that is provably within some pre-specified distance from an optimal solution. This distance may be multiplicative or additive, so if we let $$z^*$$ be the value of an optimal solution and $$z^{\text{approx}}$$ be the value of the solution returned by the approximation algorithm. Then (assuming the problem is a minimization problem) we should be able to prove that
<MathDisp>
    z^{\text{approx}}\leq\alpha z^*\qquad\text{or}\qquad z^{\text{approx}}\leq z^* + \beta
</MathDisp>
where in the multiplicative case $$\alpha>1$$ and in the additive case $$\beta>0$$.

I should stress that this is often more of a theoretical win than a practical one. The algorithm we are about to show gives a multiplicative guarantee with $$\alpha=2$$. Is that good? Well, maybe and maybe not. If you told the titular salesman that you can get him on his way and he'll need to drive perhaps twice as far as his best route, he may not be too happy. Of course, these are worse-case guarantees, and in practice most applications of the algorithm will return a solution noticeably better than the guarantee. But in practice, many heuristics may perform better as well.

Anyway, let's put that matter aside and talk about the actual algorithm! Throughout, we'll use the graph <FigureRef refId=tsp2ApproxExBase/> to guide our discussion.

<Figure refId=tsp2ApproxExBase>
    <FixedNodeGraph
        nodes={algoExNodes}
        edges={algoExEdges}
    />
    <span slot=caption>An example graph for demonstrating our TSP approximation algorithm.</span>
</Figure>

The first step uses something we already know. Take the graph $$G$$ and find a minimum spanning tree $$T$$, using e.g. <AlgorithmRef refId=prim/> from <SectionRef refId=primAlgo/>. Now, $$T$$ is not an optimal solution to the problem, nor is it even a tour in $$G$$. But, we can still say something about the costs of the edges in $$T$$ in relation to the optimal tour. Let $$z^*$$ represent the value of the optimal solution to our <ProblemRef refId=tsp/> instance. We know that the sum of the costs of the edges in $$T$$ is no more than $$z^*$$, i.e.
<MathDisp refId=tsp2ApproxObservation1>
    \sum_{e\in T} c_e\leq z^*
</MathDisp>

Why is that? We know that $$z^*$$ comes from a minimum-cost tour in $$G$$. If you remove any edge from $$T$$, what remains is another spanning tree on $$G$$<Footnote>It's actually important that we're dealing with a metric TSP here, which implies that the minimum-cost tour must visit every node exactly once (i.e. is a Hamiltonian cycle).</Footnote> (see <FigureRef refId=removeEdgeFromTour/> if you need convincing), which we'll call $$T'$$. Since all edge costs are nonnegative, clearly $$z^*\geq\sum_{e\in T'} c_e$$, and since both $$T$$ and $$T'$$ are spanning trees and $$T$$ is also a minimum spanning tree, $$\sum_{e\in T'} c_e\geq\sum_{e\in T} c_e$$. Combining these two inequalities yields <EquationRef refId=tsp2ApproxObservation1/>.

<Figure refId=removeEdgeFromTour>
    <FixedNodeGraph
        nodes={algoExNodes}
        edges={tourRemoveEdges}
        boldEdges={tourRemoveBoldEdges}
    ></FixedNodeGraph>
    <div class='buttonDiv'>
        <button on:click={tourRemoveBoldEdgeChange}>
            {tourRemoveBoldEdges.includes(toggleEdge) ? 'Remove edge' : 'Replace edge'}
        </button>
    </div>
    <span slot=caption>An illustration of how removing an edge from a tour creates a spanning tree.</span>
</Figure>

Let's return to our example graph <FigureRef refId=tsp2ApproxExBase/>. We can quickly find a minimum spanning tree on this graph (using <AlgorithmRef refId=prim/> or just simply by visual inspection). In this case, the set of edges $$\{(1,2), (2,4), (2,5), (3,5)\}$$ define a minimum spanning tree, which we can see in <FigureRef refId=tsp2ApproxExMST/>.

<Figure refId=tsp2ApproxExMST>
    <FixedNodeGraph
        nodes={algoExNodes}
        edges={algoExEdges}
        boldEdges={mstEdges}
    />
    <span slot=caption>A minimum spanning tree in the example graph.</span>
</Figure>

So we have a spanning tree, but what we really need is a tour! How do we get there from here? Well, for any tree you can build a what is known as a <Definition refId=traversal>
    traversal
    <span slot=definition>A way of visiting every vertex in a <DefinitionRef refId=tree/> using its edges.</span>
</Definition> of the tree, which is a particular way of visiting every vertex in the tree via the edges. We won't formally specify the algorithm (though you can <a target=_blank href=https://en.wikipedia.org/wiki/Tree_traversal>check here</a> for more discussion), but the notion is very simple. Pick some arbitrary vertex as your starting point, then in a "depth-first" manner, select one of its neighbors, then one of the neighbor's neighbors, and on and on until you reach a node with no other neighbors. Then you traverse back up the tree until you find a node with an unvisited neighbor, and repeat the process.

Let's go ahead and do that for our tree found in <FigureRef refId=tsp2ApproxExMST/>, starting from vertex 1. You can follow through the process using <FigureRef refId=tsp2ApproxExTraversal/>.

<Figure refId=tsp2ApproxExTraversal>
    <FixedNodeGraph
        nodes={algoExNodes}
        edges={mstEdges.concat(travEdges)}
        extraEdgeAttrs={travExtraEdgeAttrs}
    />
    <div class=buttonDiv>
        <button on:click={removeTravNode} disabled={travEdges.length === 0}>Last</button>
        <button on:click={addTravNode} disabled={travEdges.length === 2 * (algoExNodes.length - 1)}>Next</button>
    </div>
        <div>Traversal: {graphTravNodes.join('-')}</div>
    <span slot=caption>Building a tree traversal, starting from node 1.</span>
</Figure>

So we build a traversal, which in this case looks like $$1\rightarrow2\rightarrow5\rightarrow3\rightarrow5\rightarrow2\rightarrow4\rightarrow2\rightarrow1$$. This is technically a tour, though a seemingly wasteful one since it visits several vertices multiple times. Nevertheless, we can say something about how the length of this tour, which we'll call $$R$$, relates to the optimal solution for our <ProblemRef refId=tsp/> instance. In particular, we already knew that $$\sum_{e\in T} c_e\leq z^*$$ where $$z^*$$ was the cost of the optimal tour, and $$T$$ was a minimum spanning tree on the graph. Well, by construction, $$R$$ contains all the edges from $$T$$ exactly twice, so that means
<MathDisp>
    \sum_{e\in R} c_e\leq 2z^*
</MathDisp>
i.e. we have a tour whose cost is at most twice the optimal cost.

But we can do better! Recall the wastefulness of our traversal. For instance, the traversal ends with $$2\rightarrow4\rightarrow2\rightarrow1$$. We visit vertex $$2$$ twice in this sequence. Wouldn't it be better to just go directly from $$4$$ back to $$1$$ without visiting $$2$$ again? Yes it would! Since we said we'll dealing with the metric variant of <ProblemRef refId=tsp/>, we know in particular that
<MathDisp>
    c_{41} \leq c_{42} + c_{21}
</MathDisp>
and so it would be shorter to take the shortcut and simply do $$2\rightarrow4\rightarrow1$$.

So the final step of the algorithm is to take the traversal we built and simply "remove" each vertex that we've already visited (and finishing by returning to the start vertex). So our traversal from above, $$1\rightarrow2\rightarrow5\rightarrow3\rightarrow5\rightarrow2\rightarrow4\rightarrow2\rightarrow1$$, becomes simply $$1\rightarrow2\rightarrow5\rightarrow3\rightarrow4\rightarrow1$$. As we saw above, none of these shortcuts will add any cost to the resultant tour. So the final tour still has the same guarantee, to be no more than twice the cost of the optimal tour. (In fact, in this instance we got lucky and the solution returned is indeed an optimal solution.)

<Figure refId=tsp2ApproxExTraversal>
    <FixedNodeGraph
        nodes={algoExNodes}
        edges={algoExEdges}
        boldEdges={['1-2', '2-5', '3-5', '3-4', '1-4']}
    />
    <span slot=caption>The tour created by <AlgorithmRef refId=tsp2Approx/> on our sample graph.</span>
</Figure>

There you have it, your first approximation algorithm! Let's formalize this by presenting the algorithm and writing the proof of correctness.

<Algorithm refId=tsp2Approx>
    <span slot=name>TSP 2-Approximation</span>
    <span slot=solves><ProblemRef refId=tsp /> (metric variant)</span>
    <AlgoText>Find a minimum spanning tree $$T$$ of $$G$$.</AlgoText>
    <AlgoText>Find a traversal $$R$$ of $$T$$.</AlgoText>
    <AlgoText>Build the final tour $$R^{\text{final}}$$ iterating through $$R$$ and removing any vertices that have already been visited.</AlgoText>
    <AlgoText type=return>Tour $$R^{\text{final}}$$ as a tour with cost at most $$2z^*$$, where $$z^*$$ is the cost of an optimal tour.</AlgoText>
</Algorithm>

<Theorem refId=tsp2Approx>
    The <AlgorithmRef refId=tsp2Approx /> algorithm returns a tour with cost at most $$2z^*$$, where $$z^*$$ is the cost of an optimal tour.
    <span slot=proof>
        We've already gone through the logic of the proof in the preceding discussion. Since the optimal tour consists of a spanning tree plus an extra edge and $$T$$ is a minimum spanning tree, It is clear that
        <MathDisp>
            \sum_{e\in T} c_e\leq z^*
        </MathDisp>
        and since the traversal built has all the edges of $$T$$ exactly twice, 
        <MathDisp>
            \sum_{e\in R} c_e\leq 2z^*
        </MathDisp>

        Finally, since we are dealing with the metric variant of <ProblemRef refId=tsp />, shortcutting the vertices already visited in $$R$$ does not add any cost to the tour. Thus
        <MathDisp>
            \sum_{e\in R^{\text{final}}}c_e\leq \sum_{e\in R}c_e\leq 2z^*
        </MathDisp>
        as required.
    </span>
</Theorem>

A few notes before we wrap up:
<ul>
    <li>
        When an approximation algorithm satisfies
        <MathDisp>
            z^{\text{approx}}\leq\alpha z^*
        </MathDisp>
        for some $$\alpha$$, we often refer to the algorithm as an $$\alpha$$-approximation algorithm. Hence why we named this algorithm the TSP 2-Approximation algorithm. 
    </li>
    <li>
        There is another famous approximation algorithm for the metric <ProblemRef refId=tsp />, known as the <a target="_blank" href=https://en.wikipedia.org/wiki/Christofides_algorithm>Christofides algorithm</a>. It is similar to <AlgorithmRef refId=tsp2Approx/> in that is starts by finding a minimum spanning tree, but it gets slightly more complicated from there. What it gains from the minor complication is an improved approximation ratio, namely the final solution is guaranteed to be within a factor 1.5 of the optimal instead of 2.
    </li>
</ul>

<style>
    .buttonDiv {
        display: flex;
        justify-content: center;
    }
</style>