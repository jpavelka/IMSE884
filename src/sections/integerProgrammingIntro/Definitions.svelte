<script>
    import Definition from "$lib/Definition.svelte";
    import DefinitionRef from "$lib/DefinitionRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import Problem from "$lib/Problem.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
</script>

<Heading level=2 refId=ipDefs>
    Definitions
    <span slot=context>Defining the important terms in integer programming.</span>
</Heading>

What is integer programming? Clearly it has something to do with the integers, i.e. the whole numbers $$0, 1, -1, 2, -2, 3, -3,\dots$$

Now to the "programming" part. In most modern contexts, when we talk about programming we're talking about writing computer code. That is <em>not</em> what we mean here. We're using an older sense of the term, from a time when the word <em>program</em> was often used as a synonym for the word <em>plan</em>. Thus the broad term <em>mathematical programming</em> is essentially just "using math to help make a plan." This makes sense, as the goal of solving an optimization problem is to ultimately use the solution and do something with it in the real world.

From mathematical programming we get to <em>linear programming</em>, so named because (as we'll see shortly) all the constraints and objectives are <em>linear</em> functions of the variables. Then we get to <em>integer linear programming</em>, so-named because it looks just like a linear program except that now the variables are required to take integer variables. This term is often shortened to simply <em>integer programming</em><Footnote>This is a little confusing, since you can certainly formulate a mathematical programming problem with nonlinear functions that also require integer variables. However, these problems are generally not described as "integer programs".</Footnote>.

There are a few common components to mathematical programming or optimization problems, integer programming included. A <Definition refId=variable>
    variable
    <span slot=definition>
        See <DefinitionRef refId=decisionVariable/>
    </span>
</Definition>
(or <Definition refId=decisionVariable>
    decision variable
    <span slot=definition>
        A quantity that can be adjusted while solving an optimization problem.
    </span>
</Definition>)
is a quantity for which the solver gets to decide the value, with the particular decisions affecting the quality of the final solution. A <Definition refId=constraint>
    constraint
    <span slot=definition>
        A condition that the variables must satisfy while solving an optimization problem.
    </span>
</Definition>
is a condition that the variables must satisfy. The <Definition refId=objectiveFunction>
    objective function
    <span slot=definition>
        A function of the variables that is to be maximized or minimized in an optimization problem.
    </span>
</Definition> (or simply <Definition refId=objective>objective<span slot=definition>See <DefinitionRef refId=objectiveFunction/>.</span></Definition>)
is some function of the variables that is to be maximized or minimized.

A <Definition refId=solution>
    solution
    <span slot=definition>
        A specification of the values of the variables in an optimization problem.
    </span>
</Definition> to an optimization problem is any specification for values of a problem's variables. A solution is called a <Definition refId=feasibleSolution>
    feasible solution
    <span slot=definition>
        A solution to an optimization problem that satisfies all the constraints.
    </span>
</Definition> if it satisfies all the problem's constraints. In contrast, any solution that does not satisfy all constraints is called an <Definition refId=infeasibleSolution>
    infeasible solution
    <span slot=definition>
        A solution to an optimization problem that does not satisfy all constraints (i.e. violates at least one constraint).
    </span>
</Definition>.

The goal of an optimization problem is to find an <Definition refId=optimalSolution>
    optimal solution
</Definition>, a feasible solution that gives the most favorable value (maximum for a maximization problem, or minimum for a minimization problem) to the objective function. It is important to note that we're looking for <em>an</em> optimal solution, not <em>the</em> optimal solution. It is very possible for an optimization problem to have multiple optimal solutions, but we are generally only tasked with finding one of them. Conversely, it is also possible for a problem to have <em>no</em> feasible solutions (a so-called <Definition refId=infeasibleProblem>
    infeasible problem
    <span slot=definition>An optimization problem for which all solutions are infeasible (see <DefinitionRef refId=infeasibleSolution/>).</span>
</Definition>), in which case there are no optimal solutions either.

We now have the vocabulary to properly define linear programming, which is an optimization problem where the objective and constraints are all linear functions of the variables.

<Problem refId=lp>
    <span slot=name>Linear Program</span>
    <span slot=abbrev>LP</span>
    <span slot=instance>
        A matrix $$A\in\R^{m\times n}$$ and vectors $$b\in\R^m$$, $$c\in\R^n$$.
    </span>
    <span slot=problem>
        Find
        <MathDisp>
            \argmax_{x\in\R_{\geq0}^n} \{cx: Ax\leq b\}
        </MathDisp>
        i.e. find nonnegative vector $$x\in\R^n_{\geq0}$$ satisfying the constraints $$Ax\leq b$$ that maximizes the objective $$cx$$.
    </span>
