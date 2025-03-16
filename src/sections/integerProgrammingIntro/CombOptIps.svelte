<script>
    import EquationRef from "$lib/EquationRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import FixedNodeGraph from "$lib/FixedNodeGraph.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import { layoutInfo } from "$lib/stores";
</script>

<Heading refId=combOptIps level=2>
    <ProblemRef refId=combOpt link={false}/>s as <ProblemRef refId=ip link={false}/>s
    <span slot=context>Modeling our various <ProblemRef refId=combOpt link={false}/> problems as <ProblemRef refId=ip link={false}/>s.</span>
</Heading>

As mentioned, one appealing aspect of learning about <ProblemRef refId=ip/>s is that a wide array of problems can be modeled an ultimately solved in the <ProblemRef refId=ip/> framework.

In this section, we'll give <ProblemRef refId=ip/> formulations for several of the <ProblemRef refId=combOpt/> problems we've encountered. The trick is to set up variables to represent possible decisions you might make in the given problem, and then defining constraints that ensure that solutions are feasible for the <ProblemRef refId=ip/> if and only if there is a corresponding feasible solution to the <ProblemRef refId=combOpt/>. It's not always as easy as that single-sentence description might imply, but figuring them out does tend to get easier with practice.

<Heading refId=maxWeightIndSetIp level=3>
    <ProblemRef refId=maxWeightIndSet link={false}/>
</Heading>

Let's first return to our fun little game from <SectionRef refId=combOptGames/>, the <ProblemRef refId=maxWeightIndSet/>. Here we are given a graph, and are supposed to select a group of non-adjacent vertices in a manner that will maximize the sum of the weights of the vertices.

Since our decisions are which vertices to select, it makes sense to let our decision variables be binary variables $$x_v\in\{0,1\}$$ for $$v\in V$$, where the interpretation is that $$x_v=1$$ if we select vertex $$v$$ and $$x_v=0$$ otherwise. The quantity to maximize is the sum of weights of selected vertices, i.e. $$\sum_{v\in V}w_vx_v$$. The only thing we must ensure is that for any edge $$(u,v)\in E$$ we don't have both $$x_u=1$$ and $$x_v=1$$. So the <ProblemRef refId=ip/> formulation is:

<MathDisp>
    \begin{align*}
        \max&&\sum_{v\in V}w_vx_v \\
        \tag{1}\st&&x_u + x_v &\leq 1 & \forall\ (u,v)\in E \\
        \tag{2}&&x_v&\in\{0,1\} & \forall\ v\in V
    \end{align*}
</MathDisp>

To make it more clear how a compact, general formulation like the above translates to a concrete formulation for a particular instance, let's write out the full model for the instance we displayed in <FigureRef refId=indSetEx/>:

<MathDisp fontSize={0.9}>
    \begin{align*}
        \max&&3x_a + 6x_b + 4x_c + x_d + 2x_e + 6x_f + 3x_g + 2x_h \\
        \tag{1.1}\st&&x_a+x_b&\leq 1 \\
        \tag{1.2}&&x_b+x_c&\leq 1\\
        \tag{1.3}&&x_b+x_e&\leq 1\\
        \tag{1.4}&&x_c+x_d&\leq 1\\
        \tag{1.5}&&x_d+x_f&\leq 1\\
        \tag{1.6}&&x_d+x_g&\leq 1\\
        \tag{1.7}&&x_e+x_f&\leq 1\\
        \tag{1.8}&&x_f+x_g&\leq 1\\
        \tag{1.9}&&x_f+x_h&\leq 1\\
        \tag{2}&&x_a,x_b,x_c,x_d,x_e,x_f,x_g,x_h&\in\{0,1\}
    \end{align*}
</MathDisp>

Notice how constraint (1) from the compact formulation corresponds to 9 different constraints in the concrete instance, one for each edge in the graph.<Footnote>The binary constraint (2) also corresponds to multiple different constraints in the concrete instance, one for each vertex, but we follow standard convention and left it as a one-liner even for the concrete instance.</Footnote>

<Heading refId=shortestPathIp level=3>
    <ProblemRef refId=shortestPath link={false}/>
</Heading>

Recall that in the <ProblemRef refId=shortestPath /> our graph $$G$$ is a digraph, i.e. edges are directed and hence travel <em>from</em> one vertex <em>to</em> another. For our formulation, we'll find it useful to define sets $$E^+(v)$$ as the set of edges that start at vertex $$v$$ and $$E^-(v)$$ as the set of edges that end at $$v$$. We will have one binary variable $$x_e$$ for each edge $$e\in E$$, with the interpretation that $$x_e=1$$ if edge $$e$$ is included in our path, and otherwise $$x_e=0$$. Then the <ProblemRef refId=ip/> formulation is:

