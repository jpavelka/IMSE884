<script>
    import Heading from "$lib/Heading.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import Problem from "$lib/Problem.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import Key from "$lib/Key.svelte";
    import Figure from "$lib/Figure.svelte";
    import FixedNodeGraph from "$lib/FixedNodeGraph.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import ChooseObjVals from "$lib/drawing/ChooseObjVals.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import { exampleShortestPathEdges, exampleShortestPathNodes } from "$lib";
</script>

<Heading level=2 refId=exampleCOPs>
    Example <ProblemRef refId=combOpt link={false}/>s
    <span slot=context>Presenting a few example <ProblemRef refId=combOpt link={false}/>s to help make sense of the definition.</span>
</Heading>

It might take a few examples to really internalize the definition. So, let's go ahead and <Key>present a few <ProblemRef refId=combOpt/>s and examine how they fit the framework</Key>. Several of these are most convenient to define in the language of <Key>graph theory</Key>. If you've seen graphs before, then great! If not, you can brush up on the preliminaries in the appendix, <SectionRef refId=graphTheory/>.

<Heading level=3 refId=shortestPathDef>
    Shortest paths
    <span slot=context>Showing how a simple problem fits into the <ProblemRef refId=combOpt link={false}/> framework</span>
</Heading>

We'll start with a basic one:

<Problem refId=shortestPath>
    <span slot=name>Shortest Path Problem</span>
    <span slot=instance>
        Digraph $$G=(V,E)$$, two nodes $$s,t\in V$$, non-negative edge costs $$c_{ij}\in\Z_{>0}$$ for each $$(i,j)\in E$$.
    </span>
    <span slot=problem>
        Find a minimum-cost path in $$G$$ from $$s$$ to $$t$$, i.e.
        <MathDisp>
            \min_{P\subseteq E}\left\{\sum_{(i,j)\in P}c_{ij}:P\text{ is a path from }s\text{ to }t\right\}
        </MathDisp>
    </span>
</Problem>

Pretty simple setup. We have some directed graph, maybe like the one below in <FigureRef refId=shortestPathFirstExample />. We want to find the lowest-cost path from node $$s$$ on the left of the graph to node $$t$$ on the right, where edge costs are written directly on each edge in the figure<Footnote>Why don't you go ahead and try to figure it out the best path by visual inspection. We'll come back and solve this example later.</Footnote>.

<Figure refId=shortestPathFirstExample>
    <FixedNodeGraph
        nodes={exampleShortestPathNodes}
        edges={exampleShortestPathEdges}
        directed={true}
    />
    <span slot=caption>An example shortest path problem.</span>
</Figure>

How does this fit into our definition of a <ProblemRef refId=combOpt/>? Well, our finite set $$N$$ is the set of edges in the network, so
<MathDisp>
    \begin{align*}
    N = \{&(s,a), (s,b), (a,d), (a,c),\\
            &(b,d), (c,t), (d,c), (d,t) \}
    \end{align*}
</MathDisp>

The weights $$c_j$$ for each $$j\in N$$ are the edge distances displayed in the diagram, so $$c_{sa}=3$$, $$c_{sb}=4$$, and so on. And the set $$\mathcal{F}$$ of feasible subsets of $$N$$ are sets of edges that create a valid path from $$s$$ to $$t$$. So for example we have
<MathDisp>
    \begin{align*}
    \{(s,b),(b,d),(d,t)\}&\in\mathcal{F},\\
    \{(s,a),(a,d),(d,c),(c,t)\}&\in\mathcal{F}
    \end{align*}
</MathDisp>
since they all denote paths from $$s$$ to $$t$$, but 
<MathDisp>
    \{(s,a),(a,c)\}\not\in\mathcal{F}
</MathDisp>
since that path doesn't end at $$t$$. So we can see that the <ProblemRef refId=shortestPath/> indeed fits the <ProblemRef refId=combOpt/> framework, since finding the minimum-cost $$s-t$$ path corresponds to finding
<MathDisp>
    \min_{S\subseteq N}\left\{\sum_{j\in S}c_j:S\in\mathcal{F}\right\}
</MathDisp>
with $$N,c$$, and $$\mathcal{F}$$ as we've just defined them.

