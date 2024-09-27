<script>
    import Algorithm from "$lib/Algorithm.svelte";
    import AlgorithmRef from "$lib/AlgorithmRef.svelte";
    import AlgoText from "$lib/AlgoText.svelte";
    import Definition from "$lib/Definition.svelte";
    import Figure from "$lib/Figure.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import Theorem from "$lib/Theorem.svelte";
    import TheoremRef from "$lib/TheoremRef.svelte";
    import { exampleShortestPathNodes } from "$lib";
    import FixedNodeGraph from "$lib/FixedNodeGraph.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import Algorithms from "./Algorithms.svelte";
    import InteractivePrim from "$lib/InteractivePrim.svelte";
</script>

<Heading refId=primAlgo level=3>
    Prim's <ProblemRef refId=mst link={false}></ProblemRef> algorithm
    <span slot=context>An algorithm for <ProblemRef refId=mst link={false}></ProblemRef>, our first working greedy algorithm.</span>
</Heading>

We now turn our attentions to the <ProblemRef refId=mst link={false} desiredRefStyle=name/>, which can be solved by a fairly simple algorithm. The algorithm begins with an empty set $$T$$, which we will iteratively fill with edges from $$E$$ until the minimum spanning tree is found. Here's the algorithm:

<Algorithm refId=prim>
    <span slot=name>Prim's Algorithm</span>
    <span slot=solves><ProblemRef refId=mst/></span>
    <AlgoText type=initialize>
        <span slot=child>
            <AlgoText>Select an arbitrary vertext $$r\in V$$</AlgoText>
            <AlgoText>Set $$U\leftarrow\{r\}$$</AlgoText>
            <AlgoText>Set $$T\leftarrow\emptyset$$</AlgoText>
        </span>
    </AlgoText>
    <AlgoText type={'main iteration'}>
        <span slot=child>
            <AlgoText type=while>
                $$T$$ is not a spanning tree of $$G$$
                <span slot=child>
                    <AlgoText>Select $$(u, v)$$ as a minimum-cost edge with one end $$u\in U$$ and the other $$v\in V\setminus U$$</AlgoText>
                    <AlgoText>Set $$T\leftarrow T\cup\{(u,v)\}$$</AlgoText>
                    <AlgoText>Set $$U\leftarrow U\cup\{v\}$$</AlgoText>
                </span>
            </AlgoText>
        </span>
    </AlgoText>
    <AlgoText type=return>$$T$$ as a minimum spanning tree of $$G$$</AlgoText>
</Algorithm>

And... that's it! Seems too simple, doesn't it? Just pick the lowest-cost edge that keeps $$T$$ a tree, and keep going? Though it may seem too short-sighted to finish with the optimal solution, it actually does work! Let's prove that now. (Note that this proof makes use of a claim (<TheoremRef refId=newSpanningTree/>) proven in the appendix - check that one out too if you're curious!)

