<script>
    import CitationRef from "$lib/CitationRef.svelte";
    import Heading from "$lib/Heading.svelte";
    import FixedNodeGraph from "$lib/FixedNodeGraph.svelte";
    import Figure from "$lib/Figure.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import Definition from "$lib/Definition.svelte";
    import DefinitionRef from "$lib/DefinitionRef.svelte";
    import Theorem from "$lib/Theorem.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";

    const sampleNodes = [
        {id: 1, x: 0, y: 0.5},
        {id: 2, x: 0.5, y: 1},
        {id: 3, x: 0.5, y: 0},
        {id: 4, x: 1, y: 1},
        {id: 5, x: 1, y: 0}
    ];
    const sampleEdges = [
        '1-2',
        '1-3',
        '2-3',
        '2-4',
        '2-5',
        '4-5',
        '3-5'
    ];
    const sampleEdgesDirected = sampleEdges.concat(['5-4']);
    const samplePathEdges = [
        '1-2', '2-5', '4-5'
    ];
    const sampleCycleEdges = [
        '1-2', '2-4', '4-5', '3-5', '1-3'
    ];
    const bipartiteNodes = [
        {id: 1, x: 0, y: 0.9},
        {id: 2, x: 0, y: 0.5},
        {id: 3, x: 0, y: 0.1},
        {id: 4, x: 1, y: 1},
        {id: 5, x: 1, y: 0.67},
        {id: 6, x: 1, y: 0.33},
        {id: 7, x: 1, y: 0},
    ]
    const bipartiteEdges = [
        '1-4', '1-5', '1-7',
        '2-4', '2-6',
        '3-5', '3-7',
    ]
    const disconnectedNodes = sampleNodes
    const disconnectedEdges = [
        '1-2',
        '1-3',
        '2-3',
        '4-5'
    ]
    const spanTreeNodes = sampleNodes
    const spanTreeEdges = sampleEdges
    const spanTreeBoldEdges = [
        '1-2', '2-5', '3-5', '4-5'
    ]
    const perfectMatchNodes = [
        {id: 1, x: 0, y: 1},
        {id: 2, x: 0.5, y: 1},
        {id: 3, x: 1, y: 1},
        {id: 4, x: 0, y: 0},
        {id: 5, x: 0.5, y: 0},
        {id: 6, x: 1, y: 0}
    ]
    const perfectMatchEdges = [
        '1-2', '1-4', '1-5', '2-5', '2-3', '4-5', '5-6', '3-4', '3-6'
    ]
    const perfectMatchBoldEdges = [
        '1-2', '5-6', '3-4'
    ]
</script>

<Heading level=2 refId=graphTheory>
    Graph theory
    <span slot=context>Some basics from graph theory, which are useful for describing several common combinatorial optimization problems.</span>
</Heading>

Familiarity with graph theory will be useful for this course. You don't need to know too much though, really just the basic definitions should be enough to understand the material. For interested readers, Reinhard Diestel's <em>Graph Theory</em> <CitationRef refId=diestel2018></CitationRef> is an excellent overview of the topic.

<Definition refId=graphTheory>
    Graph theory
    <span slot=definition>
        The branch of mathematics that studies <DefinitionRef refId=graph>graphs</DefinitionRef>.
    </span>
    <span slot=glossaryDisp>graph theory</span>
</Definition> is a branch of mathematics that studies a certain type of object called a graph. A <Definition refId=graph>
    graph
    <span slot=definition>
        A mathematical object $$G=(V,E)$$ consisting of a set of <DefinitionRef refId=vertex>vertices</DefinitionRef> $$V$$ and a set of <DefinitionRef refId=edge>edges</DefinitionRef> $$E$$. Typically the vertices represent some object of interest, and the edges represent some pairwise relationship between two vertices.
    </span>
</Definition> is composed of two sets $$V$$ and $$E$$ called the <Definition refId=vertex>
    vertices
    <span slot=definition>
        Along with the edge, one of two main components of a <DefinitionRef refId=graph/>. They're typically the base object of interest in a graph, and visually represented by a circle in a diagram.
    </span>
    <span slot=glossaryDisp>vertex</span>