While it may not be obvious from the graph theory framing, the <ProblemRef refId=shortestPath/> has <a href=https://en.wikipedia.org/wiki/Shortest_path_problem#Applications target=_blank>several applications</a>. For example, if you were to model a road network as a graph with edge costs representing travel times or distances, a shortest path problem can be used by a navigation app to decide how to route you from one location to another.

Lastly, an important technical note: You may be wondering why we stated the edges costs $$c_ij$$ must be integers. What would be wrong with, say, an edge cost of 2.1? The answer is that there's really nothing <em>wrong</em> with it. But the requirement stems from an acknowledgement that we solve these problems on computers, and computers which can only handle so much precision, and indeed really can't represent irrational numbers like $$\pi$$. Further, there are technical reasons why some of the algorithmic analysis we do only makes sense if the data being used are integers. Besides, if you want to solve an instance where you have an edge cost of 2.1, it should be safe to multiply all your costs by ten, effectively changing the units so that 2.1 turns into the integer 21 (and so on for other constants as needed).

<Heading level=3 refId=knapsackDef>
    Knapsack
    <span slot=context>Another example problem that fits the <ProblemRef refId=combOpt link={false}/> framework</span>
</Heading>
Here's another inuitive problem that fits the <ProblemRef refId=combOpt/> framework:
<Problem refId=knapsack>
    <span slot=name>Knapsack Problem</span>
    <span slot=instance>A set $$J$$, positive numbers $$w_j\in\Z_{>0}$$ and $$v_j\in\Z_{>0}$$ for each $$j\in J$$, positive integer $$b\in\Z_{>0}$$.</span>
    <span slot=problem>
        Find a subset $$S\subseteq J$$ satisfying $$\sum_{j\in S}w_j\leq b$$ that maximizes the total value $$\sum_{j\in S}v_j$$.
    </span>
    <span slot=plainEnglish>
        You are going on a camping trip. There is some set of objects $$J$$ you are considering taking with you. Each object $$j\in J$$ weighs some amount $$w_j$$, and has a value to you of $$v_j$$ if you bring it on the trip. You are only constrained by the weight limit $$b$$ of your backpack. How can you maximize the value of items brought on the trip?
    </span>
</Problem>
The fit here is pretty natural. The set $$N$$ from the <ProblemRef refId=combOpt/> definition is simply the set of objects $$J$$. The weights $$c_j$$ for the <ProblemRef refId=combOpt/> are the values $$v_j$$, although since <ProblemRef refId=knapsack/> is a maximization problem and <ProblemRef refId=combOpt/> is defined as minimization, we have $$c_j=-v_j$$. The feasible subsets $$\mathcal{F}$$ are simply the subsets of objects which together do not exceed the weight limit, i.e.
<MathDisp>
    \mathcal{F} = \left\{S\subseteq J: \sum_{j\in S}w_j\leq b\right\}
</MathDisp>

The stereotypical framing for the <ProblemRef refId=knapsack /> is that of a hiker trying to decide what items be bring along on a trip. But the <a href=https://en.wikipedia.org/wiki/Knapsack_problem#Applications>applications</a> are numerous, with of course most not involving any type of backpack at all 😊.

<Heading level=3 refId=otherExampleDefs>
    Other examples
    <span slot=context>Defining more sample <ProblemRef refId=combOpt/>s, to give a sense of the breadth of problems available.</span>
</Heading>
Now that we've worked through it on a few examples, we'll skip formally specifying $$N$$, $$\mathcal{F}$$, and $$c$$ for the next set of problems<Footnote>In fact, I'd say the formal specifications were never really the point. What we have is a collection of problems that feel similar, in that the possible solutions are "combinatorial" in some sense. The definition was developed post-hoc because mathematicians like definitions.</Footnote>.

<Problem refId=assignment>
    <span slot=name>Assignment Problem</span>
    <span slot=instance>A complete bipartite graph $$G=(V_1,V_2,E)$$ with $$|V_1|=|V_2|$$, edge costs $$c_{ij}\in\Z$$ for each $$i\in V_1$$, $$j\in V_2$$.</span>
    <span slot=problem>Find a minimum-cost perfect matching in $$G$$.</span>
    <span slot=plainEnglish>
        There are $$n$$ people available to carry out $$n$$ jobs. Each person is assigned to carry out exactly one job. Some individuals are better suited to particular jobs than others, so there is an estimated cost $$c_{ij}$$ if person $$i$$ is assigned to job $$j$$. How can you assign people to jobs such that the sum of the assignment costs is minimized?
    </span>
