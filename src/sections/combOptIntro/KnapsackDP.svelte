<script>
    import Algorithm from "$lib/Algorithm.svelte";
    import AlgorithmRef from "$lib/AlgorithmRef.svelte";
    import AlgoText from "$lib/AlgoText.svelte";
    import Definition from "$lib/Definition.svelte";
    import Axes from "$lib/drawing/Axes.svelte";
    import EquationRef from "$lib/EquationRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import InteractiveKnapsackDp from "$lib/InteractiveKnapsackDP.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import Theorem from "$lib/Theorem.svelte";
    import Appendix from "../appendix/Appendix.svelte";
    import Algorithms from "./Algorithms.svelte";
</script>

<Heading refId=knapsackDP level=3>
    Knapsack DP algorithm
    <span slot=context>Using an algorithm for the <ProblemRef refId=knapsack link={false} /> to explore the notion of dynamic programming.</span>
</Heading>

Let's turn our attention now to the <ProblemRef refId=knapsack />, a simple-looking but deceptively complicated problem. It turns out that a greedy algorithm (iteratively taking the highest-cost item that won't put you over the weight limit $$b$$) will not work for this problem<Footnote>It's not to hard to create an example that proves greedy doesn't work. See if you can come up with one yourself!</Footnote>. You might want to try something slightly more complicated, like ordering the items by their "value to weight" ratio $$v_j/w_j$$ and taking items with the best ratio. But that won't do it either.

What does work? The algorithm we will discuss uses a common algorithmic technique known as <Definition refId=dynamicProgramming>
    dynamic programming
    <span slot=definition>
        An algorithmic technique that involves recursively breaking down a problem into smaller, easier-to-solve subproblems. The solutions to these subproblems inform the solutions to the larger problems in a particular way.
    </span>
</Definition>, a particular approach to solving problems that requires a recursive breaking down of the problems into simpler subproblems<Footnote>
    If you're familiar with operations research already, you may find that name <em>dynamic programming</em> a little confusing. Other similarly-named concepts in the field (linear programming, integer programming) are classes of <em>problems</em> to be solved, in contrast to dynamic programming with is a class of <em>algorithms</em> for solving problems.
</Footnote>. We've actually already seen an example of a dynamic programming in <AlgorithmRef refId=dijkstra/>. Adding a second example should help you see how the technique can work generally.

We'll now define the particular subproblems of interest for us. For a given instance $$P$$ of the <ProblemRef refId=knapsack />, let's assume that the set of items $$J$$ has $$n$$ elements, and in particular $$J=\{1,2,\cdots,n\}$$<Footnote>Also important to this discussion is that we've defined the <ProblemRef refId=knapsack /> so that the item weights $$w_j$$ and overall weight limit $$b$$ are integers. This might seem like an unnecessary limitation, surely we want to allow for items that weigh, say, 0.5 pounds! The thing to keep in mind is that, so long as all the numbers are rational, we can convert them all to integers by simple multiplication. And rational numbers are not a big assumption either, since in practical cases you only need a finite amount of precision for your item weights.</Footnote>. For $$r\in J$$ and integer $$s\leq b$$, let $$P_r(s)$$ be a knapsack instance identical to $$P$$, except with $$J=\{1,\cdots,r\}$$ (if $$r=0$$, let $$J=\emptyset$$) and $$b=s$$<Footnote>In other words, restrict the set of items to only the first $$r$$ items, and reduce the weight limit from $$b$$ to $$s$$.</Footnote>. Let $$f_r(s)$$ be the value of the optimal solution to $$P_r(s)$$. Note that with these definitions, the optimal value if $$P=P_n(b)$$ and has optimal value $$f_n(b)$$.

The key to dynamic programming is relating the optimal value of some instance to the optimal value of smaller instances. To that end, let's think about what we can say about $$f_r(s)$$ for some setting of the values $$r$$ and $$s$$. In particular, let's think about the $$r$$th item. Obviously, an optimal solution to $$P_r(s)$$ will either include item $$r$$ or it will not.

