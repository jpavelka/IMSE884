<script>
    import Heading from "$lib/Heading.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import CombOptIps from "./CombOptIps.svelte";
    import Definitions from "./Definitions.svelte";
    import Formulations from "./Formulations.svelte";
</script>

<Heading level=1 refId=ipIntro>
    Intro to integer programming
    <span slot=context>Presenting the basics of integer programming.</span>
</Heading>

We've made it now to the second major topic in the course, integer programming. But it wouldn't be right to see it as a separate topic from <ProblemRef refId=combOpt/>. Really it is a framework for solving many optimization problems, most <ProblemRef refId=combOpt/>s included. It's one of the most powerful and broadly-applicable optimization techniques available.

But we're not ready to talk about solving them yet. Our first step is to define the technique, and then show how it can be used to model many types of problems, <ProblemRef refId=combOpt/>s and beyond.

<Definitions />
<Formulations />
<CombOptIps />

<!-- <Heading level=2 refId=ipRecap>
    Recap
</Heading> -->
