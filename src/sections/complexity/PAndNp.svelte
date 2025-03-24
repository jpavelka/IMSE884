<script>
    import AlgorithmRef from "$lib/AlgorithmRef.svelte";
    import Definition from "$lib/Definition.svelte";
    import DefinitionRef from "$lib/DefinitionRef.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import SectionRef from "$lib/SectionRef.svelte";

</script>

<Heading refId=pAndNp level=2>
    The classes $$\P$$ and $$\NP$$
</Heading>

Now that we have the notion of run time defined, we're ready to start breaking down problems into groups of "easy" and "difficult" problems. But we first to need reckon with an inconvenient fact: It turns out the theory we're building toward isn't really about optimization problems, but instead so-called "decision problems". For our purposes, a <Definition refId=decisionProblem>
    decision problem
    <span slot=definition>A problem for which the answer is either "yes" or "no".</span>
</Definition> is a problem for which the answer is either "yes" or "no". Luckily, there is a natural way to convert any given optimization problem to a decision problem. A general optimization problem may be stated as finding
<MathDisp>
    \argmax_{x\in S}f(x)
</MathDisp>
for an appropriately defined feasible set $$S$$ and objective function $$f$$. The "decision version" of this problem would be stated as:
<MathDisp>
    \text{Is there an element }x\in S\text{ such that }f(x)\geq k\text{?}
</MathDisp>
for some number $$k\in\R$$. In this way, we can easily create a "decision version" of all the problems we've discussed so far in the class.

<Heading refId=easyToSolve level=3>
    Easy to solve
</Heading>

With that aside, we're ready to define our first class of decision problems. The class <Definition refId=classP plainText=P>
    $$\P$$
    <span slot=definition>The class of decision problems which can be solved by a polynomial-time algorithm.</span>
</Definition>
is the class of decision problems which can be solved by a polynomial-time algorithm.

Colloquially, we like to think of $$\P$$ as the set of "easy" problems. You can take that at face value, but it's worth pondering for a moment why that is. Surely, for a problem instance of length $$l$$, an algorithm that runs in $$\O{l}$$ steps must be better than an algorithm that runs in $$\O{l^2}$$. And surely <em>that</em> algorithm is better than an algorithm that takes $$\O{l^{10}}$$ or $$\O{l^{100}}$$! And yet we want to say that a problem whose best-known algorithm takes $$\O{l^{100}}$$ steps is as easy as a problem with an algorithm taking $$\O{l}$$ steps. Why?

I will give two reasons. The first reason is more technical in nature, revolving around the way computer scientists do these analyses. Generally, you must specify a model of computation before doing your analysis. Classically, this would be a <a href=https://en.wikipedia.org/wiki/Turing_machine>Turing machine</a><Footnote>It's worth mentioning that a Turing machine is not an actual physical machine or computer, but rather an abstract mathematical model of one.</Footnote>, but there are other ones you can choose, not all of which are precisely equivalent. But generally computation time in different models will differ only by a polynomial factor of the input length, making the class $$\P$$ robust against the choice of computational model. This is a nice theoretical advantage.<Footnote>This notion of equivalence up to polynomial factors is also why I'm not too worried about the relaxed nature of the presentation in the chapter. Sure, you could do the work to get the number of steps just right, but with "only" polynomial differences, you'll generally get the same answer anyway.</Footnote>

The second reason is that practical experience tells us that problems with polynomial-time algorithms really do tend to be the most realistically solvable ones. Of course, the degree of the polynomial does have plenty of practical importance, and an algorithm with a true $$\O{l^{100}}$$ running time will not be useful for most inputs. But history has shown us that once a polynomial algorithm is found for a given problem, even if the exponent is large initially, most of the hard work has been done. It will generally take a comparative small amount of research to bring that exponent down to a more reasonable range, and the problem becomes tractable even for large inputs.

Of the problems we've discussed to far, which ones belong to $$\P$$? We already showed in <SectionRef refId=polyTime/> that <AlgorithmRef refId=prim/> is a polynomial-time algorithm for <ProblemRef refId=mst/>. We technically can't say that <ProblemRef refId=mst/> is in $$\P$$ because we've defined it as an optimization problem. But remember that each optimization problem has a conveniently-defined decision version, where the inputs to the decision problem are the same as the inputs to the optimization problem, plus the addition of some constant $$k\in\R$$. Then instead of finding the optimal value of the objective function, you task is to decide if the problem has a solution with an objective <em>at least as good</em> as $$k$$<Footnote>Meaning "less than or equal to $$k$$" in the case of a minimization problem, and "greater than or equal to $$k$$" for maximization.</Footnote>.

So, does the decision version of <ProblemRef refId=mst/> have a polynomial-time algorithm? Yes! The algorithm is to simply run <AlgorithmRef refId=prim/>, then do one extra check: is the optimal objective at least as good as $$k$$? This extra check adds nothing to the algorithm run time in asymptotic terms, so the decision algorithm is still polynomial. Thus the decision version of <ProblemRef refId=mst/> is indeed in $$\P$$.

