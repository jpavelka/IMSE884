<script>
    import Heading from "$lib/Heading.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import Problem from "$lib/Problem.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import Key from "$lib/Key.svelte";
    import Math from "$lib/Math.svelte";
    import Figure from "$lib/Figure.svelte";
    import FixedNodeGraph from "$lib/FixedNodeGraph.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import ChooseObjVals from "$lib/drawing/ChooseObjVals.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
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
    Given a digraph <Math>D=(V,A)</Math>, two nodes <Math>s,t\in V</Math>, and non-negative arc distances <Math>c_{ij}</Math> for each <Math>i,j\in A</Math>, find a minimum-cost path from <Math>s</Math> to <Math>t</Math>.
</Problem>
Pretty simple setup. We have some directed graph, maybe like the one below in <FigureRef refId=shortestPathFirstExample />. We want to find the lowest-cost path from node <Math>s</Math> on the left of the graph to node <Math>t</Math> on the right, where arc costs are written directly on each arc in the figure<Footnote>Why don't you go ahead and try to figure it out the best path by visual inspection. We'll come back and solve this example later.</Footnote>.

<Figure refId=shortestPathFirstExample>
    <FixedNodeGraph
        nodes={[
            {id: 1, label: 's', x: 0, y: 0.5},
            {id: 2, label: 'a', x: 0.3, y: 1},
            {id: 3, label: 'b', x: 0.3, y: 0},
            {id: 4, label: 'c', x: 0.7, y: 1},
            {id: 5, label: 'd', x: 0.7, y: 0},
            {id: 6, label: 't', x: 1, y: 0.5},
        ]}
        edges={[
            's-a-3',
            's-b-2',
            'a-c-5',
            'a-d-2',
            'b-d-4',
            'd-c-2',
            'c-t-2',
            'd-t-6'
        ]}
        directed={true}
    />
    <span slot=caption>An example shortest path problem.</span>
</Figure>

How does this fit into our definition of a <ProblemRef refId=combOpt/>? Well, our finite set <Math>N</Math> is the set of arcs in the network, so
<MathDisp>
    \begin{align*}
    N = \{&(s,a), (s,b), (a,d), (a,c),\\
            &(b,d), (c,t), (d,c), (d,t) \}
    \end{align*}
</MathDisp>
The weights <Math>c_j</Math> for each <Math>j\in N</Math> are the arc distances displayed in the diagram, so <Math>c_{sa}=3</Math>, <Math>c_{sb}=4</Math>, and so on. And the set <Math>\mathcal{F}</Math> of feasible subsets of <Math>N</Math> are sets of arcs that create a valid path from <Math>s</Math> to <Math>t</Math>. So for example we have
<MathDisp>
    \begin{align*}
    \{(s,b),(b,d),(d,t)\}&\in\mathcal{F},\\
    \{(s,a),(a,d),(d,c),(c,t)\}&\in\mathcal{F}
    \end{align*}
</MathDisp>
since they all denote paths from <Math>s</Math> to <Math>t</Math>, but 
<MathDisp>
    \{(s,a),(a,c)\}\not\in\mathcal{F}
</MathDisp>
since that path doesn't end at <Math>t</Math>. So we can see that the <ProblemRef refId=shortestPath/> indeed fits the <ProblemRef refId=combOpt/> framework, since finding the minimum-cost <Math>s-t</Math> path corresponds to finding
<MathDisp>
    \min_{S\subseteq N}\left\{\sum_{j\in S}c_j:S\in\mathcal{F}\right\}
</MathDisp>
with <Math>N,c</Math>, and <Math>\mathcal{F}</Math> as we've just defined them.

While it may not be obvious from the graph theory framing, the <ProblemRef refId=shortestPath/> has <a href=https://en.wikipedia.org/wiki/Shortest_path_problem#Applications target=_blank>several applications</a>. For example, if you were to model a road network as a graph with arc costs representing travel times or distances, a shortest path problem can be used by a navigation app to decide how to route you from one location to another.

<Heading level=3 refId=knapsackDef>
    Knapsack
    <span slot=context>Another example problem that fits the <ProblemRef refId=combOpt link={false}/> framework</span>
</Heading>
Here's another inuitive problem that fits the <ProblemRef refId=combOpt/> framework:
<Problem refId=knapsack>
    <span slot=name>Knapsack Problem</span>
    You are given a set <Math>J</Math> of <Math>n</Math> objects, a weight <Math>w_j</Math> and a value <Math>v_j</Math> for each <Math>j\in J</Math>, and an overall weight limit <Math>b</Math>. Select a set of objects whose combined weight is below the weight limit, such that the sum of their values is maximized.