<MathDisp refId=shortestPathIp>
    \begin{align*}
        \min&&\sum_{e\in E}c_ex_e \\
        \tag{1}\st&&\sum_{e\in E^+(s)}x_e &\geq 1 \\
        \tag{2}&&\sum_{e\in E^-(t)}x_e &\geq 1 \\
        \tag{3}&&\sum_{e\in E^-(v)}x_e &= \sum_{e\in E^+(v)}x_e & \forall\ v\in V\setminus\{s,t\} \\
        &&x_e&\in\{0,1\}&\forall\ e\in E
    \end{align*}
</MathDisp>

The objective is the cost of all edges selected. The constraint (1) makes sure we have an edge leaving the starting vertex $$s$$, and similarly the constraint (2) makes sure we have an edge entering $$t$$. Constraints (3) say that for any other $$v\in V$$, any time we choose an edge that enters $$v$$ we must also choose an edge that exits $$v$$. Taken together, this means that we will have one edge that leaves $$s$$ and goes to some other vertex $$v_1$$. If $$v_1=t$$ we are done, but otherwise the final set of constraints imply that we must also choose an edge that leaves $$v_1$$ to some other vertex $$v_2$$, and so on until we finally select an edge that enters $$t$$.<Footnote>It's subtly important here that our definition of <ProblemRef refId=shortestPath/> requires the edge costs be positive. Otherwise, if there were a cycle in the graph with negative or 0 overall cost, this formulation could yield a solution that includes that cycle alongside the otherwise shortest $$s-t$$ path, and thus it would not be valid.</Footnote>

<Heading refId=knapsackIp level=3>
    <ProblemRef refId=knapsack link={false}/>
</Heading>

After a couple examples, I modeling the <ProblemRef refId=knapsack /> should be no problem. For each item $$j\in J$$, let variable $$x_j=1$$ if the item is selected and $$x_j=0$$ otherwise. Then the <ProblemRef refId=ip/> formulation is:

<MathDisp>
    \begin{align*}
        \max&&\sum_{j\in J}v_jx_j \\
        \st&&\sum_{j\in J}w_jx_j&\leq b \\
        &&x_j&\in\{0,1\}&\forall\ j\in J
    \end{align*}
</MathDisp>

<Heading refId=assignmentIp level=3>
    <ProblemRef refId=assignment link={false}/>
</Heading>

For the <ProblemRef refId=assignment />, let's take $$x_{ij}\in\{0,1\}$$ for each $$(i,j)\in E$$ as our decision variables, with $$x_{ij}=1$$ if edge $$(i,j)$$ is in the matching (i.e. if person $$i$$ is assigned to job $$j$$), and $$x_{ij}=0$$ otherwise. Then we can formulate the problem as:

<MathDisp>
    \begin{align*}
        \min&&\sum_{(i,j)\in E}c_{ij}x_{ij} \\
        \tag{1}\st&&\sum_{j\in J}x_{ij}&=1&\forall\ i\in V_1 \\
        \tag{2}&&\sum_{i\in I}x_{ij}&=1&\forall\ j\in V_2 \\
        &&x_{ij}&\in\{0,1\}&\forall\ (i,j)\in E
    \end{align*}
</MathDisp>

In the plain English setting of the problem, constraints (1) ensure that each person is assigned to exactly one job, and constraints (2) ensure each job is given to one person.

<Heading refId=setCoverIp level=3>
    <ProblemRef refId=setCover link={false}/>
</Heading>

Those last two we pretty simple. The <ProblemRef refId=setCover /> will make us think a bit more, but the formulation in the end is actually pretty intuitive.

Let's keep the plain-English setup of the problem in mind as we reason through this model. Our decision is, in which of the locations $$j\in N$$ we want to build towers? Let variable $$x_j=1$$ if we build in location $$j$$, and $$x_j=0$$ otherwise.

To make our formulation more concise, let's define the quantity $$a_{ij}$$ for $$i\in M,j\in N$$ as:

<MathDisp>
    a_{ij}=\begin{cases}
        1&\text{if } i\in S_j\text{ (i.e. city }i\text{ can be served by tower location }j\text{.)}\\
        0&\text{otherwise }
    \end{cases}
</MathDisp>

It's important to note that the $$a_{ij}$$ quantities are <em>data</em> for the model which can be computed directly from the problem instance input. These are not decision variables, for which we need the model to choose values for us. So a multiplication $$a_{ij}x_j$$ is just a standard constant multiplied by a variable, i.e. a <em>linear</em> term which can be safely used inside an <ProblemRef refId=ip/> formulation.

With that definition out of the way, writing down the model becomes pretty straightforward:

