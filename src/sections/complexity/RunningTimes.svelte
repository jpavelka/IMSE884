<script>
    import AlgorithmRef from "$lib/AlgorithmRef.svelte";
import Definition from "$lib/Definition.svelte";
    import DefinitionRef from "$lib/DefinitionRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";

</script>

<Heading refId=runningTimes level=2>
    Running times
</Heading>

What we'd really like to nail down first is how to describe the running time of certain algorithms. More specifically, we'd like to know how the running time changes as the size of the problem increases. This "size" we're discussing has something to do with the number of items under consideration, for example the number of vertices and edges in the underlying graph in the case of <ProblemRef refId=tsp/> or <ProblemRef refId=mst/>.

To make things a little more precise, let's suppose we have some given problem (say <ProblemRef refId=tsp/>) and let $$X$$ be and instance of that problem (i.e. a specific graph and set of edge costs). We say the <Definition refId=length>
    length
    <span slot=definition>For a given instance $$X$$ of an optimization or decision problem, the length of $$X$$ (denoted $$L(x)$$) is number of characters required in a "standard" binary representation of the instance data. Informally, think of it as the disk space required to save the instance data on your computer.</span>
    <span slot=glossaryDisp>length (complexity)</span>
</Definition> of $$X$$, denoted $$L(X)$$, is the number of characters required in a "standard" binary representation of $$X$$.

Yes, that is a rather vague definition, and those scare quotes around the word "standard" are doing a lot of lifting. Like I said ,we're not being completely formal here. For our purposes, it suffices to think of $$L(X)$$ as the amount of disk space required to save the instance data on your computer.

But just in case, let's see an example of what this might mean. Consider the example instance of <ProblemRef refId=knapsack/> we worked through in <FigureRef refId=knapsackExample/>. How would we represent this instance data in binary? First, we need to identify the relevant instance data, which for knapsack is the item weights and values. We could imagine the items having names, but that's not really important for solving the instance, so that can be ignored. So we just need the weights and values, making sure that these values for each respective item are linked in some manner. For convenience, let's allow ourselves spaces and newline characters in addition to the binary 1s and 0s. Then we might represent this instance as:

<Figure refId=knapsackExampleInstanceRepresentation>
    <table>
        <tr><td>10&nbsp;&nbsp;1010</td></tr>
        <tr><td>1&nbsp;&nbsp;111</td></tr>
        <tr><td>110&nbsp;&nbsp;11001</td></tr>
        <tr><td>101&nbsp;&nbsp;11000</td></tr>
    </table>
    <span slot=caption>A binary representation of the <ProblemRef refId=knapsack/> instance from <FigureRef refId=knapsackExample />.</span>
</Figure>

Each row has two numbers: the binary representation of each item's weight and value, respectively. The space character separates the weight number from the value number, and new lines separate data for different items. In all, there are 33 total "0", "1", space, and newline characters in the representation, so under this representation the length of the instance is 33.

So figuring out the length for any given instance isn't so bad, but what will be most useful to us is knowing roughly how $$L(X)$$ grows as the relevant inputs to $$X$$ change. In the case of <ProblemRef refId=knapsack/>, the relevant input is the size of the set of items $$J$$, as well as the numbers that make up the weights and values for each item. I think the relationship with $$|J|$$ is pretty clear: we add a new row to the representation for every item added to the instance, so the length scales linearly (roughly 1:1) with $$|J|$$.

What about the weights and values? They affect the size too, but it's not really in proportion to the numeric values, is it? The largest number represented in <FigureRef refId=knapsackExampleInstanceRepresentation/> is 25, but we don't need 25 bits to write down that number. Since 25 written in binary is 11001, we only need 5 bits to describe it. More generally, for some integer $$n$$, we only need $$\ceil{\log_2(n)}$$ bits to represent it. For convenience, let's have $$C$$ equal to the maximum of all the $$v_j$$ and $$w_j$$ values in the instance. Since each row of the representation requires one weight and one value, and we have one row per item in $$|J|$$, we can say that the size of an instance of <ProblemRef refId=knapsack/> is roughly $$|J|(2\log_2(C))$$.

You might complain that we're being a little sloppy, by rounding every row of the input up to the worst case $$2\log_2(C)$$. But compared to the conventions of the theory, we're actually being too precise! We're generally interested in worst-case scenarios, and even then not on the specifics of the numbers, but the way they grow as inputs grow. Put another way, we're more interested in shapes than exact magnitudes. So that $$2\log_2(C)$$ term can lose the "2" in front, since that doesn't affect the shape. Indeed, we don't care about the base of the logarithm either, since one of the properties of logs is that for any two bases $$a,b\in\R$$ we have:

<MathDisp>
    \log_b(x)=\log_a(x)\frac{1}{\log_a(b)}
</MathDisp>

In other words, for given $$a,b$$, the two logarithms are only off by a constant factor. So many times you'd see that $$|J|(2\log_2(C))$$ simplified to $$|J|\log(C)$$.

This "don't sweat the small stuff" philosophy is codified in the so-called "big-O" notation. The formal definition is that for two functions $$f,g$$ over the same domain, we say $$f(x)=\O{g(x)}$$ (in English, "$$f(x)$$ is big O of $$g(x)$$") if there exists some positive $$M\in\R_{>0}$$ and $$x_0$$ in the domain such that
<MathDisp>
|f(x)|\leq M|g(x)|\qquad \forall\ x\geq x_0.
</MathDisp>