<Theorem refId=prim>
    <AlgorithmRef refId=prim/> solves <ProblemRef refId=mst/> by returning a minimum-cost spanning tree in $$G$$.
    <span slot=proof>
        We will show by induction that at any point in the algorithm, the tree $$T$$ that we build is a subset of some minimum spanning tree of $$G$$. Since the algorithm terminates with $$T$$ itself being a spanning tree, this will complete the proof. Note that since we start with $$T=\emptyset$$, this hypothesis is trivially true in the base case<Footnote>By definition, the empty set is a subset of any other set.</Footnote>.

        For the inductive step, suppose we are at some point in the algorithm having $$T$$ as a subset of some minimum spanning tree $$M$$. Let $$e$$ be the edge the algorithm identifies for addition to $$T$$. We need to have that $$T\cup\{e\}$$ is the subset of some minimum spanning tree of $$G$$.
        
        If $$e\in M$$ then we are done, so suppose $$e\not\in M$$. By <TheoremRef refId=newSpanningTree/>, if we add $$e$$ to $$M$$ we create a cycle $$C$$. Since $$e$$ comes from <AlgorithmRef refId=prim/>, one end of $$e$$ is in $$U$$ while the other is in $$V\setminus U$$. Since $$C$$ is a cycle, it must return to $$U$$ at some point, so let $$e'$$ be another edge in $$C$$ which also has one end $$V$$ and the other in $$U\setminus V$$.
        
        Now consider the set of edges $$M'=(M\setminus\{e\})\cup\{e'\}$$. Also by <TheoremRef refId=newSpanningTree/>, $$M'$$ is a spanning tree. Then $$M$$ and $$M'$$ are both spanning trees, with the only differences being that $$M$$ contains $$e'$$ while $$M'$$ contains $$e$$. Furthermore, since both edges have one end in $$U$$ and one end in $$V\setminus U$$, the fact that $$e$$ was selected by the algorithm implies $$c_e\leq c_{e'}$$. Thus $$M'$$ has cost no greater than the cost of $$M$$, completing the proof.
    </span>
</Theorem>

Ready to see it in action? Go ahead an work through an example in <FigureRef refId=primExample/>.

<Figure refId=primExample>
    <InteractivePrim
        nodes={[   
            {id: 1, label: 'a', x: 0, y: 1},
            {id: 2, label: 'b', x: 0.5, y: 1},
            {id: 3, label: 'c', x: 1, y: 1},
            {id: 4, label: 'd', x: 0, y: 0},
            {id: 5, label: 'e', x: 0.5, y: 0},
            {id: 6, label: 'f', x: 1, y: 0},
        ]}
        edges={['a-b-3', 'a-d-2', 'a-e-2', 'b-c-5', 'b-e-3', 'c-e-4', 'c-f-3', 'd-e-2', 'e-f-4']}
    />
    <span slot=caption>Stepping through an example of <AlgorithmRef refId=prim />.</span>
</Figure>

<AlgorithmRef refId=prim/> is an example of what is called a <Definition refId=greedyAlgorithm>
    greedy algorithm
    <span slot=definition>
        An algorithm that proceeds by making a locally-optimal decision at each step.
    </span>
</Definition>, which means that it makes a locally-optimal decision at each step. In this case, the algorithm selects the lowest-cost edge that keeps the edges of $$T$$ as a tree. There is no thought to the future, or if we may need to undo any short-sighted decisions made in earlier steps. The algorithm just goes along greedily selecting the smallest edges possible.

It should be clear that a greedy algorithm will not work for every kind of optimization problem. We could take <ProblemRef refId=shortestPath/> as an example. Maybe our "greedy" process for that problem would be to start with vertex $$s$$, add the lowest-cost edge out of $$s$$, then keep adding lowest-cost edges until we find our way to $$t$$.

It's not too hard to create examples where this type of process fails. Consider the graph in <FigureRef refId=shortestPathGreedyFail/>. Our greedy heuristic would be enticed by the low cost of edge $$(s,a)$$. But that greedy first step would take us immediately to a portion of the graph with very high-cost edges, leading to a final path of $$s\rightarrow a\rightarrow c\rightarrow t$$, with cost 17. A bad outcome when the actual optimal path $$s\rightarrow b\rightarrow d\rightarrow t$$ only has cost 4<Footnote>In fact, the greedy heuristic we just outlined may fail to find any $$s-t$$ path at all, if one of the greedy steps takes us to a portion of the graph with no connections to $$t$$</Footnote>.

<Figure refId=shortestPathGreedyFail>
    <FixedNodeGraph
        nodes={exampleShortestPathNodes}
        edges={['s-a-1', 's-b-2', 'a-c-7', 'a-d-8', 'c-t-9', 'b-d-1', 'd-t-1']}
        directed={true}
    />
    <span slot=caption>An example failure case for our "greedy" shortest path heuristic.</span>
</Figure>

So we know greedy algorithms do not work for all <ProblemRef refId=combOpt/>s. Is there a way to tell when a problem can be solved by a greedy algorithm? It turns out that <ProblemRef refId=combOpt/> theory <em>does</em> have something to tell us about which problems greedy algorithms can and can't solve. We'll return to that topic later in the class.