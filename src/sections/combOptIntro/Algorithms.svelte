<script>
    import Algorithm from "$lib/Algorithm.svelte";
    import AlgoText from "$lib/AlgoText.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
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

We'll first talk about an algorithm for the <ProblemRef refId=shortestPath /> known as Dijkstra's algorithm. As it turns out, this algorithm doesn't just find the shortest <Math>s-t</Math> path as the problem requires, but will in fact find the shortest paths from <Math>s</Math> to <em>every</em> other vertex in the graph.

Let's use the graph in <FigureRef refId=shortestPathFirstExample /> as we illustrate the mechanics of the algorithm. Now, before we even start, we already know the shortest path from <Math>s</Math> to one other vertex. Namely, the shortest path from <Math>s</Math> to itself starts at <Math>s</Math> and goes... well, nowhere! You're already at your destination!<Footnote>
    There are actually a couple subtly important points here: We know that 0 is the minimum distance because our definition of the <ProblemRef refId=shortestPath link={false} /> specifies that all distances are non-negative. Furthermore, here as with every path we define in the algorithm, the path we give is <em>a</em> shortest path, though not necessarily <em>the</em> (unique) shortest path. It's always possible that alternate paths of equal distance will exist.
</Footnote> So the shortest path from <Math>s</Math> to <Math>s</Math> has distance 0.

Our next step will be examine which vertices we can reach directly from <Math>s</Math>. The answer is that we can reach vertex <Math>a</Math> by traveling 3 units of distance, and we can reach vertex <Math>b</Math> by traveling 2 units of distance. I claim this means the shortest path from <Math>s</Math> to <Math>b</Math> has distance 2, and is achievable via the single-edge path <Math>s\rightarrow b</Math>. How do we know this? Well, the definition of the <ProblemRef refId=shortestPath link={false} /> specifies that all distances are non-negative. Further, we've seen that getting from <Math>s</Math> to <em>any</em> other vertex requires traveling a distance of 2 or greater. So there can be no other way to get to vertex <Math>b</Math> in a distance shorter than 2.

