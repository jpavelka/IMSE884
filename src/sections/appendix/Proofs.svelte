<script>
    import Definition from "$lib/Definition.svelte";
    import Figure from "$lib/Figure.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import Theorem from "$lib/Theorem.svelte";
</script>

<Heading level=2 refId=proofs>
    Proof concepts
    <span slot=context>Explaining concepts that come up in mathematical proofs.</span>
</Heading>

In mathematics, a <Definition refId=proof>
    proof
    <span slot=definition>
        A deductive argument for the validity of some mathematical statement.
    </span>
</Definition> is a deductive argument for the validity of some mathematical statement. Proofs are important for this course, since we'd like to be able to explain why (say) a given process for solving some problem is guaranteed to work.

In case you haven't encountered very many proofs before, I want to use this space to highlight some concepts that frequently arise in proofs in the class.

<Heading level=3 refId=contrapositive>The contrapositive</Heading>

Mathematical proofs are generally build on implications of the form "if condition $$A$$ holds, then condition $$B$$ must also hold", or more succinctly "if $$A$$ then $$B$$". The <Definition refId=contrapositive>
    contrapositive
    <span slot=definition>
        A concept in logic involving conditional statements of the form "if $$A$$ then $$B$$". In particular, the contrapositive involve negating the two conditions and switching their order. So, the contrapositive of the statement "if $$A$$ then $$B$$" is "if not $$B$$ then not $$A$$", and both statements are logically equivalent (as explained in <SectionRef refId=contrapositive/>).
    </span>
</Definition> of such a statement involves negating the two conditions and switching their order. So the contrapositive of the statement "if $$A$$ then $$B$$" is "if not $$B$$ then not $$A$$".

Crucially, the original statement and its contrapositive are <em>logically equivalent</em>. Why should this be? A first step to seeing this may be to think of any mundane "if $$A$$ then $$B$$" type of statement. Something like, "if you just bought a refrigerator, you just bought a kitchen appliance". Consider how this automatically implies the statement "if you did not just buy a kitchen appliance, then you did not just buy a refrigerator".

It's maybe easier to see visually. To that end, consider the Venn diagram in <FigureRef refId=contrapositiveVenn />. Clearly, in order to be in the circle representing $$A$$, one must also be in the circle representing $$B$$. At the same time, if you are not in the circle representing $$B$$, you have no chance of being in the circle representing $$A$$.

