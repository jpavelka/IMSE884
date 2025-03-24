<script>
    import Algorithm from "$lib/Algorithm.svelte";
    import AlgorithmRef from "$lib/AlgorithmRef.svelte";
    import AlgoText from "$lib/AlgoText.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Definition from "$lib/Definition.svelte";
    import DefinitionRef from "$lib/DefinitionRef.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import FixedNodeGraph from "$lib/FixedNodeGraph.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import Problem from "$lib/Problem.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import Theorem from "$lib/Theorem.svelte";
</script>

<Heading level=2 refId=reductions>
    Completeness and reductions
</Heading>

In this section, we'll show how different, and sometimes seemingly unrelated problems, can be united via the concept of reduction. To do so, I'll need to introduce you to one of the most important problems in complexity theory. But before we get there, we should talk a little bit about Boolean algebra.

In Boolean algebra, we deal with variables that take on one of the truth values "true" or "false", though we typically sub the numbers 1 for "true" and 0 for "false". We have three elementary operations, "and" (also known as conjunction, and denoted by $$\land$$), "or" (disjunction, $$\lor$$) and "not" (negation, $$\neg$$). For Boolean variables $$x$$ and $$y$$, they follow these simple conditions:

<MathDisp>
    \begin{align*}
        x\land y&=\begin{cases}
            1&\text{if }x=1\text{ and }y=1\\
            0&\text{otherwise}
        \end{cases} \\
        x\lor y&=\begin{cases}
            1&\text{if }x=1\text{ or }y=1\\
            0&\text{otherwise}
        \end{cases} \\
        \neg x&=\begin{cases}
            1&\text{if }x=0\\
            0&\text{if }x=1
        \end{cases}
    \end{align*}
</MathDisp>

A <Definition refId=booleanFormula>
    Boolean formula
    <span slot=definition>
        An expression involving Boolean variables (which can take 0/1 values) and Boolean operations ($$\land,\lor$$, and $$\neg$$)
    </span>
</Definition> is an expression involving Boolean variables and operations. A Boolean formula is <Definition refId=satisfiable>
    satisfiable
    <span slot=definition>
        In Boolean algebra, a <DefinitionRef refId=booleanFormula/> is said to be satisfiable if there is some assignment of 0s and 1s to the variables that makes the formula evaluate to 1.
    </span>
</Definition> if some assignment of 0s and 1s to the variables makes the formula evaluate to 1. For example,
<MathDisp>
    \begin{align*}
        \phi=(\neg x\land y)\lor(x\land \neg z)
    \end{align*}
</MathDisp>
is a Boolean formula with three variables, $$x,y,$$ and $$z$$. It also happens to be satisfiable, as letting $$x=0$$ and $$y=1$$ (and then $$z$$ either 0 or 1) makes $$\phi$$ evaluate to 1.

Now we are ready to define the problem:

<Problem refId=sat>
    <span slot=name>Satisfiability</span>
    <span slot=abbrev>SAT</span>
    <span slot=instance>A Boolean formula $$\phi$$.</span>
    <span slot=problem>Is $$\phi$$ satisfiable? That is, is there an assignment of 0s and 1s to the variables such that $$\phi$$ evaluates to 1?</span>
</Problem>

It should be clear that <ProblemRef refId=sat/> is in $$\NP$$: the certificate for a YES instance is simply the satisfying variable assignments, which can be checked quickly by plugging the values into the formula.

<Heading refId=npCompleteness level=3>
    $$\NP$$-completness
</Heading>

What's less clear is that <ProblemRef refId=sat/> has a special property that relates it to <em>all other</em> problems in $$\NP$$. It is not the only problem with this property, but it was the first one for which it was proven. It turns out that if you take an instance of <em>any</em> problem in $$\NP$$, you can in polynomial time convert that instance into an instance of <ProblemRef refId=sat/>. Moreover, the instance of the original problem is a YES instance if and only if the converted <ProblemRef refId=sat/> instance is a YES instance.