What about the other algorithms we've discussed so far? The <AlgorithmRef refId=tsp2Approx/> does run in polynomial time, but is only an approximation algorithm. It therefore is not guaranteed to solve <ProblemRef refId=tsp/> or its decision variant, so we can't get any information from that one.

<AlgorithmRef refId=dijkstra/> is an exact algorithm for the <ProblemRef refId=shortestPath/>. Let's check if it runs in polynomial time with respect to input length. Similar to <ProblemRef refId=mst/>, the inputs are a graph and some edge weights, so the input length is a (no more than polynomial) function of $$|V|,|E|,$$ and $$\log C$$ (where $$C=\max_{e\in E}\{c_e\}$$). The main iteration of the algorithm requires $$|V|$$ loops. Inside the main iteration we require a check on all vertices ($$\O{|V|}$$ checks) and there is a nested loop inside the main iteration again looping through a subset of the vertices $$\O{|V|}$$. There is only a constant number of operations inside this nested loop, so the action in there does not matter for the asymptotic analysis.

So, recap: $$|V|$$ loops in the main iteration, each requiring $$\O{|V|}$$ operations. So we require $$\O{|V|^2)}$$ operations total. This is clearly (asymptotically bounded by) a polynomial in the input length. So we can find the optimal value in a polynomial number of steps, then simply check how the output compares with $$k$$, proving the decision version of the <ProblemRef refId=shortestPath/> is in $$\P$$.

Lastly, let's check the <AlgorithmRef refId=knapsackDP/>. As we discussed earlier (and gave an example in <FigureRef refId=knapsackExampleInstanceRepresentation/>), the length of an instance of the <ProblemRef refId=knapsack/> is on the order of $$||J||\log C$$, where $$C$$ is the maximum of the $$v_j,w_j,$$ and $$b$$ values. The main iteration of the algorithm includes an outer loop with $$n=|J|$$ iterations, then an inner loop with $$b=\O{C}$$ iterations. The number of operations per loop is constant, so the total number of operations is $$\O{|J|C}$$.

Initially, that looks like a polynomial in the input size. But actually, it's not. $$C$$ is a factor in the number of operations, but $$\log C$$ is the factor in the input size. Recall that by the definition of logarithms, for any base $$b$$ we have:

<MathDisp>
    b^{\log_b(C)} = C
</MathDisp>

i.e. $$C$$ is exponentially larger than $$\log C$$<Footnote>In this situation, where an algorithm is polynomial in the <em>magnitude</em> of some input numbers instead of the length, we say the algorithm is <em>pseudo-polynomial</em>.</Footnote>. So we can't bound the runtime by a polynomial in the input, thus <AlgorithmRef refId=knapsackDP/> is <em>not</em> a polynomial algorithm for the <ProblemRef refId=knapsack/>. Of course that doesn't mean that the <ProblemRef refId=knapsack/> isn't a member of $$\P$$; the fact that one particular algorithm isn't polynomial doesn't mean that no polynomial algorithms exist. As it stands, nobody has found a polynomial algorithm for the <ProblemRef refId=knapsack/>, but also nobody have proven that no such algorithm can exist.

<Heading refId=easyToCheck level=3>
    Easy to verify
</Heading>

While $$\P$$ is an important class, we don't yet know if all our various <ProblemRef refId=combOpt/>s belong in it. But there is a different complexity class where they all fit in, called $$\NP$$.

Recall that these complexity classes are made up of decision problems, i.e. problems for which the answer is either YES or NO. The class <Definition refId=classNP plainText=NP>
    $$\NP$$
    <span slot=definition>
        The class of decision problems for which there is an algorithm that, for every instance $$X$$ where the answer is YES, there exists a certificate $$c$$ such that
        <ol>
            <li>The length of $$c$$ is bounded by a polynomial in $$L(X)$$.</li>
            <li>The algorithm run on $$(X,c)$$ can verify that $$X$$ is a YES instance in polynomial time.</li>
        </ol>
    </span>
</Definition> is the class of decision problems for which there is an algorithm that, for every instance $$X$$ where the answer is YES, there exists a <Definition refId=certificate>
    certificate
    <span slot=definition>In a context of an instance of an $$\NP$$ complete problem, a certificate $$c$$ is a small (length polynomial in the instance length) bit of extra data used by an algorithm to verify the instance is a YES instance.</span>
</Definition> $$c$$ such that
<ol>
    <li>The length of $$c$$ is bounded by a polynomial in $$L(X)$$.</li>
    <li>The algorithm run on $$(X,c)$$ can verify that $$X$$ is a YES instance in polynomial time.</li>
</ol>

Basically, for any YES instance, there is a small extra bit of data (the certificate) such that with access to it and the problem instance, you can show in polynomial time that the answer is YES. Colloquially, you can think of $$\NP$$ the class of decision problems where a YES answer can be verified easily.

Note that we've said nothing about how the certificate was obtained. It doesn't matter if there is an efficient way to compute it. All that matters is that for any YES instance, such a certificate exists.