</Problem>
The fit here is pretty natural. The set <Math>N</Math> from the <ProblemRef refId=combOpt/> definition is simply the set of objects <Math>J</Math>. The weights <Math>c_j</Math> for the <ProblemRef refId=combOpt/> are the values <Math>v_j</Math>, although since <ProblemRef refId=knapsack/> is a maximization problem and <ProblemRef refId=combOpt/> is defined as minimization, we have <Math>c_j=-v_j</Math>. The feasible subsets <Math>\mathcal{F}</Math> are simply the subsets of objects which together do not exceed the weight limit, i.e.
<MathDisp>
    \mathcal{F} = \left\{S\subseteq J: \sum_{j\in S}w_j\leq b\right\}
</MathDisp>

The stereotypical framing for the <ProblemRef refId=knapsack /> is that of a hiker trying to decide what items be bring along on a trip. But the <a href=https://en.wikipedia.org/wiki/Knapsack_problem#Applications>applications</a> are numerous, with of course most not involving any type of backpack at all 😊.

<Heading level=3 refId=otherExampleDefs>
    Other examples
    <span slot=context>Defining more sample <ProblemRef refId=combOpt/>s, to give a sense of the breadth of problems available.</span>
</Heading>
Now that we've worked through it on a few examples, we'll skip formally specifying <Math>N</Math>, <Math>\mathcal{F}</Math>, and <Math>c</Math> for the next set of problems<Footnote>In fact, I'd say the formal specifications were never really the point. What we have is a collection of problems that feel similar, in that the possible solutions are "combinatorial" in some sense. The definition was developed post-hoc because mathematicians like definitions.</Footnote>.
<Problem refId=assignment>
    <span slot=name>Assignment Problem</span>
    There are <Math>n</Math> people available to carry out <Math>n</Math> jobs. Each person is assigned to carry out exactly one job. Some individuals are better suited to particular jobs than others, so there is an estimated cost <Math>c_{ij}</Math> if person <Math>i</Math> is assigned to job <Math>j</Math>.
</Problem>
An example where this might come up: Suppose a ride-hailing app has recently received four ride requests, and there are currently five drivers in the area that can pick them up. The app may decide to assign drivers to riders (with the fifth driver "assigned" to do nothing) by pairing them up so that the sum of distances the drivers travel to pick up their riders is minimized.

Here's another common problem. It's a little harder to parse initially, but example that follows should help you work through it.
<Problem refId=setCover>
    <span slot=name>Set Covering Problem</span>
    Let <Math>M</Math> and <Math>N</Math> be two sets. For each <Math>j\in N</Math>, there is a set <Math>S_j\subseteq M</Math> and a cost <Math>c_j\in\R</Math>. Let a <em>cover</em> be a set <Math>C\subseteq N</Math> such each element of <Math>M</Math> exists in at least one <Math>S_j,j\in C</Math>. The problem is to find minimum-cost cover, i.e.
    <MathDisp>
        \min_{C\subseteq N}\left\{\sum_{j\in C}c_j: \bigcup_{j\in C}S_j=M\right\}
    </MathDisp>
</Problem>
An example application may be a telecommunications company deciding where to build cell towers in a rural area. The set <Math>M</Math> is the set of cities that require service, and the set <Math>N</Math> is a set of potential tower locations. For each location <Math>j\in N</Math>, there is a set of cities <Math>S_j\subseteq N</Math> that can be served by a tower in that location. There is also a cost associated with building in that location, <Math>c_j</Math>. In this case, solving the <ProblemRef refId=setCover/> corresponds to finding the minimum-cost collection of towers to build, subject to each city getting service.

We'll wrap up this section with perhaps the most famous <ProblemRef refId=combOpt/> of all. The description here is lifted verbatim from <CitationRef refId=wolsey2020/>.
<Problem refId=tsp>
    <span slot=name>Traveling Salesman Problem</span>
    <span slot=abbrev>TSP</span>
    A salesman must visit each of <Math>n</Math> cities exactly once and then return to his starting point. The time taken to travel from city <Math>i</Math> to city <Math>j</Math> is <Math>c_{ij}</Math>. Find the order in which he should make his tour so as to finish as quickly as possible.
</Problem>
This intuitive problem, with obvious applications to e.g. routing delivery drivers, has a long and storied history in the world of optimization. We'll revisit it (as well as all the problems we've discussed so far) several times this course.
