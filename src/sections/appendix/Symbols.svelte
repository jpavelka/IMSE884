<script>
    import BodyText from "$lib/BodyText.svelte";
import Heading from "$lib/Heading.svelte";
    import Math from "$lib/Math.svelte";
    import MathDisp from "$lib/MathDisp.svelte";

</script>
<Heading level=2 refId=symbols>
    Special symbols
    <span slot=context>A list of mathematical symbols and their usages.</span>
</Heading>

<BodyText>
    <ul>
        <li><Math>\{\cdots\}</Math>: Set notation. Items inside the curly brackets are the elements of the set, so <Math>\{0,1\}</Math> is the 2-element set consisting of just the numbers 0 and 1.</li>
        <li><Math>\R</Math>: The set of real numbers, i.e. anything on the number line between (though not including!) <Math>-\infty</Math> and <Math>\infty</Math>.</li>
        <li><Math>\R_+</Math>: The set of non-negative real numbers, i.e. anything in <Math>\R</Math> that is greater than or equal to 0.</li>
        <li><Math>\Z</Math>: The set of integer numbers, i.e. whole numbers from the set <Math>\R</Math>.</li>
        <li><Math>\Z_+</Math>: The set of non-negative integer numbers, i.e. anything in <Math>\Z</Math> that is greater than or equal to 0.</li>        
        <li><Math>\in</Math>: Set inclusion. When we write <Math>x\in S</Math>, we mean that <Math>x</Math> is an element of the set <Math>S</Math>. For example, we could write <Math>\pi\in\R</Math>, meaning the number <Math>\pi</Math> is a real number.</li>
        <li><Math>\subseteq</Math>: Subset. For two sets <Math>S, S'</Math>, we say <Math>S'\subseteq S</Math> (said "<Math>S'</Math> is a subset of <Math>S</Math>") if every element of <Math>S'</Math> is also an element of <Math>S</Math>.</li>
        <li><Math>|S|</Math>: Size of a set. This denotes the number of elements in a set, so e.g. <Math>|\{1,5,7,12\}|=4</Math>.</li>
        <li><Math>\emptyset</Math>: Empty set. A set with no elements.</li>
        <li><Math>\forall</Math>: For all. We use this symbol when we want to specify that something should be done for all elements in some set. So if we're writing out the constraints for some model and we say <Math>x_j\geq 0\ \forall\ j\in\{1, 2, \cdots, n\}</Math> we're just saying that each of <Math>x_1, x_2, \cdots, x_n</Math> should be non-negative.</li>
        <li><Math>\{x: x\textit{ satisfies some condition}\}</Math>: Conditional set. This represents the set of all <Math>x</Math> such that <Math>x</Math> satisfies the condition to the right of the colon (:). For example, <Math>\{n\in\Z:5\leq n\leq 10\}</Math> is the set of all integers between 5 and 10, i.e. <Math>\{5,6,7,8,9,10\}</Math></li>
        <li><Math>S^m</Math>: The set of vectors with <Math>m</Math> elements, all of which are from some set <Math>S</Math>. For example, <Math>\R^3</Math> is the set of 3-element, real number vectors. So we could say
            <MathDisp>
                \begin{bmatrix}1 \\ 2.64 \\ -3\end{bmatrix}\in\R^3.
            </MathDisp>
        </li>
        <li><Math>S^{m\times n}</Math>: The set of matrices with <Math>m</Math> rows and <Math>n</Math> columns, whose elements are from some set <Math>S</Math>. For example, <Math>\Z^{m\times n}</Math> is the set of <Math>m\times n</Math> matrices whose entries are all integers. So we could say
            <MathDisp>
            \begin{bmatrix}4 & 3 & 9 & 6\\ 0 & 4 & 8 & 5\\ 7 & 7 & 2 & 1\end{bmatrix} \in \Z^{3\times 4}.
            </MathDisp>
        </li>
        <li><Math>\zeros</Math>: A matrix (or vector) with all entries equal to 0 (the size of the matrix is usually clear by context).</li>
        <li><Math>\identity</Math>: A square matrix with all entries equal to 0, except the diagonal where all entries equal 1 (the size of the matrix is usually clear by context). This looks like:
            <MathDisp>
                \begin{bmatrix}
                1 & 0 & \cdots & 0 \\
                0 & 1 & \cdots & 0 \\
                \vdots & \vdots & \ddots & \vdots \\
                0 & 0 & \cdots & 1 \\
                \end{bmatrix}
            </MathDisp>
        </li>
        <li><Math>\Leftrightarrow</Math>: If and only if. It indicates the the statement to the left is logically equivalent to the statement on the right, e.g. <Math>a > b \Leftrightarrow -a < -b</Math>.</li>
        <li><Math>\floor{x}</Math>: The "floor" of the number <Math>x\in\R</Math>, i.e. the value resulting from rounding <Math>x</Math> down to the nearest integer. So <Math>\floor{1.3}=1</Math>.</li>
        <li><Math>\ceil{x}</Math>: The "ceiling" of the number <Math>x\in\R</Math>, i.e. the value resulting from rounding <Math>x</Math> up to the nearest integer. So <Math>\ceil{1.3}=2</Math>.</li>
        <li><Math>f'</Math>: The derivative of some single-variable function <Math>f</Math>.</li>
        <li><Math>f''</Math>: The second derivative of some single-variable function <Math>f</Math>.</li>
        <li><Math>f'_{x_j}</Math>: The partial derivative of some multi-variable function <Math>f</Math> with respect to the variable <Math>x_j</Math>.</li>
        <li><Math>\nabla f</Math>: The gradient of some multivariate function <Math>f</Math>, i.e. the vector of partial derivatives. So we have:
            <MathDisp>
            \nabla f(\x) = \begin{bmatrix}
            f'_{x_1}(\x) \\
            f'_{x_2}(\x) \\
            \vdots \\
            f'_{x_n}(\x)
            \end{bmatrix}
            </MathDisp>  The symbol <Math>\nabla</Math> is called the "nabla" symbol.</li>
        <li><Math>\indicator_{\{\text{condition}\}}</Math>: A random variable that equals <Math>1</Math> if the condition in the subscript is true, and equals <Math>0</Math> if the condition is false.</li>
    </ul>
</BodyText>