This definition is maybe a little tough to parse at first, but it's really not so bad once you see a few examples. To that end, let's take <ProblemRef refId=maxWeightIndSet/> as an example, and for the instance let's look back to the graph in <FigureRef refId=indSetEx/>. Since we're considering decision problems, let's set $$k=13$$ so that the question we're answering is "is there an independent set in the graph with weight at least 13?"

I've already shown you the optimal independent set in this instance which has weight 14, so we already know this is a YES instance. Is there a small certificate we could present someone such that they can quickly verify that? Well, yes. Just list off the vertices in that optimal independent set. This is a list of $$\O{|V|}$$ vertices, so it is small enough to be a valid certificate. Then the verification algorithm consists of just checking that none of the vertices are adjacent (should take $$\O{|E|}$$ operations) and then adding up the weights of the vertices ($$\O{|V|}$$). This generalizes: for any YES instance of the <ProblemRef refId=maxWeightIndSet/> there exists a certificate<Footnote>I'll mention again: it only matters that this certificate exists. Being able to find it quickly (or at all!) is not a requirement.</Footnote> of length $$\O{|V|}$$ and an algorithm that runs in $$\O{|E|}$$ steps to verify the YES.

The above verifies the <ProblemRef refId=maxWeightIndSet/> is in $$\NP$$. Let's think of a different question - do certificates and verifying algorithms exist for NO instances of <ProblemRef refId=maxWeightIndSet/>? Decision problems for which the NO instances are similarly verifiable make up the class <Definition refId=classCoNP plainText=coNP>
    $$\coNP$$
    <span slot=definition>
        The class of decision problems where NO instances are verifiable (in the same way YES instances are verifiable for problems in <DefinitionRef refId=classNP/>)
    </span>
</Definition>. Might <ProblemRef refId=maxWeightIndSet/> be in $$\coNP$$ as well? Again, this hasn't been ruled out, but so far as we know, there is no quick way to verify a NO instance.

What about <ProblemRef refId=mst/> or the <ProblemRef refId=shortestPath/>, which we've already shown to be in $$\P$$. Are the also in $$\NP$$? Trivially, yes. Since they are in $$\P$$, you already have a polynomial algorithm to tell if a YES instance is a YES instance... the same polynomial algorithm that solve the problem in the first place! No certificate needed! Due to the same reasoning, all problems in $$\P$$ are in $$\NP$$, which we can write as $$\P\subseteq\NP$$. And by similar reasoning, $$\P\subseteq\coNP$$ as well.

And the other <ProblemRef refId=combOpt/>s we've studied? All of them lie in $$\NP$$. The reasoning mirrors the reasoning for <ProblemRef refId=maxWeightIndSet/>: if the answer is yes, just present an optimal solution as the certificate. For each problem, checking the validity of the solution can be done in time bounded by polynomials in the input size.

<Heading refId=pEqualNP level=3>
    Does $$\P=\NP$$?
</Heading>

It's worth pausing for a moment to reflect on the current state of knowledge in complexity theory. We've present $$\P$$ and $$\NP$$ as two different classes, and we've shown that $$\P\subseteq\NP$$. But is it possible that the opposite relation $$\NP\subseteq\P$$ also holds, such that they are actually the same thing?

If you think about it for a bit, it seems like an absurd suggestion. Colloquially, this is like asking "is verifying an answer just as easy as finding an answer in the first place?" Surely it must be easier to verify an answer after given the proof, than it is to find the proof all by yourself. But so far, at least in the language of $$\P$$ and $$\NP$$, nobody has been able to prove it.

And it hasn't been for lack of effort! This question has been on the forefront of computer scientists' minds since the 1970s. The stakes were raised in the year 2000 when the Clay Mathematics Institute included the $$\P$$ vs $$\NP$$ problem among its seven <a href=https://www.claymath.org/millennium-problems>Millennium Prize Problems</a>, a list of important unsolved problems in a wide array of mathematical fields. The institute will award $1 million to anyone who resolves a problem from the list<Footnote>So far, only one of those seven problems (the <a href=https://en.wikipedia.org/wiki/Poincar%C3%A9_conjecture>Poincaré conjecture</a>) has been solved. Interestingly, <a href=https://en.wikipedia.org/wiki/Grigori_Perelman>the person who solved it</a> turned down the money.</Footnote>.

And the implications go well beyond the cash prize. For instance, if $$\P\neq\NP$$ then we’d know for certain that scalable algorithms for exact solutions to certain <ProblemRef refId=combOpt/>s cannot exist, meaning perhaps more time should be devoted to heuristics and approximations. Meanwhile, if $$\P=\NP$$, then many of the algorithms we use today for cryptography (to, for example, keep your bank credentials safe while shopping online) are unsafe in principal and potentially vulnerable to attack.

People also like to get philosophical when discussing the implications of $$\P=\NP$$, making provocative claims like “there is no difference between someone whe can appreciate art and an artist” or “anyone who can recognize good music is as talented as Mozart”. There’s truth in these statements as metaphors, but sometimes I find it hard to tell if these people actually mean them literally. As far as I’m concerned, these sweeping metaphysical claims don’t follow from the theory.
