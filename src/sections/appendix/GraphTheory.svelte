<script>
    import BodyText from "$lib/BodyText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import FixedNodeGraph from "$lib/FixedNodeGraph.svelte";
    import Figure from "$lib/Figure.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import Definition from "$lib/Definition.svelte";
    import DefinitionRef from "$lib/DefinitionRef.svelte";

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
</script>

<Heading level=2 refId=graphTheory>
    Graph theory
    <span slot=context>Some basics from graph theory, which are useful for describing several common combinatorial optimization problems.</span>
</Heading>
<BodyText>
    Familiarity with graph theory will be useful for this course. You don't need to know too much though, really just the basic definitions should be enough to understand the material. For interested readers, Reinhard Diestel's <em>Graph Theory</em> <CitationRef refId=diestel2018></CitationRef> is an excellent overview of the topic.
</BodyText>
<BodyText>
    <Definition refId=graphTheory>
        Graph theory
        <span slot=definition>
            The branch of mathematics that studies <DefinitionRef refId=graph>graphs</DefinitionRef>.
        </span>
        <span slot=glossaryDisp>graph theory</span>
    </Definition> is a branch of mathematics that studies a certain type of object called a graph. A <Definition refId=graph>
        graph
        <span slot=definition>
            A mathematical object <Math>G=(V,E)</Math> consisting of a set of <DefinitionRef refId=vertex>vertices</DefinitionRef> <Math>V</Math> and a set of <DefinitionRef refId=edge>edges</DefinitionRef> <Math>E</Math>. Typically the vertices represent some object of interest, and the edges represent some pairwise relationship between two vertices.
        </span>
    </Definition> is composed of two sets <Math>V</Math> and <Math>E</Math> called the <Definition refId=vertex>
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
    </Definition>), respectively. Graphs are used to model relationships (denoted by the edges) between pairs of entities (represented by the vertices). More concretely, let a graph <Math>G=(V,E)</Math> be defined by the pair of sets <Math>V</Math> and <Math>E</Math>. <Math>V</Math> is the set of vertices, and the elements of <Math>E</Math> are pairs of vertices <Math>(v_1,v_2)</Math>, with <Math>v_1, v_2\in V</Math>.
</BodyText>
<BodyText>
    Initially, these definitions feel rather abstract. But in practice graphs often have very natural interpretations. Generally they are used to model relationships between entities, e.g. the nodes are people signed up for some social network, and an edge is drawn between two people if they are friends. Another common interpretation is as a road network, when the vertices are cities on a map, and an edge is drawn between two cities if it is possible to drive from one city to the other. In this case, there is often a distance <Math>d_e</Math> associated with each <Math>e\in E</Math> that denotes the distance between two cities, and you are perhaps trying to find the shortest route that lets you get from one place to another.
</BodyText>

<BodyText>
    Graphs are typically represented visually as in <FigureRef refId=exampleGraph/>: Each vertex/node is represented as a circle in the diagram, while edges/arcs are denoted by lines between the circles. In the case of <FigureRef refId=exampleGraph/>, the graph being represented is the graph <Math>G=(V,E)</Math> with vertices:
    <MathDisp>V=\{1,2,3,4,5\}</MathDisp>
    and edges:
    <MathDisp>E=\{(1,2), (1,3), (2,3), (2,4), (2,5), (3,5), (4,5)\}</MathDisp>
</BodyText>

<Figure refId=exampleGraph>
    <span slot=caption>
        Visualization of a graph.
    </span>
    <FixedNodeGraph 
        nodes={sampleNodes}
        edges={sampleEdges}
    />
</Figure>

<BodyText>
    Sometimes it makes sense for the edges to be directional. For example, we might want to represent a road network with some one-way streets. Or perhaps we'd like to model teams from a sports league that have played each other, with the edges drawn "from" the winning team "to" the losing team. Such a graph with directed edges are called <Definition refId=directedGraph>
        directed graphs
        <span slot=definition>
            A <DefinitionRef refId=graph/> whose edges are directed, so that for two vertices <Math>v_1, v_2\in V</Math> there is a difference between the edges <Math>(v_1,v_2)</Math> and <Math>(v_2,v_1)</Math>.
        </span>
        <span slot=glossaryDisp>directed graph</span>
    </Definition>, or <Definition refId=digraph>
        digraphs
        <span slot=definition>
            See <DefinitionRef refId=directedGraph/>.
        </span>
        <span slot=glossaryDisp>digraph</span>
    </Definition> for short. In these cases, the ordering of the vertices in each edge <Math>(v_1,v_2)\in E</Math> matters, and we'd say that the edge goes <em>from</em> <Math>v_1</Math> <em>to</em> <Math>v_2</Math>. <FigureRef refId=exampleDirectedGraph/> shows an example visualization of a directed graph. Note that it is entirely possible for digraph edges to exist in both directions between a pair of vertices, as we see with both <Math>(4,5)</Math> and <Math>(5,4)</Math> existing in the figure.
