<script>
    import Algorithm from "$lib/Algorithm.svelte";
    import AlgorithmRef from "$lib/AlgorithmRef.svelte";
    import AlgoText from "$lib/AlgoText.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
</script>

<Heading refId=compOptAlgos level=2>
    <ProblemRef refId=combOpt link={false} /> algorithms
    <span slot=context>Exploring special-purpose algorithms for some of our example <ProblemRef refId=combOpt link={false} />s</span>
</Heading>

<!-- After the previous section, you hopefully have a good feel for the types of problems we're discussing. By now, you probably want to know how to solve them. Countless research papers have been written discussing each of the problems we've defined, and numerous algorithms for solving each of them exist. In this section, we'll take a look at a few special-purpose algorithms for solving some of the problems we've already defined. Get used to algorithms, prove correctness, all that good stuff.
What is an algorithm, anyway?
-->
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

For a formal specification of the algorithm, we'll need to define a few more objects used for bookkeeping. We'll let $$U\subseteq V$$ be the set of vertices for which we have <em>not</em> yet found a shortest path from $$s$$. We'll define functions $$d:V\rightarrow \R$$ and $$p:V\rightarrow V$$ where $$d(v)$$ is the distance of the currently-best-known path from $$s$$ to $$v$$, and $$p(v)$$ is the <em>predecessor</em> vertex for $$v$$ in the currently-best-known $$s-v$$ path (i.e. the vertex $$u$$ such that our currently-best-known $$s-v$$ path concludes by taking the edge between $$u$$ and $$v$$). Finally, at the end we will return a list of vertices $$P$$ as the final path. The full algorithm is as follows:

<Algorithm refId=dijkstra>
    <span slot=name>Dijkstra's Algorithm</span>
    <span slot=solves><ProblemRef refId=shortestPath /></span>
    <AlgoText type=initialize>
        <span slot='child'>
            <AlgoText>Set $$U\leftarrow V$$</AlgoText>
            <AlgoText>Set $$p(v)\leftarrow\textit{undefined}\ $$ for all $$v\in V$$</AlgoText>
            <AlgoText>Set $$d(s)\leftarrow 0$$</AlgoText>
            <AlgoText>Set $$d(v) \leftarrow\infty\ $$ for all $$v\in V, v\neq s$$</AlgoText>
            <AlgoText>Set $$P\leftarrow ()$$</AlgoText>
        </span>
    </AlgoText>
    <AlgoText type=while>
        $$|U|>0$$
        <span slot='child'>
            <AlgoText>Set $$u=\argmin\{d(v):v\in U\}$$<Footnote>
                Choose the vertex with the shortest currently-best-known path from $$s$$
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
</Algorithm>

Let's work a full example of <AlgorithmRef refId=dijkstra />

<!-- Do we need to specify that G is connected? -->
<!--
knapsack dynamic programming
tsp approximation algorithm?
as much fun as this is, can we take a more unified approach?
-->