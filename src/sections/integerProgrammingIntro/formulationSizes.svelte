<script>
    import EquationRef from "$lib/EquationRef.svelte";
    import Heading from "$lib/Heading.svelte";
    import MathDisp from "$lib/MathDisp.svelte";

    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import Figure from "$lib/Figure.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";

    let growthChart;
    let growthChartEl;
    let growthChartCtx;
    let labels;
    let maxN = 8;

    const makePlot = () => {
        if (!!growthChart) {
            growthChart.destroy();
        }
        labels = [...Array(maxN + 1).keys()];
        growthChart = new Chart(growthChartCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'x',
                    data: labels.map(x => x),
                }, {
                    label: 'x^2',
                    data: labels.map(x => x ** 2),
                }, {
                    label: 'x^3',
                    data: labels.map(x => x ** 3),
                }, {
                    label: 'x^4',
                    data: labels.map(x => x ** 4),
                }, {
                    label: '2^x',
                    data: labels.map(x => 2 ** x),
                }]
            }
        })
    }

    onMount(() => {
        growthChartCtx = growthChartEl.getContext('2d');
        makePlot();
    });
</script>

<Heading level=2 refId=ipFormulationSizes>
    <span slot=context>Should we be worried about the number of variables and constraints in an IP formulation?</span>
    Formulation sizes
</Heading>

Did anything about that final TSP formulation <EquationRef refId=tspIp /> bother you? I'm thinking specifically about the subtour elimination constraints (1). Sure, we wrote it compactly in a single line, but how many constraints does that one line represent? It's one constraint for basically every subset of the vertex set $$V$$. Can we count that?

We can start small. If $$|V|=1$$, say $$V=\{a\}$$, then my subsets are $$\emptyset$$ and $$\{a\}$$. Two subsets total.

What if $$|V|=2$$, say $$V=\{a,b\}$$. Then the possibilities are $$\emptyset, \{a\}, \{b\}, \{a,b\}$$. Four options.

Let's add the element $$c$$, so $$|V|=3$$. Now we have eight options:

<MathDisp>
    \begin{align*}
        \emptyset,&\ \{a\},\\
        \{b\},&\ \{a,b\},\\
        \{c\},&\ \{a,c\},\\
        \{b,c\},&\ \{a,b,c\}
    \end{align*}
</MathDisp>

See a pattern? If we add a fourth element $$d$$, we have all the options we listed above, but also all those same options, but with $$d$$ added in. So each added element doubles the number of possible subsets.

Another way to think about it: For each element of the set, you have two choices - do you include it in the subset, or not? That's two options for each of the $$|V|$$ elements of the set, a total of $$2^{|V|}$$ different options!

How does that number change with the number of variables? If there's anything to know about exponentials, it's that they grow fast! As a demo, consider <FigureRef refId=growthChart/>. Here, we plot the value of several different functions of $$x$$ for integers from 0 to $$n$$, starting with $$n=8$$. At this value of $$n$$, the functions $$f(x)=x^3$$ and especially $$f(x)=x^4$$ are far above the exponential function $$f(x)=2^x$$. But this doesn't stay the case for long. By $$n=16$$ the exponential has caught up to even $$x^4$$, and from there it just leaves it in the dust. By the time you hit $$n=28$$, the exponential is so far ahead that all the polynomial functions might as well be the same.

<Figure refId=growthChart>
    <canvas bind:this={growthChartEl} id="growthChart"></canvas>
    <div style=text-align:center>
        <button style=width:2.75rem; disabled={maxN <= 0} on:click={() => {
            maxN -= 2;
            makePlot();
        }}>
            -
        </button>
        Max: {maxN}
        <button style=width:2.75rem disabled={maxN >= 30} on:click={() => {
            maxN += 2;
            makePlot();
        }}>+</button>
    </div>
    <span slot=caption>Growth rate of different functions. Exponentials eventually dominate polynomials.</span>
</Figure>

This visual will let you plot numbers up to 30, at which point we see that $$2^{30}>10^9$$. So for even a 30-city <ProblemRef refId=tsp/> instance, our formulation in <EquationRef refId=tspIp /> requires over a billion constraints! None of our other formulations show this same kind of growth rate.

And you are right to be concerned by it! It will turn out that even if our formulations don't blow up quite like the <ProblemRef refId=tsp/> formulation, algorithms for solving many of our problems may still suffer from this problem known as "combinatorial explosion", an exponential growth rates in aspects of the solution procedure. How do we know when this will happen? Are some problems worse than others? These are the types of questions we'll explore in the next section.