<script>
    import Heading from "$lib/Heading.svelte";
    import Key from "$lib/Key.svelte";
    import BlockQuote from "$lib/BlockQuote.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Problem from "$lib/Problem.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import Definition from "$lib/Definition.svelte";
</script>

<Heading level="2" refId="combOptDefs">
    Definitions
    <span slot=context>What is combinatorial optimization anyway?</span>
</Heading>

So, <Key>what is combinatorial optimization?</Key> Maybe we should break it down into parts. As of the time of writing, the <a href=https://www.dictionary.com/browse/optimization>dictionary.com</a> <Key>definition of "optimization"</Key> is:
<BlockQuote>
    <ol>
        <li>the fact of optimizing; making the best of anything.</li>
        <li>the condition of being optimized.</li>
        <li><Key>Mathematics. a mathematical technique for finding a maximum or minimum value of a function of several variables subject to a set of constraints, as linear programming or systems analysis.</Key></li>
    </ol>
</BlockQuote>

Definition number 3 matches perfectly with what we mean in this course. Abstractly, we're talking about maximizing or minimizing a function over some set of feasible solutions. Concretely, it could be something like a <Key>shipping company determining how to deliver packages</Key> with the least overall cost. Or an <Key>airline determining what flights to offer</Key>, considering crew/fuel/airport costs, subject to meeting projected customer demand.
    
Meanwhile, the <Key>definition of "combinatorial"</Key> (also from <a href=https://www.dictionary.com/browse/combinatorial>dictionary.com</a>) is:
    <BlockQuote>
        <ol>
            <li>of, relating to, or involving the combination of elements, as in phonetics or music.</li>
            <li><Key>of or relating to the enumeration of the number of ways of doing some specific task or of arranging items in a specific configuration.</Key></li>
            <li>Mathematics. of or relating to combination, or the modes, properties, etc., of combinations.</li>
        </ol>
    </BlockQuote>

Most useful for us is definition number 2, "of or relating to the enumeration of the number of ways of doing some specific task or of arranging items in a specific configuration." We will see that <Key>"combinatorial" describes the set of feasible solutions</Key> in the problems we are about to study.

Time to bring it all together. The <a href=https://en.wikipedia.org/wiki/Combinatorial_optimization>Wikipedia page</a> on <Definition refId=combOpt>
    <span slot=definition>
        A subfield of mathematical optimization that consists of finding an optimal object from a finite set of objects, where the set of feasible solutions is discrete or can be reduced to a discrete set.
    </span>
    combinatorial optimization
</Definition> describes it as:
<BlockQuote>
    a subfield of mathematical optimization that consists of finding an optimal object from a finite set of objects, where the set of feasible solutions is discrete or can be reduced to a discrete set
</BlockQuote>

For this class, we will adopt the formalism of <CitationRef refId=wolsey2020/> and <Key>define a combinatorial optimization problem as</Key><Footnote>
    Notation alert! We'll be using lots of mathematical notation like this in the course. Most if it is standard, and you might already be familiar with it if you've taken some higher-level math course. I'll try to point out new notation in class as we go along, but you can always check <SectionRef refId=symbols/> in the appendix for information on the symbols used.
</Footnote>:

<Problem refId=combOpt>
    <span slot=name>Combinatorial Optimization Problem</span>
    <span slot=abbrev>COP</span>
    <span slot=instance>
        A finite set $$N=\{1,\dots,n\}$$, weights $$c_j\in\R$$ for each $$j\in N$$, a set $$\mathcal{F}$$ of feasible subsets of $$N$$.
    </span>
    <span slot=problem>
        Find a minimum weight feasible subset, i.e.
        <MathDisp>
            \min_{S\subseteq N}\left\{\sum_{j\in S}c_j:S\in\mathcal{F}\right\}
        </MathDisp>
    </span>
</Problem>
