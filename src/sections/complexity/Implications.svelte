<script>
    import Definition from "$lib/Definition.svelte";
    import DefinitionRef from "$lib/DefinitionRef.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";

</script>
<Heading refId=optIsHard level=2>
    Optimization is (often) hard
</Heading>

With that, our surface-level tour of complexity theory is over. What was the point? Well, for one thing, it brought us this notion of polynomiality, which gives us a stronger underpinning to what we might describe as a "good" algorithm, or an "easy" problem. Among the problems and algorithms we've studied so far, we know that a few of them (<ProblemRef refId=shortestPath/>, <ProblemRef refId=mst/>) fall into this "easy" camp.

On the other hand, we know there's an apparent gap between these problems and the seemingly more difficult $$\NP$$-complete problems. Whether that gap is real or imaginary will be up to future researchers to settle, but for now exponential algorithms are the state of the art for most of the problems we care about.

For most of the rest of the class, we will be focusing on these difficult problems, where the decision version of the problem is $$\NP$$-complete. These optimization problems are actually part of another class of so-called <Definition refId=npHard plainText='NP-hard'>
    $$\NP$$-hard
    <span slot=glossaryDisp>
        $$\NP$$-hard problem
    </span>
    <span slot=definition>
        A problem for which there exists a polynomial reduction from any problem in $$\NP$$ to it. Note that, in contrast to <DefinitionRef refId=npComplete/> problems, there is no requirement that the problem itself is a member of $$\NP$$. 
    </span>
</Definition> problems. The definition mirrors $$\NP$$-completeness, in that a problem is said to be $$\NP$$-hard when any problem in $$\NP$$ has a polynomial reduction to it. The difference is that you do not need to be a member $$\NP$$ to be considered $$\NP$$-hard<Footnote>So $$\NP$$-complete is the intersection of $$\NP$$ and $$\NP$$-hard.</Footnote>. So we are theoretically justified in saying that many optimization problems are hard!

These theoretical notions also back up some rule-of-thumb to keep in mind when deciding if a solution method may scale. Polynomial steps are good. Combinatorial explosions (like we saw in our <ProblemRef refId=ip/> model for <ProblemRef refId=tsp/> in <EquationRef refId=tspIp/>) are bad.

Looking ahead a bit, we'll spend a little more time talking about easy problems, how to recognize them, and some theory that unites them. Then it's back to the world if $$\NP$$-hard problems and how we can tackle them. Most of this discussion will focus on <ProblemRef refId=ip/> as a unifying framework. If you need exact solutions for these problem either <ProblemRef refId=ip/> or methods derived from it are usually among the best choices.

Lastly, it's worth noting that even if you are faced with an $$\NP$$-hard problem so large that theory suggest you can never hope to prove optimality with known methods, that doesn't mean you need to give up! It's worth remembering also that most algorithmic analysis in complexity theory is a worst-case analysis. Sometimes subclasses of certain problems can be easier to solve than the entire class itself, and maybe you got lucky! Furthermore, even if exact solutions are out of reach, heuristic methods can often come to the rescue and deliver "good enough" solutions for even very large problems. We will discuss some broad classes of heuristics later in the class.
