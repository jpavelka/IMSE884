<script>
    import BodyText from "$lib/BodyText.svelte";
    import Heading from "$lib/Heading.svelte";
    import Key from "$lib/Key.svelte";
    import Definitions from "./Definitions.svelte";
    import Examples from "./Examples.svelte";
</script>

<Heading level="1" refId="combOptIntro">
    Intro to combinatorial optimization
    <span slot=context>Presenting the basics of the field of combinatorial optimization.</span>
</Heading>

<BodyText>
    In this section, we'll <Key>introduce the field of combinatorial optimization</Key>. We'll describe several common problems that fall under the combinatorial optimization umbrella. For a few of these problems, we'll also present special-case algorithms used to solve them.
</BodyText>

<Definitions />
<Examples />