</Definition> (also called <Definition refId=node>
    nodes
    <span slot=definition>See <DefinitionRef refId=vertex/>.</span>
    <span slot=glossaryDisp>node</span>
</Definition>) and <Definition refId=edge>
    edges
    <span slot=definition>
        Along with the vertex, one of two main components of a <DefinitionRef refId=graph/>. They typically represent relationships between vertices.
    </span>
    <span slot=glossaryDisp>edge</span>
</Definition> (also called <Definition refId=arc>
    arcs
    <span slot=definition>
        See <DefinitionRef refId=edge />.
    </span>
    <span slot=glossaryDisp>arc</span>
</Definition>), respectively. Graphs are used to model relationships (denoted by the edges) between pairs of entities (represented by the vertices). More concretely, let a graph $$G=(V,E)$$ be defined by the pair of sets $$V$$ and $$E$$. $$V$$ is the set of vertices, and the elements of $$E$$ are pairs of vertices $$(v_1,v_2)$$, with $$v_1, v_2\in V$$. Two vertices $$v_1,v_2$$ are said to be <Definition refId=neighbor>
    neighbors
    <span slot=definition>
        In a <DefinitionRef refId=graph/>, a vertex $$v_1\in V$$ is a neighbor of another vertex $$v_2\in V$$ if an edge exists between the two, i.e. if $$(v_1,v_2)\in E$$.
    </span>
    <span slot=glossaryDisp>neighbor</span>
</Definition> if there is and edge between them, i.e. if $$(v_1,v_2)\in E$$. An alternative term is <Definition refId=adjacent>adjacent
    <span slot=definition>
        In a <DefinitionRef refId=graph/>, vertices $$v_1\in V$$ and $$v_2\in V$$ are adjacent if an edge exists between the two, i.e. if $$(v_1,v_2)\in E$$.
    </span>
</Definition>, i.e. vertices $$v_1,v_2$$ are neighbors if and only if they are adjacent.

Initially, these definitions feel rather abstract. But in practice graphs often have very natural interpretations. Generally they are used to model relationships between entities, e.g. the nodes are people signed up for some social network, and an edge is drawn between two people if they are friends. Another common interpretation is as a road network, when the vertices are cities on a map, and an edge is drawn between two cities if it is possible to drive from one city to the other. In this case, there is often a distance $$d_e$$ associated with each $$e\in E$$ that denotes the distance between two cities, and you are perhaps trying to find the shortest route that lets you get from one place to another.

Graphs are typically represented visually as in <FigureRef refId=exampleGraph/>: Each vertex/node is represented as a circle in the diagram, while edges/arcs are denoted by lines between the circles. In the case of <FigureRef refId=exampleGraph/>, the graph being represented is the graph $$G=(V,E)$$ with vertices:
    <MathDisp>V=\{1,2,3,4,5\}</MathDisp>
    and edges:
    <MathDisp>E=\{(1,2), (1,3), (2,3), (2,4), (2,5), (3,5), (4,5)\}</MathDisp>

<Figure refId=exampleGraph>
    <span slot=caption>
        Visualization of a graph.
    </span>
    <FixedNodeGraph 
        nodes={sampleNodes}
        edges={sampleEdges}
    />
</Figure>

Sometimes it makes sense for the edges to be directional. For example, we might want to represent a road network with some one-way streets. Or perhaps we'd like to model teams from a sports league that have played each other, with the edges drawn "from" the winning team "to" the losing team. Such a graph with directed edges are called <Definition refId=directedGraph>
    directed graphs
    <span slot=definition>
        A <DefinitionRef refId=graph/> whose edges are directed, so that for two vertices $$v_1, v_2\in V$$ there is a difference between the edges $$(v_1,v_2)$$ (going from $$v_1$$ to $$v_2$$) and $$(v_2,v_1)$$ (going from $$v_2$$ to $$v_1$$).
    </span>
    <span slot=glossaryDisp>directed graph</span>
</Definition>, or <Definition refId=digraph>
    digraphs
    <span slot=definition>
        See <DefinitionRef refId=directedGraph/>.
    </span>
    <span slot=glossaryDisp>digraph</span>
