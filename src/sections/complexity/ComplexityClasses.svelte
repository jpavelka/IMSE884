<script>
    import Definition from "$lib/Definition.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";

</script>

<!-- <Heading

It turns out the theory we're building toward isn't really about optimization problems, but instead so-called "decision problems" (though there are connections). For our purposes, a <Definition refId=decisionProblem>
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
for some number $$k\in\R$$. In this way, we can easily create a "decision version" of all the problems we've discussed so far in the notes. -->