Basically, this says that for big enough values of $$x$$, $$g(x)$$ is at most a constant away from $$f(x)$$. Colloquially, think of it as saying "$$g$$ grows as fast or faster than $$f$$." The formal definition is a little scary, but the real point is to give us a framework where we can abstract away the little details, and say things like "the length of an instance of the <ProblemRef refId=knapsack/> grows like $$|J|\log|C|$$", but more succinctly: "For instances $$X$$ of the <ProblemRef refId=knapsack/>, $$L(X)=\O{|J|\log|C|}$$".

Now suppose you have some problem $$P$$ (something like the <ProblemRef refId=knapsack/> or <ProblemRef refId=tsp/>) and an algorithm $$A$$ for solving the problem. For any instance $$X$$ of $$P$$, let $$f_A(X)$$ be the number of "elementary calculations" (again, not being precise here, but think things like addition, multiplication, comparison, etc.) required to run algorithm $$A$$ on instance $$X$$. We use these $$f_A(X)$$ values to define $$f_A^*(l)$$, the <Definition refId=runningTime>
    running time
    <span slot=definition>
        In complexity theory, the running time of the an algorithm $$A$$ on a problem $$P$$ (as a function of instance length $$l$$) is the maximum number of "elementary calculations" (things like addition, multiplication, comparison) required to complete the algorithm on any instance of $$X$$ of $$P$$ with length $$L(X)=l$$.
    </span>
</Definition> of algorithm $$A$$ (as a function of input length $$l$$) by taking an upper bound of the run times $$f_A(X)$$ for all instances $$X$$ with length $$L(X)=l$$. That is<Footnote>Technically the maximum here should be replaced with a supremum. As we said, we're not being completely rigorous here, and it shouldn't make a difference for the algorithms we discuss.</Footnote>:

<MathDisp>
    f_A^*(l)=\max_{X\in P}\left\{f_A(X):L(X)=l\right\}
</MathDisp>

<Heading level=3 refId=polyTime>
    Polynomial time
</Heading>

Ok, that was quite a few wonky definitions, but the payoff is we now have a succinct way to describe how an algorithm's running time changes as the size of the problem increases. The holy grail of algorithm design is to create a so-called <Definition refId=polynomialAlgo>
    polynomial
    <span slot=glossaryDisp>polynomial algorithm</span>
    <span slot=definition>
        An algorithm whose run time is bounded by a polynomial in the length of the input, i.e. there exists some integer $$p\in\Z_{>0}$$ such that
        <MathDisp>
            f_A^*(l)=\O{l^p}
        </MathDisp>
    </span>
</Definition> (or <Definition refId=polyTimeAlgo>
    polynomial-time
    <span slot=glossaryDisp>polynomial-time algorithm</span>
    <span slot=definition>See <DefinitionRef refId=polynomialAlgo/></span>
</Definition>) algorithm, which is an algorithm whose run time is bounded by a polynomial in the length of the input. In other words, an algorithm is polynomial if there is some integer $$p\in\Z_{>0}$$ such that
<MathDisp>
    f_A^*(l)=\O{l^p}
</MathDisp>

Let's try to make this more concrete, yes? As luck would have it, we've already seen a few polynomial algorithms. One such example is <AlgorithmRef refId=prim/> for <ProblemRef refId=mst/>. To show this, let's first analyze the input size of an instance $$X$$ of <ProblemRef refId=mst/>. To describe the input, we need to identify the vertices and edges, plus give costs $$c_e$$ for each $$e\in\{i,j\}$$. If we let $$C=\max_{e\in E} c_e$$, then we can safely bound the input length by $$\O{|V| + |E|\log C}$$. We can also note that the total number of edges $$|E|$$ can be on the order of $$|V|^2$$<Footnote>To attain the maximum number of edges in a graph (assuming no repeat edges) you'd need an edge between each pair of vertices. So the maximum number of edges on a graph is $$|V|$$ choose 2, or $$\frac{1}{2}|V|(|V|-1)=\O{|V|^2}$$</Footnote>. So the $$|E|\log C$$ term dominates the $$|V|$$ term in the limit, which justifies us saying

<MathDisp>
    L(X)=\O{|E|\log C}.
</MathDisp>

How many elementary operations might it take (in a worst case) to complete <AlgorithmRef refId=prim/>? In each pass through the main iteration, we add a new edge to the tree. This keeps going until the tree is a spanning tree, so $$|V|-1$$ iterations in the main loop. Each loop requires us to check the costs on each edge incident to $$U$$. While the size of $$U$$ changes, we know in every case that the number of edges we check can be no more than $$|E|$$. So that's $$\O{|E|}$$ checks of edge costs, over $$|V|-1=\O{|V|}$$ iterations, or $$\O{|V||E|}$$ operations.

Do we need to keep counting operations? I'd say no. Yes, there is the initialization step, but that won't add anything beyond the $$\O{|V||E|}$$ operations we already have. Remember, the beauty of using big-O notation is that we don't need to sweat the small stuff! So with $$L(X)=\O{|E|\log C}$$ and the number of operations being $$\O{|V||E|}$$, to show the algorithm is polynomial we need to find $$p\in\Z_{>0}$$ such that

<MathDisp>
    |V||E|=\O{(|E|\log C)^p}
</MathDisp>

This is pretty easy! Take $$p=2$$, then the right-hand is something greater than $$|E|^2$$, which by itself is bigger than $$|V||E|$$.

It might seem like I was being pretty sloppy there, but we must remember two things: First, we're not being very rigorous in this section 😊. Second, this exercise is all about finding valid bounds, not so much about being precise. Sure, if you get sloppy enough with you bound on steps of the algorithm, you may not be able to prove polynomiality. But in practice, you'd need to get really sloppy to miss it!
