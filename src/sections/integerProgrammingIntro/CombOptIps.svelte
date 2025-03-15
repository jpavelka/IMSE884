<script>
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import SectionRef from "$lib/SectionRef.svelte";

</script>

<Heading refId=combOptIps level=2>
    <ProblemRef refId=combOpt link={false}/>s as <ProblemRef refId=ip link={false}/>s
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
        \st&&x_u + x_v &\leq 1 & \forall\ (u,v)\in E \\
        &&x_v&\in\{0,1\} & \forall\ v\in V
    \end{align*}
</MathDisp>

<Heading refId=shortestPathIp level=3>
    <ProblemRef refId=shortestPath link={false}/>
</Heading>

Recall that in the <ProblemRef refId=shortestPath /> our graph $$G$$ is a digraph, i.e. edges are directed and hence travel <em>from</em> one vertex <em>to</em> another. For our formulation, we'll find it useful to define sets $$E^+(v)$$ as the set of edges that start at vertex $$v$$ and $$E^-(v)$$ as the set of edges that end at $$v$$. We will have one binary variable $$x_e$$ for each edge $$e\in E$$, with the interpretation that $$x_e=1$$ if edge $$e$$ is included in our path, and otherwise $$x_e=0$$. Then the <ProblemRef refId=ip/> formulation is:

<MathDisp>
    \begin{align*}
        \min&&\sum_{e\in E}c_ex_e \\
        \st&&\sum_{e\in E^+(s)}x_e &\geq 1 \\
        &&\sum_{e\in E^-(t)}x_e &\geq 1 \\
        &&\sum_{e\in E^-(v)}x_e &= \sum_{e\in E^+(v)}x_e & \forall\ v\in V\setminus\{s,t\} \\
        &&x_e&\in\{0,1\}&\forall\ e\in E
    \end{align*}
</MathDisp>

The objective is the cost of all edges selected. The first constraint makes sure we have an edge leaving the starting vertex $$s$$, and similarly the second constraint makes sure we have an edge entering $$t$$. The final group of constraints says that for any other $$v\in V$$, any time we choose an edge that enters $$v$$ we must also choose an edge that exits $$v$$. Taken together, this means that we will have one edge that leaves $$s$$ and goes to some other vertex $$v_1$$. If $$v_1=t$$ we are done, but otherwise the final set of constraints imply that we must also choose an edge that leaves $$v_1$$ to some other vertex $$v_2$$, and so on until we finally select an edge that enters $$t$$.

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
        \st&&\sum_{j\in J}x_{ij}&=1&\forall\ i\in V_1 \\
        &&\sum_{i\in I}x_{ij}&=1&\forall\ j\in V_2 \\
    \end{align*}
</MathDisp>

In the plain English setting of the problem, the first set of constraints ensures that each person is assigned to exactly one job, and the second set ensures each job is given to one person.

<Heading refId=setCoverIp level=3>
    <ProblemRef refId=setCover link={false}/>
</Heading>

After a few simple ones, things get more interesting for the <ProblemRef refId=setCover />

<Heading refId=tspIp level=3>
    <ProblemRef refId=tsp link={false}/>
</Heading>

The <ProblemRef refId=tsp /> is also a tricky one, and you might say deceptively so.