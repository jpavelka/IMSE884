<script>
    import CitationRef from "$lib/CitationRef.svelte";
    import Definition from "$lib/Definition.svelte";
    import DefinitionRef from "$lib/DefinitionRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import FixedNodeGraph from "$lib/FixedNodeGraph.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import Problem from "$lib/Problem.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import Theorem from "$lib/Theorem.svelte";
</script>

<Heading level=2 refId=reductions>
    Reductions
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
    <span slot=instance>A Boolean formula $$\phi$$ over variables $$x_1,x_2,...x_n$$.</span>
    <span slot=problem>Is $$\phi$$ satisfiable? That is, is there an assignment of 0s and 1s to the variables such that $$\phi$$ evaluates to 1?</span>
</Problem>

It should be clear that <ProblemRef refId=sat/> is in $$\NP$$: the certificate for a YES instance is simply the satisfying variable assignments, which can be checked quickly by plugging the values into the formula.

<Heading refId=npCompleteness level=3>
    $$\NP$$-completness
</Heading>

What's less clear is that <ProblemRef refId=sat/> has a special property that relates it to <em>all other</em> problems in $$\NP$$. It is not the only problem with this property, but it was the first one for which it was proven. It turns out that if you take an instance of <em>any</em> problem in $$\NP$$, you can in polynomial time convert that instance into an instance of <ProblemRef refId=sat/>. Moreover, the instance of the original problem is a YES instance if and only if the converted <ProblemRef refId=sat/> instance is a YES instance.

It's a neat trick for sure, but there is a deeper implication. Suppose you happened to find a polynomial-time algorithm for <ProblemRef refId=sat/>. You could then use that algorithm to solve <em>any other</em> $$\NP$$ problem in polynomial time. How? Take the instance of the other problem, reduce it polynomial time (using the algorithm referenced above) to an instance of <ProblemRef refId=sat/>, then use your new polynomial algorithm for <ProblemRef refId=sat/> to the the answer. The addition of two polynomials is still a polynomial, so the total run time of this scheme is also polynomial.

This means that, by virtue of your new algorithm for this one problem, you've now proven that any problem in $$\NP$$ has a polynomial-time algorithm. This means you've shown that $$\P=\NP$$! Congratulations on the $1 million and your newfound celebrity!

More formally, this process of taking an instance of one problem and converting it to an instance of another problem, while preserving the solution (YES/NO) of the problem, is called a <DefinitionRef refId=reduction>
    reduction
    <span slot=definition>In complexity theory, a reduction is a process of converting an instance of one problem into an instance of another, while maintaining the property that the input instance is a YES instance if and only if the output instance is a YES instance.</span>
</DefinitionRef>. If the reduction can be done in polynomial time with respect to the length of the input instance, then it is called a <DefinitionRef refId=polynomialReduction>
    polynomial reduction
    <span slot=definition>A <DefinitionRef refId=reduction/> that can run in time bounded by a polynomial in the length of the input instance.</span>
</DefinitionRef>

If a problem is in come complexity class and has the property that any problem in that class can be reduced to it in polynomial time, this problem is said to be "complete" for the class. This is meant to convey that the problem somehow embodies all the difficulty of problems in the class. Since <ProblemRef refId=sat/> satisfies this for the class $$\NP$$, we say that <ProblemRef refId=sat/> is <Definition refId=npComplete>
    $$\NP$$-complete
    <span slot=glossaryDisp>$$\NP$$-complete problem</span>
    <span slot=definition>A problem in the class $$\NP$$ for which there exists a polynomial reduction from any other problem in $$\NP$$ to it.</span>
</Definition>.

Unfortunately, <a href=https://en.wikipedia.org/wiki/Cook%E2%80%93Levin_theorem>the original proof</a> of <ProblemRef refId=sat/>'s $$\NP$$-completeness is way outside the scope of this course. We would need to build up a more rigorous version of complexity theory, and even then the proof itself can get pretty lengthy. It takes up 6(!) pages in the excellent text <CitationRef refId=sipser2012introduction/>, which was my main source for most of this section.

Luckily, once you have one complete problem for a class, it becomes much easier to add more. Why? The original complete problem needs a reduction scheme for <em>any</em> problem in the class. But once you already have <ProblemRef refId=sat/> as an $$\NP$$-complete problem, for subsequent problems it suffices to only show a reduction from <ProblemRef refId=sat/> to the new problem. Because any given problem in $$\NP$$ can be converted to <ProblemRef refId=sat/> in polynomial time, then your new reduction will take it from <ProblemRef refId=sat/> to the problem of interest.

And there is no limit to the length of the chain of reductions, since the sum of a finite number of polynomials will always be a polynomial. So that is how $$\NP-completeness$$ proofs go these days: pick some problem in $$\NP$$ and create a reduction to your new problem.

<Heading refId=exampleReduction level=3>
    An example reduction
</Heading>

There is now a <a href=https://en.wikipedia.org/wiki/List_of_NP-complete_problems>surprisingly large number of problems</a> that have been proven to be $$\NP$$-complete. Some of them look like the original <ProblemRef refId=sat/>, like the following:

<Problem refId=3sat>
    <span slot=name>3-Satisfiability</span>
    <span slot=abbrev>3-SAT</span>
    <span slot=instance>An instance of <ProblemRef refId=sat/> where the formula $$\phi$$ is a conjunction (sequence of $$\land$$ operations) of several clauses, each of which is a disjunction (sequence of $$\lor$$ operations) of three variables. For example:
        <MathDisp>
            \phi=(x_1\lor x_2\lor \neg x_3)\land(\neg x_4\lor \neg x_2\lor x_3)\land(\neg x_1\lor x_4\lor x_3)
        </MathDisp></span>
    <span slot=problem>Is $$\phi$$ satisfiable? That is, is there an assignment of 0s and 1s to the variables such that $$\phi$$ evaluates to 1?</span>
</Problem>

<ProblemRef refId=3sat/> is just a refinement of <ProblemRef refId=sat/>, and the reduction is interesting but we will skip it here. Maybe it will be more interesting to convert something that is posed not in Boolean algebra but a different setting entirely:

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

Let's do our first reduction!

<Theorem refId=3satToClique thmType=proposition>
    There is a polynomial reduction from <ProblemRef refId=3sat/> to <ProblemRef refId=clique/>.
</Theorem>


<!-- beyond completeness (np-hard) -->