</BodyText>

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

<BodyText>
    In the context of digraphs, it is sometimes customary to denote the graph by <Math>D=(V,A)</Math> instead of <Math>G=(V,E)</Math>, using <Math>D</Math> (for digraph) in place of <Math>G</Math> for the graph and <Math>A</Math> (for arc) in place of <Math>E</Math> for the edge set. Indeed, this is the convention Wolsey takes in <CitationRef refId=wolsey2020/> and so we will try to follow that practice here.
</BodyText>

<BodyText>
    A graph <Math>G=(V,E)</Math> is called <Definition refId=bipartite>
        bipartite
        <span slot=definition>
            A graph <Math>G=(V,E)</Math> where the vertex set <Math>V</Math> can be divided into two sets <Math>V_1</Math> and <Math>V_2</Math> such that every edge in <Math>E</Math> connects a vertex in <Math>V_1</Math> to a vertex in <Math>V_2</Math> (as in <FigureRef refId=exampleBipartiteGraph/>).
        </span>
        <span slot=glossaryDisp>bipartite graph</span>
    </Definition> if its vertex set <Math>V</Math> can be divided into two sets <Math>V_1</Math> and <Math>V_2</Math> such that every edge in <Math>E</Math> connects a vertex in <Math>V_1</Math> to a vertex in <Math>V_2</Math>. An example of such a graph is shown in <FigureRef refId=exampleBipartiteGraph/>.
</BodyText>

<Figure refId=exampleBipartiteGraph>
    <span slot=caption>
        Visualization of a bipartite graph, with <Math>V_1=\{1,2,3\}</Math> and <Math>V_2=\{4,5,6,7\}</Math>
    </span>
    <FixedNodeGraph 
        nodes={bipartiteNodes}
        edges={bipartiteEdges}
        width={300}
    />
</Figure>

<BodyText>
    On a given graph <Math>G</Math>, a <Definition refId=walk>
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
</BodyText>

<BodyText>
    A very similar notion is that of a <Definition refId=trail>
        trail
        <span slot=definition>
            A <DefinitionRef refId=walk/> in which all the edges are distinct.
        </span>
    </Definition>, which is a walk in which all the edges are distinct. Note that the walk <Math>W</Math> from the previous paragraph is also a trail, since it does not repeat any edges. Meanwhile, a walk is called a <Definition refId=path>
        path
        <span slot=definition>
            A <DefinitionRef refId=walk/> in which all the vertices are distinct.
        </span>
    </Definition> if all its vertices (and, therefore also it edges) are distinct. So <Math>W</Math> is <em>not</em> a path, since it travels to vertex <Math>2</Math> twice. But something like
    <MathDisp>
        P=((1, 2), (2, 5), (4, 5))
    </MathDisp>
    <em>is</em> a path, which we can visualize as in <FigureRef refId=examplePath/>.
</BodyText>

<Figure refId=examplePath>
    <span slot=caption>
        Visualization of a path <Math>P=((1, 2), (2, 5), (4, 5))</Math>.
    </span>
    <FixedNodeGraph 
        nodes={sampleNodes}
        edges={sampleEdges}
        boldEdges={samplePathEdges}
    />
</Figure>

<BodyText>
    A <Definition refId=circuit>
        circuit
        <span slot=definition>
            A <DefinitionRef refId=trail/> that starts and ends at the same vertex.
        </span>
    </Definition> is a trail that starts and ends at the vertex. Note that the circuit is defined based on a <em>trail</em>, so therefore edges cannot be repeated in a circuit, though vertices <em>can</em> repeat. A similar notion is the <Definition refId=cycle>
        cycle
        <span slot=definition>
            A <DefinitionRef refId=path/> that begins and ends at the same vertex.
        </span>
    </Definition>, which is a path that begins and ends at the same vertex. A cycle is called a <Definition refId=hamCycle>
        Hamiltonian cycle
        <span slot=definition>
            A <DefinitionRef refId=cycle/> in which every vertex is visited exactly once.
        </span>
    </Definition> if it visits every vertex exactly once. An example Hamiltonian cycle is shown in <FigureRef refId=exampleHamCycle/>.
</BodyText>

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

<BodyText>
    Note that walks, trails, paths, circuits, and cycles can all exist on directed graphs as well, with the natural restriction that the underlying walk must travel in the direction of the edges.
</BodyText>
