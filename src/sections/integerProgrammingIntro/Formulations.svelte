<script>
    import BlockQuote from "$lib/BlockQuote.svelte";
    import CitationRef from "$lib/CitationRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
</script>

<Heading level=2 refId=ipFormulations>
    Formulations
    <span slot=context>How do real-world problems fit into the <ProblemRef refId=ip link={false} /> framework?</span>
</Heading>

It might not be immediately obvious just looking at the definition, but all kinds of problems can be modeled as <ProblemRef refId=ip/>s. At the start of you textbook <CitationRef refId=wolsey2020/>, in section 1.1, the author describes applications such as train scheduling, airline crew scheduling, production planning, electricity generation, telecommunications, radiation therapy, and kidney exchanges.

How does this work? Let's start with a very simple production planning example:

<BlockQuote>
    Your fruit farm produced 400 apples and 300 oranges this year. You’ve found that fruit juice is more profitable than raw fruit. One gallon of apple juice requires 15 apples and 3.5 tablespoons of sugar, while one gallon of orange juice requires 12 oranges and 5 tablespoons of sugar. A retailer is willing to buy any gallon bottle you can fill, at a price of $2 per gallon of apple juice and $2.75 per gallon of orange juice. Assuming you have 160 tablespoons of sugar, how much of each should you make?
</BlockQuote>

How do we formulate this as an <ProblemRef refId=ip/>? Let's first determine the variables in this problem, which represent the decisions we can make. In this case, our decision is how many gallons of apple and orange juice to make. So let's have $$x_a$$ represent the number of gallons of apple juice we produce, and similarly have $$x_o$$ represent the number of gallons of orange juice.

Now let's think about the objective. Clearly, your goal is to make as much money as possible. You get $2 per gallon of apple juice, so the total amount you make from apple juice is represented by $$2x_a$$. Similarly, $$2.75x_o$$ represents the number of dollars made off orange juice. Then the full objective to maximize is $$2x_a + 2.75x_o$$.

But we can't make unlimited money. The amount of apple juice we make is ultimately constrained by our stock of apples and sugar. For one thing, we need 15 apples per gallon of apple juice and we only have 400 apples total. So $$15x_a\leq400$$ is a constraint in our problem. Similarly, we have a constraint $$12x_o\leq 300$$ imposed by our stock of oranges. The sugar is shared between the apple juice and the orange juice, with a constraint of $$3.5x_a+5x_o\leq160$$. One final technical constraint is that we can't produce a <em>negative</em> amount of juice, i.e. we must have $$x_a\geq0, x_o\geq0$$.

Brining it all together, the final formulation can be written like this:

<MathDisp>
    \begin{align*}
        \max && 2x_a + 2.75x_o \\
        \st  && 15x_a & \leq 400 \\
             && 12x_o & \leq 300 \\
             && 3.5x_a + 5x_o & \leq 160 \\
             && x_o,x_a & \geq 0
    \end{align*}
</MathDisp>

You'll often see mathematical programs written in this form. The "$$\max$$" as the start indicates that this is a maximization problem, and the particular function to maximize follows. The "$$\st$$" is shorthand for "subject to", and the lines that follow list out the problem's constraints.

Does this fit the definition of an <ProblemRef refId=ip/>? If we define $$A$$, $$b$$, and $$c$$ required in the definition of <ProblemRef refId=ip/> as<Footnote>You'll notice that I write $$b$$ here as a column vector and $$c$$ as a row vector. Why the difference? It's really just because these are the shapes I need for all the multiplications from the definition of <ProblemRef refId=ip/> to be properly defined. That said, I'll be a little sloppy with this at times, but you should usually be able to determine the true dimensions from context.</Footnote>:

<MathDisp>
    A=\begin{bmatrix}15&0\\0&12\\3.5&5\end{bmatrix} \qquad
    b=\begin{bmatrix}400\\300\\160\end{bmatrix} \qquad
    c=\begin{bmatrix}2&2.75\end{bmatrix}
</MathDisp>

Then multiplying through with variable vector

<MathDisp>
    x=\begin{bmatrix}x_a\\x_o\end{bmatrix}
</MathDisp>

will recover the formulation from above. So this is indeed an integer program.

<Heading level=2 refId=ipForms>
    Equivalent forms
    <span slot=context>Forms for <ProblemRef refId=ip link={false} /> objectives and constraints that don't explicitly fit the definition but are still valid.</span>
</Heading>

Looking at the definitions for <ProblemRef refId=lp/> and <ProblemRef refId=ip/>, you may initial think the form is overly limiting. Even accepting the linearity restrictions, the definitions require maximizing a function, and less-than-or-equal-to constraints. What if I want to minimize? Or add equality constraints? Do I need to use something else.

The answer to that question is no, your problem is still an <ProblemRef refId=ip/>. We stick to the one form in the definition because it makes writing algorithms and theorems simpler. But if you know the right tricks, there are other constraint and objective forms that can be transformed into the form from the definition.

For example, suppose you want to solve a minimization problem. The simple trick is to realize that for two number $$a$$ and $$b$$, if $$a\leq b$$ then $$-b\geq-a$$. Hence minimizing the objective function $$cx$$ is the same as maximizing $$-cx$$. So to state your problem in the maximization form required for <ProblemRef refId=ip/>, you need only negate the objective vector<Footnote>Such a negation is allowed since the definition of <ProblemRef refId=ip/> requires $$c\in\R^n$$, i.e. its entries could be positive or negative.</Footnote>.

By a similar argument, one can readily use greater-than-or-equal-to constraints in an <ProblemRef refId=ip/>, since for $$a_i\in\R^n$$ and $$b_i\in\R$$ we have:

<MathDisp>
    a_ix\geq b_i \quad \Leftrightarrow \quad -a_ix\leq -b_i
</MathDisp>

So negating both sides of the inequality brings it back to less-than-or-equal-to form. This opens up the ability to use equality constraints too, since

<MathDisp>
    a_ix=b_i \quad \Leftrightarrow \quad a_ix\leq b_i \quad\text{and}\quad a_ix\geq b_i
</MathDisp>

A slightly more subtle conversion: The definition of <ProblemRef refId=ip/> states that the variables must be nonnegative. But this really isn't required either, we can have so-called <em>unrestricted</em> variables which are allowed to be positive or negative.

How is this conversion done? Suppose $$x_i$$ is some variable that we'd like to be unrestricted. We could simply replace it in the formulation with two nonnegative variables $$y_i$$ and $$z_i$$ with the relation $$x_i=y_i-z_i$$. So the $$c_ix_i$$ term in the objective becomes $$c_i(y_i-z_i)=c_iy_i-c_iz_i$$, and similarly with the constraints. Then we've rewritten the formulation with only nonnegative variables, as the definition requires.

So, to recap, the linearity of the objective and constraints is not negotiable, but the form of the problem can still be changed in various ways while still staying in the <ProblemRef refId=ip/> framework:

<ul>
    <li>Objectives may be minimized or maximized.</li>
    <li>Constraints may be of $$\leq$$, $$\geq$$, or $$=$$ form.</li>
    <li>Variables may be bounded or unrestricted.</li>
</ul>