<Figure refId=contrapositiveVenn>
    <img
        src=https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Venn_A_subset_B.svg/220px-Venn_A_subset_B.svg.png
        alt={"A Venn diagram illustrating the contrapositive."}
    />
    <span slot=caption>A Venn diagram illustrating the equivalence of a statement "if $$A$$ then $$B$$" and its contrapositive "if not $$B$$ then not $$A$$" (source: <a href=https://en.wikipedia.org/wiki/Contraposition>Wikipedia</a>).</span>
</Figure>

This is an important fact to remember because sometimes thinking in terms of the contrapositive makes the claim easier to work with and ultimately prove.

<Heading level=3 refId=proofByContradiction>
    Proof by contradiction
</Heading>

A <Definition refId=proofByContradiction>
    proof by contradiction
    <span slot=definition>
        A method of proof that starts by assuming that the statement to be proven is false, then deriving a contradiction to a known fact as a result.
    </span>
</Definition> is a method of proof that starts by assuming that the statement to be proven is false, then deriving a contradiction to a known fact as a result. This proof type is somewhat indirect, in that it is not a constructive argument that positively affirms the validity of the statement at hand. It's more like saying this statement <em>must</em> be true, because if it weren't, weird things would happen! This style of argument is also known by the delightful latin phrase <em>reductio ad absurdum</em>.

As an example, we'll point to the classic proof that $$\sqrt{2}$$ is irrational, which we present below. A few useful facts before we start:

<ol>
    <li>A number is even if it can be written as $$2k$$ for some integer $$k$$</li>
    <li>A number is odd if it can be written as $$2k+1$$ for some integer $$k$$</li>
    <li>The result of multiplying two odd numbers together is also odd, since
        <MathDisp>
            \begin{align*}
            (2k_1+1)(2k_2+1) &= 4k_1k_2 + 2k_1 + 2k_2 + 1 \\
                             &= 2(\underbrace{2k_1k_2 + k_1 + k_2}_{\text{integer}}) + 1
            \end{align*}
        </MathDisp>
    </li>
</ol>

<Theorem refId=contradictionExample>
    $$\sqrt{2}$$ is irrational, i.e. there are no integers $$a,b\in\Z$$ such that $$\sqrt{2}=\frac{a}{b}$$.
    <span slot=proof>
        Suppose for contradiction that there were in fact two integers $$a,b\in\Z$$ such that $$\sqrt{2}=\frac{a}{b}$$. In fact, we can choose $$a$$ and $$b$$ such that they share no factors in common (we could just divide out common factors from our initial selections until this were true).

        Since $$\sqrt{2}=\frac{a}{b}$$, we also have $$\frac{a^2}{b^2} = 2$$ and hence $$a^2=2b$$. This means that $$a^2$$ is an even number, and hence $$a$$ is also even (since otherwise $$a^2$$, as the product of two odd numbers, would be odd).

        Since $$a$$ is even, it can be written as $$2k$$ for some integer $$k$$. So the above relation $$a^2=2b^2$$ can be written as $$4k^2=2b^2$$, which reduces to $$2k^2=b^2$$, hence $$b$$ is also even. But $$a$$ and $$b$$ both being even means they are both divisible by 2, contradicting that they share no common factors.
    </span>
</Theorem>

<Heading level=3 refId=proofByInduction>
    Proof by induction
</Heading>

A <Definition refId=proofByInduction>
    proof by induction
    <span slot=definition>
        A method for proving a statement that holds over the natural numbers $$\{0, 1, 2, \dots\}$$ (or a similar set). See <SectionRef refId=proofByInduction/> for details.
    </span>
</Definition> is a method of proving statements that hold over the natural numbers $$\{0, 1, 2, \dots\}$$ (or a similar set). There are generally two steps:

<ol>
    <li>The base case: showing that the statement holds 0 (or the smallest number for which it should hold).</li>
    <li>The inductive step: showing that if the statement holds for any integer $$k-1$$, then it must also hold for $$k$$.</li>
</ol>

It should be plain to see that the combination of the above suffices to prove the statement for all numbers in $$\{0, 1, 2, \dots\}$$. The base case covers 0. The inductive step shows that since the statement holds for 0, it must also hold for 1. But holding for 1 means (also by the inductive step) that it holds for 2. Which means it holds for 3, which means it holds for 4, which means...

Let's go ahead and prove some statement by induction, to give you a feel for it.

<Theorem refId=inductionExample thmType=proposition>
    The sum of the first $$n$$ positive integers is given by
    <MathDisp>
        \sum_{i=1}^n i = \frac{n(n+1)}{2}
    </MathDisp>
    <span slot=proof>
        The proof goes by induction. For the base case, note that for $$n=1$$
        <MathDisp>
            \sum_{i=1}^1 i = 1 = \frac{1(2)}{2}
        </MathDisp>

        For the inductive step, suppose that the statement holds for some integer $$k-1$$, i.e. we have
        <MathDisp>
            \sum_{i=1}^{k-1} i = \frac{(k-1)(k)}{2}
        </MathDisp>
        Then clearly we have
        <MathDisp>
            \begin{align*}
                \sum_{i=1}^k i &= k + \sum_{i=1}^{k-1} i \\
                               &= k + \frac{(k-1)(k)}{2} \\
                               &= \frac{2k}{2} + \frac{k^2-k}{2} \\
                               &= \frac{k^2 + k}{2} \\
                               &= \frac{k(k+1)}{2}
            \end{align*}
        </MathDisp>
        as required.
    </span>
</Theorem>