</Definition> for short. In these cases, the ordering of the vertices in each edge $$(v_1,v_2)\in E$$ matters, and we'd say that the edge goes <em>from</em> $$v_1$$ <em>to</em> $$v_2$$. <FigureRef refId=exampleDirectedGraph/> shows an example visualization of a directed graph. Note that it is entirely possible for digraph edges to exist in both directions between a pair of vertices, as we see with both $$(4,5)$$ and $$(5,4)$$ existing in the figure.

<Figure refId=exampleDirectedGraph>
    <span slot=caption>
        Visualization of a directed graph.
    </span>
    <FixedNodeGraph 
        nodes={sampleNodes}
        edges={sampleEdgesDirected}
        directed={true}
    />
</Figure>

In the context of digraphs, it is sometimes customary to denote the graph by $$D=(V,A)$$ instead of $$G=(V,E)$$, using $$D$$ (for digraph) in place of $$G$$ for the graph and $$A$$ (for arc) in place of $$E$$ for the edge set. Indeed, this is the convention Wolsey takes in <CitationRef refId=wolsey2020/>, but we will stick with $$G=(V,E)$$ for both graphs and digraphs in this course.

A graph $$G=(V,E)$$ is called <Definition refId=bipartite>
    bipartite
    <span slot=definition>
        A graph $$G=(V,E)$$ where the vertex set $$V$$ can be divided into two sets $$V_1$$ and $$V_2$$ such that every edge in $$E$$ connects a vertex in $$V_1$$ to a vertex in $$V_2$$ (as in <FigureRef refId=exampleBipartiteGraph/>).
    </span>
    <span slot=glossaryDisp>bipartite graph</span>
</Definition> if its vertex set $$V$$ can be divided into two sets $$V_1$$ and $$V_2$$ such that every edge in $$E$$ connects a vertex in $$V_1$$ to a vertex in $$V_2$$. An example of such a graph is shown in <FigureRef refId=exampleBipartiteGraph/>.

<Figure refId=exampleBipartiteGraph>
    <span slot=caption>
        Visualization of a bipartite graph, with $$V_1=\{1,2,3\}$$ and $$V_2=\{4,5,6,7\}$$
    </span>
    <FixedNodeGraph 
        nodes={bipartiteNodes}
        edges={bipartiteEdges}
        width={300}
    />
</Figure>

A general graph is said to be a <Definition refId=completeGraph>
    complete graph
    <span slot=definition>
        A <DefinitionRef refId=graph/> in which every pair of vertices is connected by an edge.
    </span>
</Definition> if every pair of vertices is connected by an edge. A complete graph with $$n$$ vertices is often denoted as $$K_n$$. A bipartite graph can also be called complete. A <Definition refId=completeBipartiteGraph>
    complete bipartite graph
    <span slot=definition>
        A <DefinitionRef refId=bipartiteGraph/> in which $$(v_1,v_2)\in E$$ for any $$v_1\in V_1$$, $$v_2\in V_2$$.
    </span>
</Definition> is a bipartite graph with edges connected each vertex in $$V_1$$ to each vertex in $$V_2$$. If a complete bipartite graph has $$|V_1|=n$$ and $$|V_2|=m$$, then we may denote the graph by $$K_{n,m}$$.

On a given graph $$G$$, a <Definition refId=walk>
    walk
    <span slot=definition>
        In graph theory, a sequence of edges which joins a sequence of vertices, such that it denotes a way to "walk" from vertex to vertex using the edges of the graph.
    </span>
    </Definition> is a sequence of edges which joins a sequence of vertices, such that it denotes a way to "walk" from vertex to vertex using the edges of the graph. So
<MathDisp>
    W=((1, 2), (2, 5), (4, 5), (2, 4), (2, 3))
</MathDisp>
is a walk in the graph shown in <FigureRef refId=exampleGraph/>, which represents traveling the sequence of vertices:
<MathDisp>
    1\rightarrow 2\rightarrow 5\rightarrow 4\rightarrow 2\rightarrow 3
</MathDisp>

A very similar notion is that of a <Definition refId=trail>
    trail
    <span slot=definition>
        A <DefinitionRef refId=walk/> in which all the edges are distinct.
    </span>
