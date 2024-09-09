<script>
    import Heading from "$lib/Heading.svelte";
    import BodyText from "$lib/BodyText.svelte";
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
</script>

<Heading level=2 refId=exampleCOPs>
    Example <ProblemRef refId=combOpt link={false}/>s
    <span slot=context>Presenting a few example <ProblemRef refId=combOpt link={false}/>s to help make sense of the definition.</span>
</Heading>

<BodyText>
    It might take a few examples to really internalize the definition. So, let's go ahead and <Key>present a few <ProblemRef refId=combOpt/>s and examine how they fit the framework</Key>. Several of these are most convenient to define in the language of <Key>graph theory</Key>. If you've seen graphs before, then great! If not, you can brush up on the preliminaries in the appendix, <SectionRef refId=graphTheory/>.
</BodyText>

<Heading level=3 refId=shortestPathDef>
    Shortest paths
    <span slot=context>Showing how a simple problem fits into the <ProblemRef refId=combOpt link={false}/> framework</span>
</Heading>

<BodyText>
    We'll start with a basic one:
</BodyText>

<Problem refId=shortestPath>
    <span slot=name>Shortest Path Problem</span>
    Given a digraph <Math>D=(V,A)</Math>, two nodes <Math>s,t\in V</Math>, and non-negative arc costs <Math>c_{ij}</Math> for each <Math>i,j\in A</Math>, find a minimum-cost path from <Math>s</Math> to <Math>t</Math>.
</Problem>

<BodyText>
    Pretty simple setup. We have some directed graph, maybe like the one below in <FigureRef refId=shortestPathFirstExample />. We want to find the lowest-cost path from node <Math>s</Math> on the left of the graph to node <Math>t</Math> on the right, where arc costs are written directly on each arc in the figure<Footnote>Why don't you go ahead and try to figure it out the best path by visual inspection. We'll come back and solve this example later.</Footnote>.
</BodyText>

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
            's-b-4',
            'a-c-5',
            'a-d-2',
            'b-d-2',
            'd-c-2',
            'c-t-2',
            'd-t-6'
        ]}
        directed={true}
    />
</Figure>

<BodyText>
    How does this fit into our definition of a <ProblemRef refId=combOpt/>? Well, our finite set <Math>N</Math> is the set of arcs in the network, so
    <MathDisp>
        \begin{align*}
        N = \{&(s,a), (s,b), (a,d), (a,c),\\
              &(b,d), (c,t), (d,c), (d,t) \}
        \end{align*}
    </MathDisp>
    The weights <Math>c_j</Math> for each <Math>j\in N</Math> are the arc costs displayed in the diagram, so <Math>c_{sa}=3</Math>, <Math>c_{sb}=4</Math>, and so on. And the set <Math>\mathcal{F}</Math> of feasible subsets of <Math>N</Math> are sets of arcs that create a valid path from <Math>s</Math> to <Math>t</Math>. So for example we have
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
</BodyText>

<Heading level=3 refId=knapsackDef>
    Knapsack
    <span slot=context>Another example problem that fits the <ProblemRef refId=combOpt link={false}/> framework</span>
</Heading>

<BodyText>
    Here's another inuitive problem that fits the <ProblemRef refId=combOpt/> framework:
</BodyText>

<Problem refId=knapsack>
    <span slot=name>Knapsack Problem</span>
    You are given a set <Math>J=\{1,\dots,n\}</Math> of <Math>n</Math> objects, a weight <Math>w_j</Math> and a value <Math>v_j</Math> for each <Math>j\in J</Math>, and an overall weight limit <Math>b</Math>. Select a set of objects whose combined weight is below the weight limit, such that the sum of their values is maximized.
</Problem>

<BodyText>This fits the framework because...</BodyText>

<Heading level=3 refId=otherExampleDefs>
    Other examples
    <span slot=context>Defining more sample <ProblemRef refId=combOpt/>s, to give a sense of the breadth of problems available.</span>
</Heading>

<!--

<Problem refId=matching>
    <span slot=name>Matching Problem</span>
    4.4 (p73)
</Problem>

<Problem refId=assignment>
    <span slot=name>Assignment Problem</span>
    p5, but also 4.3 (p67)
</Problem>

<Problem refId=tsp>
    <span slot=name>Traveling Salesman Problem</span>
    <span slot=abbrev>TSP</span>
    p7
</Problem>

<Problem refId=setCovering>
    <span slot=name>Set Covering Problem</span>
    p6
</Problem>

-->
