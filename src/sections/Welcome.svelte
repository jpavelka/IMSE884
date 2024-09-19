<script>
    import CitationRef from "$lib/CitationRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Key from "$lib/Key.svelte";
</script>

<Heading level="1" refId="welcome">
    Welcome!
    <span slot=context>Where we discuss what to expect in this class and these notes.</span>
</Heading>

You're reading the class notes for <em>IMSE 884: Integer Programming and Combinatorial Optimization</em>, taught at Kansas State University during the Spring 2025 semester.

<Heading level="2" refId="aboutTheCourse">
    About the course
    <span slot=context>Discussing topics and particulars of the course.</span>
</Heading>

As the name suggests, the aim of this course is to give an <Key>overview of the related fields of integer programming and combinatorial optimization</Key>, which together comprise a large portion of the <Key>best-studied and most widely-applicable problems</Key> in optimization and mathematical programming. <Key>We will lean more heavily on the theoretical aspects</Key> of the subject, spending most of our time on theory and algorithms that allow solutions to be found to these important problems. We will devote a relatively smaller amount of time to building and solving these types of models in practice.

As far as prerequisites, you should have some <Key>familiarity with linear algebra</Key>, at a minimum the basic mechanics of <Key>matrix math (addition/multiplication)</Key>. Topics such as linear rank and determinants with surface as well. Some familiarity with other optimization topics, especially <Key>linear programming</Key>, will also prove helpful.

We will begin the class by by <Key>exploring a selection of different combinatorial optimization problems</Key> and specialized algorithms for solving them. We'll then discuss <Key>preliminaries on integer programming</Key>, which we will see can itself be used as a tool for combinatorial optimization (as well as other types of problems).

In these discussions, we'll begin to notice how <Key>some problems seem to require more resources</Key> than others while modeling and solving them. This will motivate a <Key>discussion on computational complexity</Key>. We will not develop this topic completely formally, but at least at enough depth to help frame our discussions on what problems may be easier to solve than others.

From there, we'll take a deep dive into the <Key>theory of solving integer programs</Key>. We'll need to start with a <Key>review<Footnote>
    I expect that most of you taking this course have studied linear programming before. But don't worry too much of that's not the case, as we'll touch on all the theory we need during the review.
</Footnote> of linear programming</Key> and polyhedra. This will allow us to discuss the main integer programming techniques of <Key>cutting planes and branch-and-bound</Key>. From there we will cover some more <Key>specialized solving techniques</Key>, and spend some time discussing practical matters of <Key>solving integer programs in real-life</Key> applications.

<Heading level="3" refId="textbooks">
    Textbooks
    <span slot=context>Useful resources for students.</span>
</Heading>

The core of <Key>this course will be taught from these notes</Key>, thus students are <Key>not strictly required to obtain a separate textbook</Key>. But I will strongly suggest anyone taking the course find a copy of the second edition to Laurence Wolsey's book <Key><em>Integer Programming</em> <CitationRef refId=wolsey2020/>. A large portion of this course</Key>'s content is derived from this book (although we'll present things in a slightly different order), and you'll find further details there not covered in the notes.

There are a few other sources that I recommend, whose contents is woven into this course. I have to start with the book <Key><em>Integer and Combinatorial Optimization</em> <CitationRef refId=nemWol2014/></Key>, written by Wolsey along with George Nemhauser, which is <Key>potentially <em>the</em> reference for this subject<Footnote>
    Why didn't I choose <CitationRef refId=nemWol2014/> as the course text? I think the presentation and level of <CitationRef refId=wolsey2020/> is a little better suited for this course. It's also a bit newer, and although the theory found in <CitationRef refId=nemWol2014/> is evergreen, <CitationRef refId=wolsey2020/> contains a bit more updated information on techniques used by solvers in practice today.
</Footnote></Key>. Two books written by Alexander Schrijver, <em>Theory of Linear and Integer Programming</em> <CitationRef refId=schrijver1998theory/> and <em>Combinatorial Optimization: Polyhedra and Efficiency</em> <CitationRef refId=schrijver2003combOpt/>, are excellect resources and cover the subject at an impressive depth (though the writing style is rather terse, and can be a little challenging for readers that are new to the subject). On the less theoretical, more practical side is Williams' book <em>Model Building in Mathematical Programming</em> <CitationRef refId=williams2013model/>, which gives several examples of taking real-world problems and modeling them to be solved as integer programs (as well as other types of optimization problesm).

<Heading level="2" refId="aboutTheNotes">
    About the notes
    <span slot=context>Discussing how to use this site.</span>
</Heading>

I have an irrational aversion to paper and think digital formats have so much more to offer. But I <Key>couldn't find a digital note-creating system that had the features I wanted, so I built my own</Key>. The result is what you're seeing now. These notes will display and generally work <Key>better on wider screens</Key> (e.g. a computer monitor/laptop/tablet as opposed to your phone), but can be accessed by anything with a web browser. If physical copies are your thing, you can <Key>print these notes from your browser</Key>. From what I've seen, Chrome and Edge will create a decent PDF through their default print utility, while Firefox was lacking. <Key>Your mileage may vary</Key>.

Additionally, <Key>I'd love to hear your feedback on the notes!</Key> That means both content (the notes are almost surely littered with typos and unclear wordings) and user experience. If you find mistakes or have any ideas for how to make the notes better, I'd love to hear about them! (Though I'm only a hack of a web developer, so my ability to deliver on any of your technical suggestions may be limited.) I will be keeping track of who has contributed to improving these notes, and will have a prize at the end of the semester for the student(s) responsible for the most/best improvements.

<Key>These notes were created for educational use. With proper attribution, readers may freely copy, distribute, or produce derivative work from this content, in whole or in part, for any non-commercial use.</Key>