<MathDisp>
    \begin{align*}
        \min&&\sum_{j\in N}c_jx_j \\
        \tag{1}\st&&\sum_{j\in N}a_{ij}x_j&\geq 1&\forall\ i\in M \\
        &&x_j&\in\{0,1\}&\forall\ j\in N
    \end{align*}
</MathDisp>

Constraints (1) are where we encode the requirement that each city be covered by at least one tower. For any city $$i$$, the only way for the sum $$\sum_{j\in N}a_{ij}x_j$$ to be positive is if there is at least one tower location $$j$$ for which both $$x_j=1$$ (i.e. we've decided to built a tower in location $$j$$) and $$a_{ij}=1$$ (city $$i$$ can be served by location $$j$$).

<Heading refId=tspIp level=3>
    <ProblemRef refId=tsp link={false}/>
</Heading>

The <ProblemRef refId=tsp /> is the trickiest one yet, though it might not look it at first. Indeed, on an initial reading it may seem that this problem is basically the same as the <ProblemRef refId=shortestPath/> we modeled in <EquationRef refId=shortestPathIp/>. But instead of choosing one edge out of both $$s$$ and $$t$$, and either zero or two edges out of all other vertices, this problem requires us to visit each and every vertex exactly once.

Another slight difference between <ProblemRef refId=tsp/> and the <ProblemRef refId=shortestPath/> is that the graph for <ProblemRef refId=tsp/> is not directed. So in this case, analogous to the sets $$E^+(v)$$ and $$E^-(v)$$ we defined earlier, let's define the sets $$E(v)\subseteq E$$ for each $$v\in V$$ as simply the set of edges in $$E$$ with one end in $$v$$. Then, again letting $$x_e$$ be a binary variable where we include edge $$e$$ if and only if $$x_e=1$$, we'll try the straightforward alteration of <EquationRef refId=shortestPathIp/>:

<MathDisp refId=tspIpFailure>
    \begin{align*}
        \min&&\sum_{e\in E}c_ex_e \\
        \st&&\sum_{e\in E(v)}x_e&=2&\forall\ v\in V \\
        &&x_e&\in\{0,1\}&\forall\ e\in E
    \end{align*}
</MathDisp>

Again, on first glance, it seems like this should work. Any feasible solution will have exactly two edges from any given vertex, allowing us to enter and then leave the vertex and continue on with our tour. But there is a problem, which will become evident if you start testing this formulation out on a few examples. Suppose the graph in <FigureRef refId=tspIpFailureGraph/> is the input instance for <ProblemRef refId=tsp/>.<Footnote>Technically, <ProblemRef refId=tsp/> specifies that the graph $$G$$ must be complete. To satisfy this requirement, you can imagine adding the missing edges with arbitrarily large edge weights.</Footnote>

<Figure refId=tspIpFailureGraph>
    <span slot=caption>
        A graph on which <EquationRef refId=tspIpFailure/> will fail to give the correct answer for <ProblemRef refId=tsp/>.
    </span>
    <FixedNodeGraph
        height={350}
        width={750}
        nodeSize={Math.max(40, Math.min(60, $layoutInfo.notesWidth / 10))}
        nodes={[
            {id: 'a', x: 0, y: 0.5},
            {id: 'b', x: 0.2, y: 1},
            {id: 'c', x: 0.8, y: 1},
            {id: 'd', x: 1, y: 0.5},
            {id: 'e', x: 0.8, y: 0},
            {id: 'f', x: 0.2, y: 0},
        ]}
        edges={['a-b-1','a-f-1','b-c-4','b-f-1','c-d-1','c-e-1','d-e-1','e-f-4']}
    />
</Figure>

It shouldn't take much to convince yourself that the optimal tour for this graph is the one that follows in alphabetical order and achieves the optimal cost of 12:

<Figure refId=tspIpFailureGraphOpt>
    <span slot=caption>
        Edges of the optimal tour, with cost 12.
    </span>
    <FixedNodeGraph
        height={350}
        width={750}
        nodeSize={Math.max(40, Math.min(60, $layoutInfo.notesWidth / 10))}
        nodes={[
            {id: 'a', x: 0, y: 0.5},
            {id: 'b', x: 0.2, y: 1},
            {id: 'c', x: 0.8, y: 1},
            {id: 'd', x: 1, y: 0.5},
            {id: 'e', x: 0.8, y: 0},
            {id: 'f', x: 0.2, y: 0},
        ]}
        edges={['a-b-1','a-f-1','b-c-4','b-f-1','c-d-1','c-e-1','d-e-1','e-f-4']}
        boldEdges={['a-b','b-c','c-d','d-e','e-f','a-f']}
    />
</Figure>

However, consider the following selection of edges:

<Figure refId=tspIpFailureGraphSubtour>
    <span slot=caption>
        A selection of edges that satisfies <EquationRef refId=tspIpFailure/> but does not yield a valid tour.
    </span>
    <FixedNodeGraph
        height={350}
        width={750}
        nodeSize={Math.max(40, Math.min(60, $layoutInfo.notesWidth / 10))}
        nodes={[
            {id: 'a', x: 0, y: 0.5},
            {id: 'b', x: 0.2, y: 1},
            {id: 'c', x: 0.8, y: 1},
            {id: 'd', x: 1, y: 0.5},
            {id: 'e', x: 0.8, y: 0},
            {id: 'f', x: 0.2, y: 0},
        ]}
        edges={['a-b-1','a-f-1','b-c-4','b-f-1','c-d-1','c-e-1','d-e-1','e-f-4']}
        boldEdges={['a-b','b-f','c-d','d-e','c-e','a-f']}
    />
</Figure>

Indeed, there are exactly two incident edges for each vertex in the graph, meaning this selection satisfies all constraints of <EquationRef refId=tspIpFailure/> but with a lower cost of 6!

This is illustrative of a common pitfall of <ProblemRef refId=ip/> modeling - not fully capturing the essence of the modeled problem. In this case, the formulation guaranteed that all solutions to <ProblemRef refId=tsp/> will satisfy the constraints of the formulation. But we neglected the other direction, guaranteeing that any solution to the <ProblemRef refId=ip/> constraints will correspond to a valid solution of the <ProblemRef refId=tsp/> instance.

How can we fix the formulation? Even though every vertex is part of some cycle, our constraints do not guarantee that every vertex is part of the <em>same</em> cycle. The solution is to add a group of so-called subtour elimination constraints, which will guarantee that the resultant graph is connected and thus only contains the one cycle consisting of all vertices.

So what are those constraints? Let's look back at <FigureRef refId=tspIpFailureGraphSubtour/> for inspiration. One way to disallow that particular solution is to enforce that there is at least one edges between the two subtours, i.e.

<MathDisp>
    \sum_{(i,j)\in E:i\in\{a,b,f\},j\in\{c,d,e\}}x_{ij}\geq 1 
</MathDisp>

This would be equivalent to constraining that no cycle is allow amongst either the set $$\{a,b,f\}$$ or $$\{c,d,e\}$$. For the set $$\{a,b,f\}$$ that would look like

<MathDisp>
    \sum_{(i,j)\in E:i,j\in\{a,b,f\}}x_{ij}\leq 2
</MathDisp>

since a cycle among three vertices requires three edges.

Of course, either of these constraints would only suffice to eliminate one particular subtour. A priori, it's possible for a solution to come back with a cycle among the vertices $$\{b,c,d\}$$, or $$\{a,c,f\}$$, or any given subset of $$V$$. So to guarantee our formulation is correct, we must add a subtour elimination constraint for <em>every</em> possible subset of vertices.<Footnote>Ok, this is not quite true... Again looking at our example in <FigureRef refId=tspIpFailureGraphSubtour/>, we should note that if we add the constraint we just wrote for the set $$\{a,b,f\}$$:
<MathDisp>
    \sum_{(i,j)\in E:i,j\in\{a,b,f\}}x_{ij}\leq 2
</MathDisp>
We do not also need the constraint for the complement set $$\{c,d,e\}$$. Why? Because that prior constraint is already forcing an edge $$e'$$ from $$\{a,b,f\}$$ to $$\{c,d,e\}$$. If $$\{c,d,e\}$$ formed a cycle, there'd be no way to add the edge $$e'$$ as well without having one of the vertices $$c,d,$$ or $$e$$ touching more than two edges.

Along the same lines, we also don't need the constraint for sets of only one or two vertices, because (in a simple graph without self-edges or repeated edges) you can't have a cycle on only one or two vertices.

Of course, if you only care about the <em>validity</em> of a formulation and not about how long it takes to solve, there is nothing wrong with including redundant constraints. So for clarity of exposition, we will add constraints for every subset of $$V$$.
</Footnote> This leads to our final, valid formulation:

<MathDisp refId=tspIp>
    \begin{align*}
        \min&&\sum_{e\in E}c_ex_e \\
        \st&&\sum_{e\in E(v)}x_e&=2&\forall\ v\in V \\
        \tag{1}&&\sum_{(i,j)\in E:i,j\in S}x_{ij} &\leq |S| - 1 &\forall\ S\subseteq V, 0 < |S| < |V| \\
        &&x_e&\in\{0,1\}&\forall\ e\in E
    \end{align*}
</MathDisp>