The algorithm will then continue in this manner. In each iteration, we'll find a shortest path from <Math>s</Math> to some other vertex. We then examine the edges leaving this new vertex, observe the distances of the paths using these edges, and pick the shortest possible remaining path. For example, let's describe the next iteration over the graph in <FigureRef refId=shortestPathFirstExample />. From the previous iteration, we know the shortest paths from <Math>s</Math> to <Math>s</Math> or <Math>b</Math>, and we know that we can get from <Math>s</Math> to <Math>a</Math> with a path of distance 3 (though we don't know if that is optimal or not). Now let's examine the edges exiting <Math>b</Math>. There is only one, the edge from <Math>b</Math> to <Math>d</Math> with length 4, which implies a path from <Math>s</Math> to <Math>d</Math> with length 6 (<Math>s\rightarrow b\rightarrow d</Math>).

So now we know of two paths out of <Math>s</Math>, one to <Math>a</Math> with distance 3, and one to <Math>d</Math> with distance 6. With what we've examined so far, we don't yet know if that <Math>s-d</Math> is optimal, since it might still be possible to take that <Math>s</Math> to <Math>a</Math> at a distance of 3, then take a path shorter than 3 units to <Math>d</Math><Footnote>
    In fact, we can see pretty plainly that one of those paths does exists! But remember, at this point of the algorithm we've only really studied the edges out of <Math>s</Math> and <Math>b</Math>.
</Footnote>. But we <em>do</em> know that the length-3 path to <Math>a</Math> is optimal. Why? Well, clearly any path from <Math>s</Math> to <Math>a</Math> will either go through <Math>b</Math> or it won't. But we've just seen that any path routing through <Math>b</Math> will be length at least 6! So that single-edge path <Math>s\rightarrow a</Math> must be the shortest path to <Math>a</Math> 

And so we continue on like this. Continuing out of <Math>a</Math>, we find a path from <Math>s</Math> to <Math>c</Math> (<Math>s\rightarrow a\rightarrow c</Math>) with length 8, and a path from <Math>s</Math> to <Math>d</Math> (<Math>s\rightarrow a\rightarrow d</Math>) with length 5. This new <Math>s-d</Math> path is an improvement over the last one we found (<Math>s\rightarrow b\rightarrow d</Math>), so we disregard the previous, inferior path. Of the two paths we've found, the <Math>s-d</Math> path is the shortest, and so by similar logic to what we went through above, the <Math>s-d</Math> path must be optimal.

The algorithm continues like this until we've found the optimal paths from <Math>s</Math> to every other vertex in the graph (though we could choose to stop once we've found the best <Math>s-t</Math>, since that is really what we're looking for).

For a formal specification of the algorithm, we'll need to define a few more objects used for bookkeeping. We'll let <Math>U\subseteq V</Math> be the set of vertices for which we have <em>not</em> yet found a shortest path from <Math>s</Math>. We'll define functions <Math>d:V\rightarrow \R</Math> and <Math>p:V\rightarrow V</Math> where <Math>d(v)</Math> is the distance of the currently-best-known path from <Math>s</Math> to <Math>v</Math>, and <Math>p(v)</Math> is the <em>predecessor</em> vertex for <Math>v</Math> in the currently-best-known <Math>s-v</Math> path (i.e. the vertex <Math>u</Math> such that our currently-best-known <Math>s-v</Math> path concludes by taking the edge between <Math>u</Math> and <Math>v</Math>). Finally, at the end we will return a list of vertices <Math>P</Math> as the final path. The full algorithm is as follows:

<Algorithm refId=dijkstra>
    <span slot=name>Dijkstra's Algorithm</span>
    <span slot=solves><ProblemRef refId=shortestPath /></span>
    <AlgoText type=initialize>
        <span slot='child'>
            <AlgoText>Set <Math>U\leftarrow V</Math></AlgoText>
            <AlgoText>Set <Math>p(v)\leftarrow\textit{undefined}\ </Math> for all <Math>v\in V</Math></AlgoText>
            <AlgoText>Set <Math>d(s)\leftarrow 0</Math></AlgoText>
            <AlgoText>Set <Math>d(v) \leftarrow\infty\ </Math> for all <Math>v\in V, v\neq s</Math></AlgoText>
            <AlgoText>Set <Math>P\leftarrow ()</Math></AlgoText>
        </span>
    </AlgoText>
    <AlgoText type=while>
        <Math>|U|>0</Math>
        <span slot='child'>
            <AlgoText><Math>u=\argmin\{d(v):v\in U\}</Math><Footnote>
                Choose the vertex with the shortest currently-best-known path from <Math>s</Math>
            </Footnote></AlgoText>
            <AlgoText type=for>
                <Math>v\in U: (u, v)\in E</Math><Footnote>
                    Iterate through each vertex <Math>v</Math> for which:
                    <ol>
                        <li>we haven't found a shortest <Math>s-v</Math> path, and</li>
                        <li>there is an edge from <Math>u</Math> to <Math>v</Math></li>
                    </ol>
                </Footnote>
                <span slot='child'>
                    <AlgoText>Set <Math>d'\leftarrow d(u) + c_{uv}</Math><Footnote>
                        Let <Math>d'</Math> be the distance of a <Math>s-v</Math> path passing through <Math>u</Math>.
                    </Footnote></AlgoText>
                    <AlgoText type=if>
                        <Math>d' < d(v)</Math><Footnote>Is the <Math>s-v</Math> path through <Math>u</Math> shorter than the current best-known <Math>s-v</Math> path?</Footnote>
                        <span slot='child'>
                            <AlgoText>Set <Math>d(v)\leftarrow d'</Math><Footnote>
                                Update the distance of the best-known <Math>s-v</Math> path.
                            </Footnote></AlgoText>
                            <AlgoText>Set <Math>p(v)\leftarrow u</Math><Footnote>
                                Update the predecessor of <Math>v</Math> to be <Math>u</Math>.
                            </Footnote></AlgoText>
                        </span>
                    </AlgoText>
                </span>
            </AlgoText>
        </span>
    </AlgoText>
    <AlgoText>Set <Math>u\leftarrow t</Math></AlgoText>
    <AlgoText type=while>
        <Math>p(u)\neq\textit{undefined}</Math><Footnote>A loop to iteratively build the path by noting the relevant predecessor nodes.</Footnote>
        <span slot='child'>
            <AlgoText>Prepend <Math>u</Math> to <Math>P</Math></AlgoText>
        </span>
    </AlgoText>
    <AlgoText type=if>
        <Math>P</Math> is not empty
        <span slot='child'>
            <AlgoText type=return><Math>P</Math> as a minimum distance <Math>s-t</Math> with distance <Math>d(t)</Math></AlgoText>
        </span>
    </AlgoText>
    <AlgoText type=else>
        <span slot='child'>
            <AlgoText>No <Math>s-t</Math> path exists</AlgoText>
        </span>
    </AlgoText>
</Algorithm>

<!-- Do we need to specify that G is connected? -->
<!--
knapsack dynamic programming
tsp approximation algorithm?
as much fun as this is, can we take a more unified approach?
-->