</Problem>

An example where this might come up: Suppose a ride-hailing app has recently received four ride requests, and there are currently five drivers in the area that can pick them up. The app may decide to assign drivers to riders (with the fifth driver "assigned" to do nothing) by pairing them up in a way that minimizes the sum of distances the drivers travel to pick up their riders.

Let's look at another graph-centric problem:
<Problem refId=mst>
    <span slot=name>Minimum Spanning Tree Problem</span>
    <span slot=abbrev>MST</span>
    <span slot=instance>A connected graph $$G=(V,E)$$, costs $$c_{ij}\in\Z$$ for each edge $$(i,j)\in E$$.</span>
    <span slot=problem>Find a minimum-cost spanning tree in $$G$$.</span>
</Problem>
An example application here: A utility company is trying to build connections to all the houses in some neighborhood. They need <em>some</em> physical connection from their service to each house, i.e. they need a spanning tree connecting all of the houses.

Here's another common problem. Admittedly, the mathematical definition is a little harder to parse initially. Hopefully the "plain English" example helps you work through it.
<Problem refId=setCover>
    <span slot=name>Set Covering Problem</span>
    <span slot=instance>Two sets $$M$$ and $$N$$, subsets $$S_j\subseteq M$$ for each $$j\in N$$, costs $$c_j\in\Z$$ for each $$j\in N$$.</span>
    <span slot=problem>Find a minimum-cost cover of $$M$$, i.e.
        <MathDisp>\min_{C\subseteq N}\left\{\sum_{j\in C}c_j: \bigcup_{j\in C}S_j=M\right\}</MathDisp>
    </span>
    <span slot=plainEnglish>
        A telecommunications company is deciding where to build cell towers in a rural area. The set $$M$$ is the set of cities that require service, and the set $$N$$ is a set of potential tower locations. For each location $$j\in N$$, there is a set of cities $$S_j\subseteq M$$ that can be served by a tower in that location. There is also a cost $$c_j$$ associated with building in that location. What is the lowest-cost collection of towers the company can build that brings service to all the cities?
    </span>
</Problem>
More examples (airline flight planning)

We'll wrap up this section with perhaps the most famous <ProblemRef refId=combOpt/> of all. The description here is lifted verbatim from <CitationRef refId=wolsey2020/>.
<Problem refId=tsp>
    <span slot=name>Traveling Salesman Problem</span>
    <span slot=abbrev>TSP</span>
    <span slot=instance>A complete graph $$G=(V,E)$$, costs $$c_{ij}\in\Z_{\geq0}$$ for each edge $$(i,j)\in E$$.</span>
    <span slot=problem>Find a minimum-distance tour in $$G$$.</span>
    <span slot=variants>
        <div>
            <span style=font-weight:bold;font-style:italic>Metric TSP:</span> Edge costs satisfy the <em>triangle inequality</em>, i.e. we have
            <MathDisp>
                c_{ij}+c_{jk}\geq c_{ik}
            </MathDisp>
            for any three vertices $$i,j,k\in V$$<Footnote>
                This is a pretty natural condition that holds for many TSP applications. If you take the nodes of the graph to be cities on a map, then it just says that the quickest way from city $$i$$ to city $$k$$ is to go directly between them. Maybe some other city $$j$$ is on the route between them, so that $$c_{ij} + c_{jk} = c_{ik}$$, but it wouldn't make sense it to be <em>quicker</em> to travel through $$j$$ first.
            </Footnote>.
        </div>
    </span>
    <span slot=plainEnglish>
        A salesman must visit each of $$n$$ cities exactly once and then return to his starting point. The time taken to travel from city $$i$$ to city $$j$$ is $$c_{ij}$$. Find the order in which he should make his tour so as to finish as quickly as possible.
    </span>
</Problem>

This intuitive problem, with obvious applications to e.g. routing delivery drivers, has a long and storied history in the world of optimization. We'll revisit it (as well as all the problems we've discussed so far) several times this course.
