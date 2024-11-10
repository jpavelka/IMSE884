<script>
    import Heading from "$lib/Heading.svelte";
    import Key from "$lib/Key.svelte";
    import Definitions from "./Definitions.svelte";
    import Examples from "./Examples.svelte";
    import Algorithms from "./Algorithms.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
</script>

<Heading level="1" refId="combOptIntro">
    Intro to combinatorial optimization
    <span slot=context>Presenting the basics of the field of combinatorial optimization.</span>
</Heading>

In this section, we'll <Key>introduce the field of combinatorial optimization</Key>. We'll describe several common problems that fall under the combinatorial optimization umbrella. For a few of these problems, we'll also present special-case algorithms used to solve them.

<Definitions />
<Examples />
<Algorithms />

<Heading level=2 refId="combOptRecap">
    Recap
</Heading>

Hopefully you've found this section informative, and maybe even a little fun! We've seen a variety of <ProblemRef refId=combOpt/> problems and gotten a feel for how they might be useful in real-life applications. Beyond that, we've gotten into the details of how to find solutions, with both exact and approximation algorithms, along the way introducing common techniques like greedy algorithms and dynamic programming.

As fun as that all can be, you might be getting the feeling that <ProblemRef refId=combOpt/> is a somewhat disjointed field. Instead of treating each individual problem as its own walled garden, with its own quirks and solution techniques, wouldn't it be nice if there were a unified way to approach these problems? Luckily such approaches and frameworks <em>do</em> exist. Many of the common toolsets derive from integer programming, which we will study next.