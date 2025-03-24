<script>
    import BlockQuote from "$lib/BlockQuote.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import SectionRef from "$lib/SectionRef.svelte";
    import RunningTimes from "./RunningTimes.svelte";
    import Implications from "./Implications.svelte";
    import Reductions from "./Reductions.svelte";
    import PAndNp from "./PAndNp.svelte";

</script>

<Heading level=1 refId=complexity>
    Intro to computational complexity
</Heading>

Right about now, I can imagine you thinking...

<BlockQuote>
    Hold on just a second... We had our intro to combinatorial optimization in <SectionRef refId=combOptIntro/> where we defined <ProblemRef refId=combOpt/>s, saw different types, and discussed algorithms for solving them. Then we jumped to the intro to integer programming in <SectionRef refId=ipIntro/>, where we defined <ProblemRef refId=ip/> and worked out some formulations. But we never even talked about solving them! And now we jump to something called "computational complexity", which isn't even in the course name? What are we doing? This isn't a computer science class!
</BlockQuote>

I hear you! The thing is, I think the notions we'll discuss here are going to be useful as we continue to discuss algorithms for <ProblemRef refId=combOpt/>s, <ProblemRef refId=lp/>s, and <ProblemRef refId=ip/>s, and help us understand when <ProblemRef refId=ip/> formulations are a good option when faced with a <ProblemRef refId=combOpt/>. I happen to think this stuff is pretty neat in it's own right, too.

The whole aim of this section is to try to formalize what problem are "easy" vs. "hard", or what it might mean to have a "good" algorithm for a particular class of problems. We won't be fully rigorous here, instead shooting for a good balance of rigorous enough to be meaningful while not getting ourselves lost in the details. As you said in my imagined hypothetical, this isn't a computer science class!<Footnote>Though, if I do my job here, you may be inspired to take one!</Footnote>

<RunningTimes/>
<PAndNp/>
<Reductions/>
<Implications/>