It's a neat trick for sure, but there is a deeper implication. Suppose you happened to find a polynomial-time algorithm for <ProblemRef refId=sat/>. You could then use that algorithm to solve <em>any other</em> $$\NP$$ problem in polynomial time. How? Take the instance of the other problem, reduce it polynomial time (using the algorithm referenced above) to an instance of <ProblemRef refId=sat/>, then use your new polynomial algorithm for <ProblemRef refId=sat/> to the the answer. The addition of two polynomials is still a polynomial, so the total run time of this scheme is also polynomial.

This means that, by virtue of your new algorithm for this one problem, you've now proven that any problem in $$\NP$$ has a polynomial-time algorithm. This means you've shown that $$\P=\NP$$! Congratulations on the $1 million and your newfound celebrity!

More formally, this process of taking an instance of one problem and converting it to an instance of another problem, while preserving the solution (YES/NO) of the problem, is called a <Definition refId=reduction>
    reduction
    <span slot=definition>In complexity theory, a reduction is a process of converting an instance of one problem into an instance of another, while maintaining the property that the input instance is a YES instance if and only if the output instance is a YES instance.</span>
</Definition>. If the reduction can be done in polynomial time with respect to the length of the input instance, then it is called a <Definition refId=polynomialReduction>
    polynomial reduction
    <span slot=definition>A <DefinitionRef refId=reduction/> that can run in time bounded by a polynomial in the length of the input instance.</span>
</Definition>

If a problem is in some complexity class and has the property that any problem in that class can be reduced to it in polynomial time, this problem is said to be "complete" for the class. This is meant to convey that the problem somehow embodies all the difficulty of problems in the class. In that way, you may think of the complete problems as the hardest problems in a given class. Since <ProblemRef refId=sat/> satisfies this for the class $$\NP$$, we say that <ProblemRef refId=sat/> is <Definition refId=npComplete plainText='NP-complete'>
    $$\NP$$-complete
    <span slot=glossaryDisp>$$\NP$$-complete problem</span>
    <span slot=definition>A problem in the class $$\NP$$ for which there exists a polynomial reduction from any other problem in $$\NP$$ to it.</span>
</Definition>.

Unfortunately, <a href=https://en.wikipedia.org/wiki/Cook%E2%80%93Levin_theorem>the original proof</a> of <ProblemRef refId=sat/>'s $$\NP$$-completeness is way outside the scope of this course. We would need to build up a more rigorous version of complexity theory, and even then the proof itself can get pretty lengthy. It takes up 6(!) pages in the excellent text <CitationRef refId=sipser2012introduction/><Footnote>That text has also been my main inspiration for most of this section.</Footnote>.

Luckily, once you have one complete problem for a class, it becomes much easier to add more. Why? The original complete problem needs a reduction scheme for <em>any</em> problem in the class. But once you already have <ProblemRef refId=sat/> as an $$\NP$$-complete problem, for subsequent problems it suffices to only show a reduction from <ProblemRef refId=sat/> to the new problem. This works because any given problem in $$\NP$$ can be converted to <ProblemRef refId=sat/> in polynomial time, and then your new reduction will take it from <ProblemRef refId=sat/> to the problem of interest.

And there is no limit to the length of the chain of reductions, since the sum of a finite number of polynomials will always be a polynomial. So that is how $$\NP$$-completeness proofs go these days: pick some problem in $$\NP$$ and create a reduction to your new problem.

<Heading refId=exampleReduction level=3>
    An example reduction
</Heading>

There is now a fairly large <a href=https://en.wikipedia.org/wiki/List_of_NP-complete_problems>collection of problems</a> that have been proven to be $$\NP$$-complete. One such problem is a variant of <ProblemRef refId=sat/> that is a little easier to work with. We'll define it soon, but it will be useful to define a few more terms from Boolean algebra.

In a Boolean expression, any variable or negated variable (e.g. $$x$$ or $$\neg x$$) is called a <Definition refId=literal>
    literal
    <span slot=definition>
        A variable or negated variable in a Boolean formula. For example, in the formula $$(x_1\lor x_2)\land(\neg x_3\lor \neg x_2)$$, $$x_1,x_2,\neg x_2,$$ and $$x_3$$ are all literals.
    </span>
