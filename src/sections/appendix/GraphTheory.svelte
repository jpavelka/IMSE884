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
</script>

<Heading level=2 refId=graphTheory>
    Graph theory
    <span slot=context>Some basics from graph theory, which are useful for describing several common combinatorial optimization problems.</span>
</Heading>
<BodyText>
    Familiarity with graph theory will be useful for this course. You don't need to know too much though, really just the basic definitions should be enough to understand the material. For interested readers, Reinhard Diestel's <em>Graph Theory</em> <CitationRef refId=diestel2018></CitationRef> is an excellent overview of the topic.
</BodyText>
<BodyText>
    <em>Graph theory</em> is a branch of mathematics that studies a certain type of object called a graph. A <em>graph</em> is composed of two entities called <em>vertices</em> (also called <em>nodes</em>) and <em>edges</em> (also called <em>arcs</em>). Graphs are used to model relationships (denoted by the edges) between pairs of entities (represented by the nodes). More concretely, let a graph <Math>G=(V,E)</Math> be defined by the pair of sets <Math>V</Math> and <Math>E</Math>. <Math>V</Math> is the set of vertices, and the elements of <Math>E</Math> are pairs of vertices <Math>(v_1,v_2)</Math>, with <Math>v_1, v_2\in V</Math>.
</BodyText>
<BodyText>
    Initially, these definitions feel rather abstract. But in practice graphs often have very natural interpretations. Generally they are used to model relationships between entities, e.g. the nodes are people signed up for some social network, and an edge is drawn between two people if they are friends. Another common interpretation is as a road network, when the vertices are cities on a map, and an edge is drawn between two cities if it is possible to drive from one city to the other. In this case, there is often a distance <Math>d_e</Math> associated with each <Math>e\in E</Math> that denotes the distance between two cities, and you are perhaps trying to find the shortest route that lets you get from one place to another.
</BodyText>

<BodyText>
    Graphs are typically represented visually as in <FigureRef refId=exampleGraph/>: Each vertex/node is represented as a circle in the diagram, while edges/arcs are denoted by lines between the circles. In the case if <FigureRef refId=exampleGraph/>, the graph being represented is the graph <Math>G=(V,E)</Math> with vertices:
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
    Sometimes it makes sense for the edges to be directional. For example, we might want to represent a road network with some one-way streets. Or perhaps we'd like to model teams from a sports league that have played each other, with the edges drawn "from" the winning team "to" the losing team. Such a graph with directed edges are called <em>directed graphs</em>, or <em>digraphs</em> for short. In these cases, the ordering of the vertices in each edge <Math>(v_1,v_2)\in E</Math> matters, and we'd say that the edge goes <em>from</em> <Math>v_1</Math> <em>to</em> <Math>v_2</Math>. <FigureRef refId=exampleDirectedGraph/> shows an example visualization of a directed graph. Note that it is entirely possible for digraph edges to exist in both directions between a pair of vertices, as we see with both <Math>(v_4,v_5)</Math> and <Math>(v_5,v_4)</Math> existing in the figure.
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
    On a given graph <Math>G</Math>, a <em>walk</em> is a sequence of edges which joins a sequence of vertices, such that it denotes a way to "walk" from one vertex to another using the edges of the graph. So
    <MathDisp>
        W=((v_1, v_2), (v_2, v_5), (v_4, v_5), (v_2, v_4), (v_2, v_3))
    </MathDisp>
    is a walk in the graph shown in <FigureRef refId=exampleGraph/>, which represents traveling the sequence of vertices:
    <MathDisp>
        v_1\rightarrow v_2\rightarrow v_5\rightarrow v_4\rightarrow v_2\rightarrow v_3
    </MathDisp>
</BodyText>

<BodyText>
    A very similar notion is that of a <em>trail</em>, which is a walk in which all the edges are distinct. Note that the walk <Math>W</Math> from the previous paragraph is also a trail, since it does not repeat any edges. Meanwhile, a walk is called a <em>path</em> if all its vertices (and, therefore also it edges) are distinct. So <Math>W</Math> is <em>not</em> a path, since it travels to vertex <Math>v_2</Math> twice. But something like
    <MathDisp>
        P=((v_1, v_2), (v_2, v_5), (v_4, v_5))
    </MathDisp>
    <em>is</em> a path, which we can visualize as in <FigureRef refId=examplePath/>.
</BodyText>

<Figure refId=examplePath>
    <span slot=caption>
        Visualization of a path <Math>P=((v_1, v_2), (v_2, v_5), (v_4, v_5))</Math>.
    </span>
    <FixedNodeGraph 
        nodes={sampleNodes}
        edges={sampleEdges}
        boldEdges={samplePathEdges}
    />
</Figure>

<BodyText>
    A <em>circuit</em> is a trail that starts and ends at the vertex. Note that the circuit is defined based on a <em>trail</em>, so therefore cannot be repeated in a circuit, though vertices <em>can</em> repreat. A similar notion is the <em>cycle</em>, which is a path that begins and ends at the same vertex. A cycle is called a <em>Hamiltonian cycle</em> if it visits every vertex exactly once. An example Hamiltonian cycle is shown in <FigureRef refId=exampleHamCycle/>.
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
