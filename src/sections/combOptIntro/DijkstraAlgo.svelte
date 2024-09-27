<script>
    import { exampleShortestPathEdges, exampleShortestPathNodes } from "$lib";
    import Algorithm from "$lib/Algorithm.svelte";
    import AlgorithmRef from "$lib/AlgorithmRef.svelte";
    import AlgoText from "$lib/AlgoText.svelte";
    import InteractiveDijkstra from "$lib/InteractiveDijkstra.svelte";
    import Figure from "$lib/Figure.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import FixedNodeGraph from "$lib/FixedNodeGraph.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import Theorem from "$lib/Theorem.svelte";
    import Algorithms from "./Algorithms.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import Appendix from "../appendix/Appendix.svelte";
</script>

<Heading level=3 refId=dijkstraShortestPath>
    <span slot=context>Examining a well-known algorithm for the <ProblemRef refId=shortestPath link={false} /></span>
    Dijkstra's shortest path algorithm
</Heading>

We'll first talk about an algorithm for the <ProblemRef refId=shortestPath /> known as Dijkstra's algorithm. As it turns out, this algorithm doesn't just find the shortest $$s-t$$ path as the problem requires, but will in fact find the shortest paths from $$s$$ to <em>every</em> other vertex in the graph.

Let's use the graph in <FigureRef refId=shortestPathFirstExample /> as we illustrate the mechanics of the algorithm. Now, before we even start, we already know the shortest path from $$s$$ to one other vertex. Namely, the shortest path from $$s$$ to itself starts at $$s$$ and goes... well, nowhere! You're already at your destination!<Footnote>
    There are actually a couple subtly important points here: We know that 0 is the minimum distance because our definition of the <ProblemRef refId=shortestPath link={false} /> specifies that all distances are non-negative. Furthermore, here as with every path we define in the algorithm, the path we give is <em>a</em> shortest path, though not necessarily <em>the</em> (unique) shortest path. It's always possible that alternate paths of equal distance will exist.
</Footnote> So the shortest path from $$s$$ to $$s$$ has distance 0.

Our next step will be examine which vertices we can reach directly from $$s$$. The answer is that we can reach vertex $$a$$ by traveling 3 units of distance, and we can reach vertex $$b$$ by traveling 2 units of distance. I claim this means the shortest path from $$s$$ to $$b$$ has distance 2, and is achievable via the single-edge path $$s\rightarrow b$$. How do we know this? Well, the definition of the <ProblemRef refId=shortestPath link={false} /> specifies that all distances are non-negative. Further, we've seen that getting from $$s$$ to <em>any</em> other vertex requires traveling a distance of 2 or greater. So there can be no other way to get to vertex $$b$$ in a distance shorter than 2.