</Definition>, which is a walk in which all the edges are distinct. Note that the walk $$W$$ from the previous paragraph is also a trail, since it does not repeat any edges. Meanwhile, a walk is called a <Definition refId=path>
    path
    <span slot=definition>
        A <DefinitionRef refId=walk/> in which all the vertices are distinct.
    </span>
</Definition> if all its vertices (and, therefore also it edges) are distinct. So $$W$$ is <em>not</em> a path, since it travels to vertex $$2$$ twice. But something like
<MathDisp>
    P=((1, 2), (2, 5), (4, 5))
</MathDisp>
<em>is</em> a path, which we can visualize as in <FigureRef refId=examplePath/>.

<Figure refId=examplePath>
    <span slot=caption>
        Visualization of a path $$P=((1, 2), (2, 5), (4, 5))$$.
    </span>
    <FixedNodeGraph 
        nodes={sampleNodes}
        edges={sampleEdges}
        boldEdges={samplePathEdges}
    />
</Figure>

A <Definition refId=circuit>
    circuit
    <span slot=definition>
        A <DefinitionRef refId=trail/> that starts and ends at the same vertex.
    </span>
</Definition> is a trail that starts and ends at the same vertex. Note that the circuit is defined based on a <em>trail</em>, so therefore edges cannot be repeated in a circuit, though vertices <em>can</em> repeat. A similar notion is the <Definition refId=cycle>
    cycle
    <span slot=definition>
        A <DefinitionRef refId=path/> that begins and ends at the same vertex.
    </span>
</Definition>, which is a path that begins and ends at the same vertex. A cycle is called a <Definition refId=hamCycle>
    Hamiltonian cycle
    <span slot=definition>
        A <DefinitionRef refId=cycle/> in which every vertex is visited exactly once.
    </span>
</Definition> if it visits every vertex exactly once. An example Hamiltonian cycle is shown in <FigureRef refId=exampleHamCycle/>. Related to these is the <Definition refId=tour>
    tour
    <span slot=definition>
        A <DefinitionRef refId=walk/> that starts and ends at the same vertex and also visits every vertex at least once.
    </span>
</Definition>, which is a walk that starts and ends at the same vertex and also visits every vertex <em>at least</em> once (so a Hamiltonian cycle is also a tour, though not every tour is a Hamiltonian cycle).

<Figure refId=exampleHamCycle>
    <span slot=caption>
        Visualization of a Hamiltonian cycle.
    </span>
    <FixedNodeGraph 
        nodes={sampleNodes}
        edges={sampleEdges}
        boldEdges={sampleCycleEdges}
    />
</Figure>

Note that walks, trails, paths, circuits, cycles, and tours can all exist on directed graphs as well, with the natural restriction that the underlying walk must travel in the direction of the edges.

A graph is said to be <Definition refId=connectedGraph>
    connected
    <span slot=definition>
        A <DefinitionRef refId=graph/> in which there is a path between every pair of vertices.
    </span>
    <span slot=glossaryDisp>connected graph</span>
</Definition> if there is a path between every pair of vertices in the graph. For example every graph we've seen so far in this section is connected. <FigureRef refId=exampleNotConnected/> shows a disconnected graph.

<Figure refId=exampleNotConnected>
    <span slot=caption>
        Visualization of a disconnected graph.
    </span>
    <FixedNodeGraph 
        nodes={disconnectedNodes}
        edges={disconnectedEdges}
    />
</Figure>

A graph is called <Definition refId=acyclicGraph>
    acyclic
    <span slot=definition>
        A <DefinitionRef refId=graph/> in which there are no cycles.
    </span>
    <span slot=glossaryDisp>acyclic graph</span>
</Definition> if it contains no cycles. Acyclic graphs are also sometimes called <Definition refId=forest>
    forests
    <span slot=definition>
        See <DefinitionRef refId=acyclicGraph/>.
    </span>
    <span slot=glossaryDisp>forest</span>
</Definition>. A connected forest is called a <Definition refId=tree>
    tree
    <span slot=definition>
        A <DefinitionRef refId=connectedGraph>connected</DefinitionRef>, <DefinitionRef refId=acyclicGraph>acyclic</DefinitionRef> <DefinitionRef refId=graph/>.
    </span>