</Definition>. A <Definition refId=clause>
    clause
    <span slot=definition>
        Several Boolean literals connected with "or" operators, e.g. $$x_1\lor\neg x_2\lor x_3$$.
    </span>
</Definition> is a sequence of literals connected with "or" operators, e.g. $$x_1\lor\neg x_2\lor x_3$$. A Boolean formula is said to be in <Definition refId=cnf>
    conjunctive normal form
    <span slot=definition>
        A Boolean formula is said to be in conjuctive normal form if it comprises several <DefinitionRef refId=clause/>s connected with "and" operators.
    </span>
</Definition> if it comprises several clauses connected with "and" operators. So the formula
<MathDisp>
    (x_1\lor x_2\lor \neg x_3)\land(x_4\lor\neg x_1\lor x_3)\land(\neg x_2\lor x_4\lor \neg x1)
</MathDisp>
if in conjunctive normal form.

We're now ready to define our more user-friendly form of <ProblemRef refId=sat/>

<Problem refId=3sat>
    <span slot=name>3-Satisfiability</span>
    <span slot=abbrev>3-SAT</span>
    <span slot=instance>An instance of <ProblemRef refId=sat/> where the formula $$\phi$$ is in conjunctive normal form and each clause contains three literals.
    </span>
    <span slot=problem>Is $$\phi$$ satisfiable? That is, is there an assignment of 0s and 1s to the variables such that $$\phi$$ evaluates to 1?</span>
</Problem>

Obviously, every <ProblemRef refId=3sat/> instance is also a <ProblemRef refId=sat/> instance. You may look at <ProblemRef refId=3sat/> and assume it is less useful than the regular <ProblemRef refId=sat/>, but that's actually not true! We mentioned above that <ProblemRef refId=3sat/> is $$\NP$$-complete, so there is a polynomial reduction from <ProblemRef refId=sat/><Footnote>Or, consequently, any other problem in $$\NP$$.</Footnote> to <ProblemRef refId=3sat/>.

That reduction is interesting in it's own right, but we are not going to go through it here. Instead, for our first reduction, I'd like to introduce a problem that's given in the language of graph theory, and consequently looks more like the types of problems we've been studying.

<Problem refId=clique>
    <span slot=name>CLIQUE</span>
    <span slot=instance>A graph $$G=(V,E)$$ and an integer $$k\in\Z_{>0}$$.</span>
    <span slot=problem>Is there a clique in $$G$$ of size $$k$$?</span>
</Problem>

In graph theory, a <Definition refId=clique>
    clique
    <span slot=definition>In graph theory, a set of vertices in a graph such that there is an edge between every pair of vertices in $$K$$.</span>
</Definition> is a set of vertices $$K\subseteq V$$ such that $$(u,v)\in E$$ for any pair of vertices $$u,v\in K$$. In other words, it is a set of vertices, all of whom are adjacent to each other. A clique with $$k\in\Z_{>0}$$ vertices is called a <Definition refId=kClique>
    $$k$$-clique
    <span slot=definition>A <DefinitionRef refId=clique/> with $$k$$ vertices.</span>
</Definition>.
<Figure>
    <FixedNodeGraph
        nodes={[
            {id: 'a', x: 0.25, y: 1},
            {id: 'b', x: 0.75, y: 1},
            {id: 'c', x: 0.25, y: 0},
            {id: 'd', x: 0.75, y: 0},
            {id: 'e', x: 0.5, y: 0.75},
            {id: 'f', x: 0, y: 0.5},
            {id: 'g', x: 1, y: 0.8},
            {id: 'h', x: 1, y: 0.2},
        ]}
        edges={["a-b", "a-c", "a-d", "a-e", "b-c", "b-d", "b-e", "c-d", "c-e", "d-e", "a-f", "b-g", "c-f", "d-h", "g-h"]}
        boldEdges={["a-b", "a-c", "a-d", "a-e", "b-c", "b-d", "b-e", "c-d", "c-e", "d-e"]}
    />
    <span slot=caption>A graph with a 5-clique highlighted (vertices $$\{a, b, c, d, e\}$$)</span>