If the optimal solution to $$P_r(s)$$ <em>does</em> includes item $$r$$, then it must be true that $$f_r(s)=v_r + f_{r-1}(s-w_r)$$. Why is that? Because once item $$r$$ has been included (giving the $$v_r$$ portion of the term), we must optimally fill the remaining weight ($$s-w_r$$) with the remaining items $$\{1,2,\cdots,r-1\}$$, giving us exactly the setup for $$P_r(s-w_r)$$.

On the other hand, if the optimal solution to $$P_r(s)$$ <em>does not</em> include item $$r$$, then it must be true that $$f_r(s)=f_{r-1}(s)$$. Why? Because the optimal solution to $$P_r(s)$$ uses only items $$\{1,2,\cdots,r-1\}$$ to fill the entire weight $$s$$.

So we have two possible scenarios, one of which must hold true. Since we are maximizing, the one that holds must be the maximum of the two. So we can write the recursive equation<Footnote>In the terminology of dynamic programming, this type of equation is called a <a href=https://en.wikipedia.org/wiki/Bellman_equation>Bellman equation</a></Footnote>:
<MathDisp refId=knapsackRecursion>
    f_r(s) = \max\{f_{r-1}(s), v_r + f_{r-1}(s-w_r)\}
</MathDisp>
(note that for this to hold in all cases, we should define $$f_{r}(s)=-\infty$$ when $$s<0$$. That way the $$v_r + f_{r-1}(s-w_r)$$ term is never the maximum when the $$r$$th item's weight is over the weight limit.)

So we can find values of $$f_r(s)$$ for larger $$r$$ and $$s$$ by checking the solutions to smaller versions of the problem. And, luckily, the smallest knapsack problems are very easy. Trivially, $$f_r(0)=0$$ for all $$r\in\{1,2,\cdots,n\}$$<Footnote>Since the weight limit is 0, but all item weights are greater than 0.</Footnote>. The values of $$f_1(s)$$ are pretty easy to find as well: Either $$f_1(s)=v_1$$ if $$w_1\leq s$$ or otherwise $$f_1(s)=0$$.

The above is the basis of our dynamic programming algorithm. For a simple implementation, we need to keep track of $$f_r(s)$$ for all feasible values of $$r$$ and $$s$$, i.e. $$r\in\{0,1,\cdots,n\}$$ and $$s\in\{0,1,\cdots,b\}$$. As well, we need to know the set of items selected for each setting of $$r,s$$, which we'll denote by $$S_r(s)$$. The first several $$r,s$$ values are easy, and subsequent ones are calculated from earlier solutions using the recursion of <EquationRef refId=knapsackRecursion/>.

The full algorithm looks like this:
<Algorithm refId=knapsackDP>
    <span slot=name>Knapsack DP Algorithm</span>
    <span slot=solves><ProblemRef refId=knapsack /></span>
    <AlgoText type=initialize>
        <span slot=child>
            <AlgoText>
                for all $$r\in\{0,1,\cdots,n\}$$ and $$s\in\{0,1,\cdots,b\}$$, set
                <MathDisp fontSize=0.9>
                    f_r(s) \leftarrow \begin{cases}
                        0&\text{if }s=0\text{ or }r=0 \\
                        \text{undefined}&\text{otherwise}
                    \end{cases}
                </MathDisp>
                and
                <MathDisp fontSize=0.9>
                    S_r(s) \leftarrow \begin{cases}
                        \emptyset&\text{if }s=0\text{ or }r=0 \\
                        \text{undefined}&\text{otherwise}
                    \end{cases}
                </MathDisp>
            </AlgoText>
            <AlgoText>set $$r\leftarrow1$$</AlgoText>
            <AlgoText>set $$s\leftarrow1$$</AlgoText>
        </span>
    </AlgoText>
    <AlgoText type=iterate>
        <span slot=child>
            <AlgoText type=while>
                $$r\leq n$$
                <span slot=child>
                    <AlgoText type=while>
                        $$s\leq b$$
                        <span slot=child>
                            <AlgoText type=if>
                                $$s\geq w_r$$ and $$v_r + f_{r-1}(s-w_r) > f_{r-1}(s)$$
                                <span slot=child>
                                    <AlgoText>set $$f_r(s) \leftarrow v_r + f_{r-1}(s-w_r)$$</AlgoText>
                                    <AlgoText>set $$S_r(s) \leftarrow S_{r-1}(s-w_r)\cup\{r\}$$</AlgoText>
                                </span>
                            </AlgoText>
                            <AlgoText type=else>
                                <span slot=child>
                                    <AlgoText>set $$f_r(s) \leftarrow f_{r-1}(s)$$</AlgoText>
                                    <AlgoText>set $$S_r(s) \leftarrow S_{r-1}(s)$$</AlgoText>
                                </span>
                            </AlgoText>
                            <AlgoText>set $$s\leftarrow s+1$$</AlgoText>
                        </span>
                    </AlgoText>
                    <AlgoText>set $$r\leftarrow r+1$$</AlgoText>
                    <AlgoText>set $$s\leftarrow 1$$</AlgoText>
                </span>
            </AlgoText>
        </span>
    </AlgoText>
    <AlgoText type=return>
        $$S_n(b)$$ as max-value subset with total value $$f_n(b)$$
    </AlgoText>
</Algorithm>

Let's work through an example in <FigureRef refId=knapsackExample/>:

<Figure refId=knapsackExample>
    <InteractiveKnapsackDp
        b={7}
        possibleItems={[
            {weight: 2, value: 10},
            {weight: 1, value: 7},
            {weight: 6, value: 25},
            {weight: 5, value: 24},
        ]}
    />
    <span slot=caption>Stepping through an example of <AlgorithmRef refId=knapsackDP />.</span>
</Figure>

We've already discussed why this algorithm works in our discussions on <EquationRef refId=knapsackRecursion/>, but let's go ahead and formalize it with a proof.

<Theorem refId=knapsackDP>
    <AlgorithmRef refId=knapsackDP /> solves the <ProblemRef refId=knapsack /> by returning a maximum-value set of items whose combined weight does not exceed the weight limit.
    <span slot=proof>
        The key to this proof is to show the correctness of the recursive equation <EquationRef refId=knapsackRecursion/>, which we will prove by induction. For the base case, since by definition of the <ProblemRef refId=knapsack /> we have $$w_j>0$$ for all $$j\in J$$, it is clear that $$f_j(0)=0$$ for any $$j\in J$$, which satisfies <EquationRef refId=knapsackRecursion/>.

        For the inductive step, suppose we have some $$s$$ with $$0<s\leq b$$ and $$j\in J$$. It is clear that the solution to $$P_r(s)$$ either includes item $$r$$ or it does not. If item $$r$$ is not included, then the optimal solution to $$P_r(s)$$ is a subset of $$\{1,\cdots,r-1\}$$, meaning the solution value is $$f_{r-1}(s)$$.

        If item $$r$$ <em>is</em> included, then the optimal value is at least $$v_r$$. Furthermore, there is still $$s-w_r$$ available from the weight limit to include items from the set $$\{1,\cdots,r-1\}$$. By definition, the highest value we may attain for that is $$f_{r-1}(s-w_r)$$.

        So the optimal value $$f_r(s)$$ must be the best of these two values, i.e.
        <MathDisp>
            f_r(s) = \max\{f_{r-1}(s), v_r + f_{r-1}(s-w_r)\}
        </MathDisp>
        as prescribed by <EquationRef refId=knapsackRecursion/>.
    </span>
</Theorem>