</Definition>. Given a graph $$G=(V,E)$$, as subset of $$E$$ is called a <Definition refId=spanningTree>spanning tree
    <span slot=definition>
        For a given <DefinitionRef refId=graph /> $$G=(V,E)$$, a subset of $$E$$ that creates a <DefinitionRef refId=tree /> over all the vertices of $$G$$.
    </span>
</Definition> of $$G$$ if it creates a tree over all the vertices of $$G$$. An example spanning tree is shown in <FigureRef refId=exampleSpanningTree/>.

<Figure refId=exampleSpanningTree>
    <span slot=caption>
        Visualization of a spanning tree.
    </span>
    <FixedNodeGraph 
        nodes={spanTreeNodes}
        edges={spanTreeEdges}
        boldEdges={spanTreeBoldEdges}
    />
</Figure>

The following is a neat fact about spanning trees that we use in the main text while talking about <ProblemRef refId=mst/>. It states that adding an edge to a spanning tree will create a cycle, and subsequently removing any edge from that cycle will give another spanning tree.

<Theorem refId=newSpanningTree thmType=proposition>
    Let $$G=(V,E)$$ be a graph and $$T$$ a spanning tree in $$G$$. Take any edge $$e\in E$$. Then:
    <ol>
        <li>$$T\cup\{e\}$$ contains a cycle $$C$$.</li>
        <li>Let $$e'$$ be any edge in $$C$$. Then $$T'=(T\cup\{e\})\setminus\{e'\}$$</li> is a spanning tree.
    </ol>
    <span slot=proof>
        For claim 1, recall that a spanning tree is by definition connected, i.e. there is a path between any pair of vertices in the graph. Suppose the edge we add is $$e=(u,v)$$. Connectedness of $$G$$ implies there exists a path in $$T$$ starting at $$u$$ and ending at $$v$$. Then adding $$e$$ to that path gives you a new path starting and ending at $$u$$, i.e. a cycle.

        Now for claim 2. Let $$e'=(u',v')$$ be the edge removed from $$C$$ to create $$T'$$. For $$T'$$ to still be a spanning tree, it must be acyclic (taken care of by the removal of $$e'$$) and it must still be connected, i.e. there must be a path between any pair of vertices in $$T'$$. So let $$x,y\in V$$ be two vertices. Since $$T$$ was a spanning tree, there was a path $$P$$ between $$x$$ and $$y$$ in $$T$$. If edge $$e'$$ is not part of that path, then the $$P$$ is a subset of $$T'$$, i.e. it is still a path between $$x$$ and $$y$$ in $$T'$$. Otherwise, if $$e'\in P$$, the $$x-y$$ path in $$T'$$ looks like:
        <ul>
            <li>Follow path $$P$$ from $$x$$ to $$u'$$</li>
            <li>Route from $$u'$$ to $$v'$$ the "other way" around $$C$$</li>
            <li>Follow path $$P$$ from $$v'$$ to $$y$$</li>
        </ul>

        Thus a path exists between any two vertices in $$T'$$.
    </span>
</Theorem>

For a given graph, a subset of the edges $$M\subseteq E$$ is called a <Definition refId=matching>
    matching
    <span slot=definition>
        A subset $$M$$ of the edges of a <DefinitionRef refId=graph/> such that every vertex is included in at most one edge.
    </span>
</Definition> if every vertex is included in <em>at most</em> one edge. A <Definition refId=perfectMatching>
    perfect matching
    <span slot=definition>
        A <DefinitionRef refId=matching/> in which every vertex is included in exactly one edge.
    </span>
</Definition> is a matching where every vertex is included in <em>exactly</em> one edge. An example perfect matching is given in <FigureRef refId=examplePerfectMatching/>.

<Figure refId=examplePerfectMatching>
    <span slot=caption>
        Visualization of a perfect matching.
    </span>
    <FixedNodeGraph 
        nodes={perfectMatchNodes}
        edges={perfectMatchEdges}
        boldEdges={perfectMatchBoldEdges}
    />
</Figure>