The algorithm will then continue in this manner. In each iteration, we'll find a shortest path from $$s$$ to some other vertex. We then examine the edges leaving this new vertex, observe the distances of the paths using these edges, and pick the shortest possible remaining path. For example, let's describe the next iteration over the graph in <FigureRef refId=shortestPathFirstExample />. From the previous iteration, we know the shortest paths from $$s$$ to $$s$$ or $$b$$, and we know that we can get from $$s$$ to $$a$$ with a path of distance 3 (though we don't know if that is optimal or not). Now let's examine the edges exiting $$b$$. There is only one, the edge from $$b$$ to $$d$$ with length 4, which implies a path from $$s$$ to $$d$$ with length 6 ($$s\rightarrow b\rightarrow d$$).

So now we know of two paths out of $$s$$, one to $$a$$ with distance 3, and one to $$d$$ with distance 6. With what we've examined so far, we don't yet know if that $$s-d$$ is optimal, since it might still be possible to take that $$s$$ to $$a$$ at a distance of 3, then take a path shorter than 3 units to $$d$$<Footnote>
    In fact, we can see pretty plainly that one of those paths does exists! But remember, at this point of the algorithm we've only really studied the edges out of $$s$$ and $$b$$.
</Footnote>. But we <em>do</em> know that the length-3 path to $$a$$ is optimal. Why? Well, clearly any path from $$s$$ to $$a$$ will either go through $$b$$ or it won't. But we've just seen that any path routing through $$b$$ will be length at least 6! So that single-edge path $$s\rightarrow a$$ must be the shortest path to $$a$$ 

And so we continue on like this. Continuing out of $$a$$, we find a path from $$s$$ to $$c$$ ($$s\rightarrow a\rightarrow c$$) with length 8, and a path from $$s$$ to $$d$$ ($$s\rightarrow a\rightarrow d$$) with length 5. This new $$s-d$$ path is an improvement over the last one we found ($$s\rightarrow b\rightarrow d$$), so we disregard the previous, inferior path. Of the two paths we've found, the $$s-d$$ path is the shortest, and so by similar logic to what we went through above, the $$s-d$$ path must be optimal.

The algorithm continues like this until we've found the optimal paths from $$s$$ to every other vertex in the graph (though we could choose to stop once we've found the best $$s-t$$, since that is really what we're looking for).

For a formal specification of the algorithm, we'll need to define a few more objects used for bookkeeping. We'll let $$U\subseteq V$$ be the set of "unexplored" vertices for which we have <em>not</em> yet found a shortest path from $$s$$. We'll define functions $$d:V\rightarrow \R$$ and $$p:V\rightarrow V$$ where $$d(v)$$ is the distance of the currently-best-known path from $$s$$ to $$v$$, and $$p(v)$$ is the <em>predecessor</em> vertex for $$v$$ in the currently-best-known $$s-v$$ path (i.e. the vertex $$u$$ such that our currently-best-known $$s-v$$ path concludes by taking the edge between $$u$$ and $$v$$). Finally, at the end we will return a list of vertices $$P$$ as the final path. The full algorithm is as follows:

<Algorithm refId=dijkstra>
    <span slot=name>Dijkstra's Algorithm</span>
    <span slot=solves><ProblemRef refId=shortestPath /></span>
    <AlgoText type=initialize>
        <span slot='child'>
            <AlgoText>Set $$U\leftarrow V$$</AlgoText>
            <AlgoText>Set $$p(v)\leftarrow\textit{undefined}\ $$ for all $$v\in V$$</AlgoText>
            <AlgoText>Set $$d(s)\leftarrow 0$$</AlgoText>
            <AlgoText>Set $$d(v) \leftarrow\infty\ $$ for all $$v\in V, v\neq s$$</AlgoText>
        </span>
    </AlgoText>
    <AlgoText type='main iteration'>
        <span slot=child>
            <AlgoText type=while>
                $$|U|>0$$
                <span slot='child'>
                    <AlgoText>Set $$u$$ from $$\argmin\{d(v):v\in U\}$$<Footnote>
                        Choose the vertex with the shortest currently-best-known path from $$s$$. Ties may be broken arbitrarily.
                    </Footnote></AlgoText>
                    <AlgoText type=for>
                        $$v\in U: (u, v)\in E$$<Footnote>
                            Iterate through each vertex $$v$$ for which:
                            <ol>
                                <li>we haven't found a shortest $$s-v$$ path, and</li>
                                <li>there is an edge from $$u$$ to $$v$$</li>
                            </ol>
                        </Footnote>
                        <span slot='child'>
                            <AlgoText>Set $$d'\leftarrow d(u) + c_{uv}$$<Footnote>
                                Let $$d'$$ be the distance of a $$s-v$$ path passing through $$u$$.
                            </Footnote></AlgoText>
                            <AlgoText type=if>
                                $$d' < d(v)$$<Footnote>Is the $$s-v$$ path through $$u$$ shorter than the current best-known $$s-v$$ path?</Footnote>
                                <span slot='child'>
                                    <AlgoText>Set $$d(v)\leftarrow d'$$<Footnote>
                                        Update the distance of the best-known $$s-v$$ path.
                                    </Footnote></AlgoText>
                                    <AlgoText>Set $$p(v)\leftarrow u$$<Footnote>
                                        Update the predecessor of $$v$$ to be $$u$$.
                                    </Footnote></AlgoText>
                                </span>
                            </AlgoText>
                        </span>
                    </AlgoText>
                </span>
            </AlgoText>
        </span>
    </AlgoText>
    <AlgoText type='recover path'>
        <span slot=child>
            <AlgoText>Set $$P\leftarrow ()$$<Footnote>
                Initialize the path to an empty list.
            </Footnote></AlgoText>
            <AlgoText>Set $$u\leftarrow t$$</AlgoText>
            <AlgoText type=while>
                $$p(u)\neq\textit{undefined}$$<Footnote>A loop to iteratively build the path by noting the relevant predecessor nodes.</Footnote>
                <span slot='child'>
                    <AlgoText>Prepend $$u$$ to $$P$$</AlgoText>
                </span>
            </AlgoText>
            <AlgoText type=if>
                $$P$$ is not empty
                <span slot='child'>
                    <AlgoText type=return>$$P$$ as a minimum distance $$s-t$$ with distance $$d(t)$$</AlgoText>
                </span>
            </AlgoText>
            <AlgoText type=else>
                <span slot='child'>
                    <AlgoText>No $$s-t$$ path exists</AlgoText>
                </span>
            </AlgoText>
        </span>
    </AlgoText>
</Algorithm>

You can click through the buttons in <FigureRef refId=dijkstraExample /> to work through a full example of <AlgorithmRef refId=dijkstra />.
<Figure refId=dijkstraExample>
    <InteractiveDijkstra
        nodes={exampleShortestPathNodes}
        edges={exampleShortestPathEdges}
        width={600}
    />
    <span slot=caption>Stepping through an example of <AlgorithmRef refId=dijkstra />. Under the label for each vertex $$v\in V$$ is the pair $$(d(v),p(v))$$, i.e. the distance of the best-known $$s-v$$ path and the predecessor to $$v$$ on that path.</span>
</Figure>

After you finish the above example, how about working through this longer one?
<Figure refId=dijkstraExample2>
    <InteractiveDijkstra
        nodes={[
            {id: 1, label: 's', x: 0, y: 1},
            {id: 2, label: 'a', x: 0.33, y: 1},
            {id: 3, label: 'b', x: 0.66, y: 1},
            {id: 4, label: 'c', x: 1, y: 1},
            {id: 9, label: 'd', x: 0.16, y: 0.5},
            {id: 10, label: 'e', x: 0.83, y: 0.5},
            {id: 5, label: 'f', x: 0, y: 0},
            {id: 6, label: 'g', x: 0.33, y: 0},
            {id: 8, label: 'h', x: 1, y: 0},
            {id: 7, label: 't', x: 0.66, y: 0},
        ]}
        edges={[
            's-a-3', 's-d-3', 's-f-7', 'a-b-2', 'a-d-2', 'a-g-4',
            'a-t-10', 'b-c-9', 'b-e-2', 'b-t-8', 'c-h-5', 'd-f-3',
            'e-c-7', 'e-h-4', 'f-g-2', 'g-t-6', 'h-t-1',
        ]}
        width={600}
    />
    <span slot=caption>Stepping through an example of <AlgorithmRef refId=dijkstra />. Under the label for each vertex $$v\in V$$ is the pair $$(d(v),p(v))$$, i.e. the distance of the best-known $$s-v$$ path and the predecessor to $$v$$ on that path.</span>
</Figure>

Now that you've seen the algorithm in action, there is one more thing left to do. We've said Dijkstra's is an <em>algorithm</em> for the <ProblemRef refId=shortestPath/>. According to our definition, to be an algorithm you must guarantee the output is an optimal solution to the problem at hand. To wrap up this section, we will now prove that <AlgorithmRef refId=dijkstra /> is indeed a valid algorithm.

<Theorem refId=dijkstra>
    <AlgorithmRef refId=dijkstra/> solves the <ProblemRef refId=shortestPath/> by returning a shortest $$s-t$$ path.
    <span slot=proof>
        For each vertex $$v\in V$$, let $$\text{dist}(v)$$ represent the length of a shortest $$s-v$$ path in $$G$$ (contrast this with $$d(v)$$, which is the length of the best-known path at any given time while running the algorithm). We intend to show that throughout the main iterations of <AlgorithmRef refId=dijkstra/>, whichever vertex $$u$$ we select from $$\argmin\{d(v):v\in U\}$$ will satisfy that in fact $$d(u) = \text{dist(u)}$$. That is, at each iteration, we have found the best path to each vertex we remove from $$U$$.

        The proof goes by induction on the number of iterations of the algorithm. As a base case, it is clear that in the first iteration of the algorithm $$u=s$$ and $$d(s)=\text{dist}(s)=0$$.
        
        Now for the inductive step. Let's suppose for contradiction that, for the first time while running the algorithm, the vertex $$u$$ we've removed from $$U$$ actually has $$d(u) > \text{dist}(u)$$. That would mean there is a shorter $$s-u$$ path than the one found by the algorithm. The shortest path will look something like
        <MathDisp>
            v_0\rightarrow v_1\rightarrow \cdots\rightarrow v_{k-1}\rightarrow v_k
        </MathDisp>
        where $$v_0=s$$ and $$v_k=u$$.

        Let $$i$$ be the smallest index with $$v_i\in U$$.<Footnote>We know $$i$$ exists, since at the very least $$v_k=u\in U$$.</Footnote> Then since $$v_{i-1}$$ is <em>not</em> in $$U$$, we know it was removed from $$U$$ in an earlier iteration, and thus by the inductive assumption we have $$d(v_{i-1}) = \text{dist}(v_{i-1})$$.

        Furthermore, since $$v_{i-1}$$ precedes $$v_i$$ in the shortest $$s-u$$ path, the path
        <MathDisp>
            v_0\rightarrow v_1\rightarrow\cdots v_{i-1}\rightarrow v_i
        </MathDisp>
        must be a shortest $$s-v_i$$ path.<Footnote>Otherwise, there would be a shorter $$s-u$$ path that incorporates the shorter $$s-v_i$$ path.</Footnote> Bringing it all together, we have
        <MathDisp>
            d(v_i)\leq d(v_{i-1}) + c_{v_{i-1}v_i}= \text{dist}(v_{i-1}) + c_{v_{i-1}v_i}=\text{dist}(v_i)
        </MathDisp>
        Since $$v_i$$ precedes $$u$$ on the shortest $$s-u$$ path, we also have $$\text{dist}(v_i)\leq\text{dist}(u)$$. Combining these two inequalities with the initial assumption $$\text{dist}(u)<d(u)$$ gives
        <MathDisp>
            d(v_i)\leq \text{dist}(v_i)\leq\text{dist}(u) < d(u)
        </MathDisp>
        Thus $$v_i$$ is a vertex in $$U$$ with strictly smaller $$d$$ value than $$u$$, contradicting the selection of $$u$$ as the vertex to remove from $$U$$.
    </span>
</Theorem>