</Figure>

What I'd like to do now is show you a reduction from <ProblemRef refId=3sat/> to <ProblemRef refId=clique/>. It's probably easiest to start with an example. How about this sample <ProblemRef refId=3sat/> instance:

<MathDisp refId=3satInstanceToClique>
    \phi = (x_1\lor x_2\lor x_3)\land(\neg x_1\lor \neg x_2\lor x_3)\land(\neg x_1\lor x_2\lor \neg x_3)
</MathDisp>

Compare that to the following graph:

<Figure refId=cliqueInstanceFrom3sat>
    <FixedNodeGraph
        nodes={[
            {id: '1x1', x: 0, y: 0.67},
            {id: '1x2', x: 0.1, y: 0.33},
            {id: '1x3', x: 0.2, y: 0},
            {id: '2x1', x: 0.25, y: 1},
            {id: '2x2', x: 0.5, y: 1},
            {id: '2x3', x: 0.75, y: 1},
            {id: '3x1', x: 1, y: 0.67},
            {id: '3x2', x: 0.9, y: 0.33},
            {id: '3x3', x: 0.8, y: 0},
        ]}
        edges={["1x1-2x2", "1x1-2x3", "1x1-3x2", "1x1-3x3", "1x2-2x1", "1x2-2x3", "1x2-3x1", "1x2-3x2", "1x2-3x3", "1x3-2x1", "1x3-2x2", "1x3-2x3", "1x3-3x1", "1x3-3x2", "2x1-3x1", "2x1-3x2", "2x1-3x3", "2x2-3x1", "2x2-3x3", "2x3-3x1", "2x3-3x2"]}
    />
    <span slot=caption>The graph produced by a reduction of the <ProblemRef refId=3sat/> instance in <EquationRef refId=3satInstanceToClique/> to an instance of <ProblemRef refId=clique/>.</span>
</Figure>

The graph in <FigureRef refId=cliqueInstanceFrom3sat/> is built using information from our <ProblemRef refId=3sat/> instance $$\phi$$ in <EquationRef refId=3satInstanceToClique/>. There is one vertex for every literal in each clause of $$\phi$$. In the figure, the vertex labels give first the clause being considered, then the variable in the literal represented. So the label $$1x1$$ corresponds to clause 1 variable $$x_1$$, the label $$3x2$$ corresponds to clause 3 variable $$x_2$$, and so on.

The rules for drawing edges are as follows:
<ul>
    <li>If two vertices represent the same clause, do not add an edge.</li>
    <li>
        If two vertices represent different clauses then:
        <ul>
            <li>If the two edges represent different variables, add an edge.</li>
            <li>If the two edges represent the same variable $$x_i$$, add an edge if and only if <em>literals</em> are equivalent (i.e. do not add an edge in the case that $$x_i$$ appears in one clause and $$\neg x_i$$ appears in the other.)</li>
        </ul>
    </li>
</ul>

To check your understanding, you can go back to <FigureRef refId=cliqueInstanceFrom3sat/> and click on some of the vertices to highlight their corresponding edges. For instances, no pair of nodes starting with the same number are connected with and edge, because that first number denotes the clause they represent. Looking across clauses, vertex $$1x2$$ has an edge to all the other cross-clause vertices, with the exception of $$2x2$$. This is because in the first clause the corresponding literal is $$x_2$$, while in the second clause the literal is the negation $$\neg x_2$$.

That's really the core of the reduction. Let's write up some very loose pseudocode to have as a reference.