</Problem>

If you've only ever seen linear programming in the context of an undergrad operations research course, you might not be used to seeing <ProblemRef refId=lp/> written in matrix form. We do this here because the matrix form is much more convenient for stating results and proving theorems. But rest assured that this is still the linear programming you are used to, since we have:

<MathDisp>
    \begin{align*}
    Ax\leq b
    & \quad\Leftrightarrow\quad
    \begin{bmatrix}
    a_{11} & a_{12} & \cdots & a_{1n} \\
    a_{21} & a_{22} & \cdots & a_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    a_{m1} & a_{m2} & \cdots & a_{mn} \\
    \end{bmatrix}
    \begin{bmatrix}
    x_1 \\ x_2 \\ \vdots \\ x_n
    \end{bmatrix}
    \leq
    \begin{bmatrix}
    b_1 \\ b_2 \\ \vdots \\ b_m
    \end{bmatrix}
    \\ \\
    & \quad\Leftrightarrow\quad
    \begin{align*}
        a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n &\leq b_1 \\
        a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n &\leq b_2 \\
        &\vdots \\
        a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n &\leq b_m \\
    \end{align*}
    \end{align*}
</MathDisp>

Basically, we just require that the constraints are of the form

<MathDisp>
    (\text{constant1})\cdot(\text{variable1}) + (\text{constant2})\cdot(\text{variable2}) + \cdots \leq (\text{constant})
</MathDisp>

and the objective function is similarly

<MathDisp>
    (\text{constant1})\cdot(\text{variable1}) + (\text{constant2})\cdot(\text{variable2}) + \cdots
</MathDisp>

From linear programming, we come to integer programming simply by requiring that all variables take integer variables.

<Problem refId=ip>
    <span slot=name>Integer (Linear) Program</span>
    <span slot=abbrev>IP</span>
    <span slot=instance>
        A matrix $$A\in\R^{m\times n}$$ and vectors $$b\in\R^m$$, $$c\in\R^n$$.
    </span>
    <span slot=problem>
        Find
        <MathDisp>
            \argmax_{x\in\Z_{\geq0}^n} \{cx: Ax\leq b\}
        </MathDisp>
        i.e. find nonnegative integer vector $$x\in\Z^n_{\geq0}$$ satisfying the constraints $$Ax\leq b$$ that maximizes the objective $$cx$$.
    </span>
</Problem>

Often when formulating <ProblemRef refId=ip/>s for <ProblemRef refId=combOpt/>s, the variables will further be restricted to equaling either $$0$$ or $$1$$. The subset of integer programming that requires all variables be either $$0$$ or $$1$$ is called binary programming or binary integer programming:

<Problem refId=bip>
    <span slot=name>Binary Integer Program</span>
    <span slot=abbrev>BIP</span>
    <span slot=instance>
        A matrix $$A\in\R^{m\times n}$$ and vectors $$b\in\R^m$$, $$c\in\R^n$$.
    </span>
    <span slot=problem>
        Find
        <MathDisp>
            \argmax_{x\in\{0,1\}^n} \{cx: Ax \leq b\}
        </MathDisp>
    </span>
</Problem>

Lastly, we should note that sometimes we don't want <em>all</em> variables restricted to integer variables, but only some of them. If this is the case, we call the problem a <em>mixed</em> integer program, which we can define as:

<Problem refId=mip>
    <span slot=name>Mixed Integer (Linear) Program</span>
    <span slot=abbrev>MIP</span>
    <span slot=instance>
        A matrix $$A\in\R^{m\times n}$$, $$G\in\R^{m\times p}$$ and vectors $$b\in\R^m$$, $$c\in\R^n$$, $$h\in\R^p$$.
    </span>
    <span slot=problem>
        Find
        <MathDisp>
            \argmax_{x\in\Z^n_{\geq0},y\in\R_{\geq0}^p} \{cx: Ax + Gy\leq b\}
        </MathDisp>
    </span>
</Problem>

Sometimes a regular <ProblemRef refId=ip/> is referred to as a <em>pure</em> integer program, as a way to distinguish it from <ProblemRef refId=mip/>. We will not spend much time discussing <ProblemRef refId=mip/> in this class, but you should know that most of the results we present for <ProblemRef refId=ip/> have a close analogue in the world of <ProblemRef refId=mip/>, though the corresponding result is usually more difficult to prove.
