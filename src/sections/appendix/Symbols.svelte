<script>
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
</script>
<Heading level=2 refId=symbols>
    Symbol reference
    <span slot=context>A list of mathematical symbols and their usages.</span>
</Heading>
<ul>
    <li>$$\{\cdots\}$$: Set notation. Items inside the curly brackets are the elements of the set, so $$\{0,1\}$$ is the 2-element set consisting of just the numbers 0 and 1.</li>
    <li>$$\R$$: The set of real numbers, i.e. anything on the number line between (though not including!) $$-\infty$$ and $$\infty$$.</li>
    <li>$$\R_+$$: The set of non-negative real numbers, i.e. anything in $$\R$$ that is greater than or equal to 0.</li>
    <li>$$\Z$$: The set of integer numbers, i.e. whole numbers from the set $$\R$$.</li>
    <li>$$\Z_+$$: The set of non-negative integer numbers, i.e. anything in $$\Z$$ that is greater than or equal to 0.</li>        
    <li>$$\in$$: Set inclusion. When we write $$x\in S$$, we mean that $$x$$ is an element of the set $$S$$. For example, we could write $$\pi\in\R$$, meaning the number $$\pi$$ is a real number.</li>
    <li>$$\subseteq$$: Subset. For two sets $$S, S'$$, we say $$S'\subseteq S$$ (said "$$S'$$ is a subset of $$S$$") if every element of $$S'$$ is also an element of $$S$$.</li>
    <li>$$|S|$$: Size of a set. This denotes the number of elements in a set, so e.g. $$|\{1,5,7,12\}|=4$$.</li>
    <li>$$\emptyset$$: Empty set. A set with no elements.</li>
    <li>$$\forall$$: For all. We use this symbol when we want to specify that something should be done for all elements in some set. So if we're writing out the constraints for some model and we say $$x_j\geq 0\ \forall\ j\in\{1, 2, \cdots, n\}$$ we're just saying that each of $$x_1, x_2, \cdots, x_n$$ should be non-negative.</li>
    <li>$$\{x: x\textit{ satisfies some condition}\}$$: Conditional set. This represents the set of all $$x$$ such that $$x$$ satisfies the condition to the right of the colon (:). For example, $$\{n\in\Z:5\leq n\leq 10\}$$ is the set of all integers between 5 and 10, i.e. $$\{5,6,7,8,9,10\}$$</li>
    <li>$$S^m$$: The set of vectors with $$m$$ elements, all of which are from some set $$S$$. For example, $$\R^3$$ is the set of 3-element, real number vectors. So we could say
        <MathDisp>
            \begin{bmatrix}1 \\ 2.64 \\ -3\end{bmatrix}\in\R^3.
        </MathDisp>
    </li>
    <li>$$S^{m\times n}$$: The set of matrices with $$m$$ rows and $$n$$ columns, whose elements are from some set $$S$$. For example, $$\Z^{m\times n}$$ is the set of $$m\times n$$ matrices whose entries are all integers. So we could say
        <MathDisp>
        \begin{bmatrix}4 & 3 & 9 & 6\\ 0 & 4 & 8 & 5\\ 7 & 7 & 2 & 1\end{bmatrix} \in \Z^{3\times 4}.
        </MathDisp>
    </li>
    <li>$$\zeros$$: A matrix (or vector) with all entries equal to 0 (the size of the matrix is usually clear by context).</li>
    <li>$$\identity$$: A square matrix with all entries equal to 0, except the diagonal where all entries equal 1 (the size of the matrix is usually clear by context). This looks like:
        <MathDisp>
            \begin{bmatrix}
            1 & 0 & \cdots & 0 \\
            0 & 1 & \cdots & 0 \\
            \vdots & \vdots & \ddots & \vdots \\
            0 & 0 & \cdots & 1 \\
            \end{bmatrix}
        </MathDisp>
    </li>
    <li>$$\Leftrightarrow$$: If and only if. It indicates the the statement to the left is logically equivalent to the statement on the right, e.g. $$a > b \Leftrightarrow -a < -b$$.</li>
    <li>$$\floor{x}$$: The "floor" of the number $$x\in\R$$, i.e. the value resulting from rounding $$x$$ down to the nearest integer. So $$\floor{1.3}=1$$.</li>
    <li>$$\ceil{x}$$: The "ceiling" of the number $$x\in\R$$, i.e. the value resulting from rounding $$x$$ up to the nearest integer. So $$\ceil{1.3}=2$$.</li>
</ul>