<Algorithm refId=3sat2clique>
    <span slot=name>
        <ProblemRef refId=3sat link={false}/> to <ProblemRef refId=clique link={false}/>
    </span>
    <span slot=for>
        Reducing <ProblemRef refId=3sat/> to <ProblemRef refId=clique/>
    </span>
    <AlgoText>
        Set $$k$$ to be the number of clauses in $$\phi$$.
    </AlgoText>
    <AlgoText>
        Create a graph $$G=(V,E)$$ with three vertices per clause and each vertex representing one of the clause's literals.
    </AlgoText>
    <AlgoText type=for>
        Distinct vertices $$v_i,v_j\in V$$ (representing clauses  $$c_i,c_j$$, literals $$l_i,l_j$$, and variables $$x_i,x_j$$).
        <AlgoText type=if>
            $$c_i\neq c_j$$
                <AlgoText type=if>
                    $$x_i\neq x_j$$
                    <AlgoText>Add edge $$(v_i,v_j)$$ to $$E$$.</AlgoText>
                </AlgoText>
                <AlgoText type=else>
                    <AlgoText type=if>
                        $$l_i$$ and $$l_j$$ do <em>not</em> contradict each other (i.e. it is not the case that one equals $$x_i$$ and the other equals $$\neq x_i$$) then add edge $$(v_i,v_j)$$ to $$E$$.
                    </AlgoText>                    
                </AlgoText>
        </AlgoText>
    </AlgoText>
</Algorithm>

The claim is that this is a valid polynomial reduction from <ProblemRef refId=3sat/> to <ProblemRef refId=clique/>. As a reminder, in order to do that we'll need to show three things:
<ul>
    <li>The transformation requires a number of steps bounded by a polynomial in the input instance's length.</li>
    <li>If the <ProblemRef refId=3sat/> instance is a YES instance, then the <ProblemRef refId=clique/> instance is also a YES instance.</li>
    <li>Conversely, if the <ProblemRef refId=3sat/> instance is a NO instance, then the <ProblemRef refId=clique/> instance is also a NO instance. Note that by contrapositive (and the fact that each instance must be either a YES or a NO), this is the same as saying that if the <ProblemRef refId=clique/> instance is a YES instance, then the <ProblemRef refId=3sat/> instance is a YES instance.</li>
</ul>
Let's do it.

<Theorem refId=3sat2Clique thmType=proposition>
    <AlgorithmRef refId=3sat2clique/> gives a polynomial reduction from <ProblemRef refId=3sat/> to <ProblemRef refId=clique/>.
    <span slot=proof>
        It is clear that the length of the input instance is directly related to the number of clauses $$k$$ in $$\phi$$. Meanwhile, the graph created has $$|V|=3k$$ and $$|E|$$ is bounded by $$k^2$$. Thus the run time of <AlgorithmRef refId=3sat2clique/> is $$\O{k^2}$$.

        Now let's suppose that the input is a YES instance. Then there must be some satisfying assignment of the variables, and hence in each clause there is at least one literal whose assignment evaluates to true. Take one such literal for each clause, and let $$K\subseteq V$$ be the set of vertices representing these literals. We claim $$K$$ is a $$k$$-clique. Clearly $$|K|=k$$. Also, for each distinct pair $$v_i,v_j\in K$$, $$v_i$$ and $$v_j$$ represent different clauses, and if they represent the same variable the literals cannot contradict each other (since they came from a satisfying assignment). So, following the rules of the construction, $$(v_i,v_j)\in E$$, confirming $$K$$ is a $$k$$-clique.

        Now suppose that $$G$$ has a $$k$$-clique $$K$$. By construction, there can only be one vertex per clause in $$K$$ (because there are no edges between vertices representing the same clause). So there must be exactly one vertex in $$K$$ representing any particular clause. To satisfy $$\phi$$, for each vertex $$v\in K$$ consider the variable (call it $$x_{v}$$) and clause it represents. For the assignment, set $$x_{v}$$ to 1 if the corresponding literal is not negated in the clause, and set it to 0 otherwise. This give us a satisfied literal in each clause, and it cannot lead to any contradictions in variable values, since contradictory vertices cannot have edges between them. Therefore such an assignment will satisfy $$\phi$$.
    </span>
</Theorem>

NEED TO REDO, DEFINING AND MAKING USE OF THE TERM "LITERAL"
