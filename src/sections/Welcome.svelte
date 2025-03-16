<script>
    import CitationRef from "$lib/CitationRef.svelte";
    import Footnote from "$lib/Footnote.svelte";
    import Heading from "$lib/Heading.svelte";
    import Key from "$lib/Key.svelte";
    import Problem from "$lib/Problem.svelte";
    import MathDisp from "$lib/MathDisp.svelte";
    import InteractiveIndependentSet from "$lib/InteractiveIndependentSet.svelte";
    import Definition from "$lib/Definition.svelte";
    import DefinitionRef from "$lib/DefinitionRef.svelte";
    import Figure from "$lib/Figure.svelte";
    import FigureRef from "$lib/FigureRef.svelte";
    import ProblemRef from "$lib/ProblemRef.svelte";
    import RandomIndependentSet from "$lib/RandomIndependentSet.svelte";

    const indSetNodes = {a: 3, b: 6, c: 4, d: 1, e: 2, f: 6, g: 3, h: 2};
    const indSetEdges = ["a,b", "b,c", "b,e", "c,d", "d,f", "d,g", "e,f", "f,g", "f,h"];
    const indSetSeed = 3;
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

<Heading refId=iLoveCombOpt level=2>
    Why I love this stuff (and you might too!)
    <span slot=context>Sharing my own journey in learning combinatorial optimization and integer programming.</span>
</Heading>

Alright, admin stuff is over, now's the time we'd usually jump right into the meat of the course. Except I'd like to step back a little. Before we step into it, I'd like to give you a sense for why we bother teaching this stuff anyway. Personally, I find this subject endlessly fascinating in its own right. I get enjoyment out of the inherent puzzle-like nature of the problems we're solving, and I imagine several of you will join me in this. I also marvel in the beauty of the math underlying the techniques we'll be using, and while I suspect that feeling is less universal, I hope to pull at least a few of you in there as well 😊.

But even beyond personal preferences, this stuff is seriously useful in the real world. Businesses from various industries around the world use these techniques every day, with the combined benefits easily topping billions of dollars annually. So even if you don't <em>love</em> this stuff quite like me, the applicability of the techniques is inarguable.

<Heading refId=combOptGames level=3>
    Fun and games
</Heading>

Do you enjoy puzzle games? I'm particularly thinking about games like <a href=https://en.wikipedia.org/wiki/Sudoku>sudoku</a>, <a href=https://en.wikipedia.org/wiki/Peg_solitaire>peg solitaire</a>, <a href=https://en.wikipedia.org/wiki/Rush_Hour_(puzzle)>rush hour</a>, or <a href=https://en.wikipedia.org/wiki/Minesweeper_(video_game)>minesweeper</a>. The kind of game with simple rules and a clear goal that require you to think through some logic or sequence of steps to accomplish the goal. There are no opponents, no physical skills to master, and luck plays little to no role in the outcome. It's just you and wits trying to solve the puzzle.

I happen to adore these kinds of games. As a kid, I could spend hours getting lost in them. Fast-forward to my college years, and I'm taking my first class in combinatorial optimization<Footnote>Though maybe it was a graph theory class? I don't remember exactly, some of the material overlaps.</Footnote>. I find that lots of the problems we're studying scratch the same itch as those puzzle games.

Want an example? Let's go ahead and define one right now, though don't worry about reading it in detail yet.

<Problem refId=maxWeightIndSet>
    <span slot=name>Maximum Weight Independent Set Problem</span>
    <span slot=instance>
        Graph $$G=(V,E)$$, non-negative vertex weights $$w_{v}\in\Z_{\geq0}$$ for each $$v \in V$$.
    </span>
    <span slot=problem>
        Find a subset of the vertices $$V'\subseteq V$$ where no two vertices in $$V'$$ are adjacent, such that the sum $$\sum_{v\in V'}w_v$$ is maximized. That is, find
        <MathDisp>
            \argmax_{V'\subseteq V}\left\{\sum_{v\in V'}w_v:(u,v)\not\in E\ \forall\ u,v\in V'\right\}
        </MathDisp>
    </span>
</Problem>

Excited yet? No? Well, I wouldn't have been the first time I saw this either. Luckily the professor didn't introduce it like that. Instead, he went to the whiteboard and drew something like <FigureRef refId=indSetEx/>.

<Figure refId=indSetEx>
    <InteractiveIndependentSet
        nodes={indSetNodes}
        edges={indSetEdges}
        seed={indSetSeed}
    />
    <span slot=caption>An example <ProblemRef refId=maxWeightIndSet/></span>
</Figure>

Each of the circles represents a vertex in the graph, and a line drawn between vertices is an edge. There are two pieces of information given inside the vertices. First is the name of the vertex, some letter of the alphabet. Next is the weight associated with the vertex. So, on the far-left of the diagram is vertex $$a$$, whose weight is 3. Then you see vertex $$b$$ with weight 6, and so on.

The game is to create a so-called <Definition refId=independentSet>
    independent set
    <span slot=definition>
        In <DefinitionRef refId=graphTheory/>, a subset $$V'\subseteq V$$ of the vertices such that no two vertices in the set are adjacent.
    </span></Definition> (also known as a <Definition refId=stableSet>stable set<span slot=definition>See <DefinitionRef refId=independentSet/>.</span></Definition>) of vertices, i.e. a subset $$V'\subseteq V$$ of the vertices such that no two vertices in $$V'$$ share and edge. Importantly, you'd like the sum of the weights of vertices in $$V'$$ to be as high as possible.

For example, the set $$\{b\}$$ is an independent set with weight 6. The set $$\{b, f\}$$ is also an independent set, and a better one in the context of the game since the total weight of that set is 12 (6 for $$b$$ and 6 for $$f$$). The set $$\{b,f,g\}$$ has weight 15, but it doesn't count for our game since $$f$$ and $$g$$ are adjacent, and hence the set is not independent.

Got the idea? Then go on back to <FigureRef refId=indSetEx/> and try to find the best independent set you can! As you click on vertices, their color will change from blue to orange to indicate they've been added to the independent set. However, if you try to select a vertex with a neighbor already in the set, the vertex flashes red to indicate it may not be added. Under the graphic, we keep track of the members of the set and combined weight of the current members. When you're finished trying to build your best set, you can hit the "Solve" button to see the optimal solution.

Wanna try some more? We have you covered in <FigureRef refId=randIndSet/>, where you can randomly generate new instances to play around with.

<Figure refId=randIndSet>
    <RandomIndependentSet />
    <span slot=caption>
        Game time! Try out some randomly-generated instances of the <ProblemRef refId=maxWeightIndSet/>
    </span>
</Figure>

Now, this is just one example. Several of the problems we'll discuss in this class have the same game-like qualities, which was my first hook. But beyond that, you might be wondering what's going on behind that magic "Solve" button. Can you trust that it's actually identifying the optimal solution?<Footnote>Yes, you can.</Footnote> And how does it work, anyway?<Footnote>We're getting there... solving problems like these is the whole point of the class!</Footnote> Is it just trying all the different possibilities and returning the one with the highest weight?<Footnote>No. Or, at least not usually. Enumeration works, of course, but we generally have better ways to solve these problems. Though <em>how much</em> better is a point of discussion, which is all part of the class!</Footnote> If you find yourself wondering about these kinds of questions, you're in the right place and we'll get along just fine!

<Heading refId=combOptBusiness level=3>
    Serious business
</Heading>

Whether or not the above resonates with you, another reason to learn about these optimization problems is that they can be seriously useful in a business context, and knowledge of these techniques can be very useful on a résumé.

I know this from experience. In my career working in retail, I've built optimization models for improving efficiency in several aspects of online order fulfillment. For example:

<ul>
    <li>Determining what products are stocked in different warehouses, and in what quantities.</li>
    <li>When an order comes in from the website, determining from which warehouse(s) the order will be fulfilled.</li>
    <li>Determining which orders will be picked and shipped during each fulfillment "wave".</li>
    <li>Determining which size box to ship an order in.</li>    
</ul>

All that for just online order fulfillment. There are several more examples in different parts of the retail industry, as well as nearly any other industry in the economy.

For other examples, we'll turn to some recent finalists the <a href=https://www.informs.org/Recognizing-Excellence/INFORMS-Prizes/Franz-Edelman-Award>Edelman Award</a>, which is annual prize given out by the professional society known as <a href=https://www.informs.org>INFORMS</a> (the Institute for Operations Research and the Management Sciences). The stated goal of the prize is to "recognize excellence in the execution of operations research on the organizational level" and gives some great case studies of the use of optimization in companies worldwide. The awarded projects apply operations research principles to business problems; combinatorial optimization and integer programming use cases are often featured. Here's a sample of recent finalists that used techniques we'll discuss in class (check the links in the "Year" column for more project descriptions):

<Figure refId=edelman>
    <table>
        <tr><th>Year</th><th>Company</th><th>Description</th><th>Reported Benefit</th></tr>
        <tr>
            <td><a href=https://3449182.fs1.hubspotusercontent-na1.net/hubfs/3449182/2024_Edelman_Gala_Book.pdf>2024</a></td>
            <td>American Airlines</td>
            <td>Large-sized mixed integer program model with a network-flow structure that realistically represents the state of the airline operation in real time.</td>
            <td>1,000 flight cancellations avoided ($15M revenue loss avoidance) over two years.</td>
        </tr>
        <tr>
            <td><a href=https://3449182.fs1.hubspotusercontent-na1.net/hubfs/3449182/2023_Edelman_Gala_Book.pdf>2023</a></td>
            <td>DHL Supply Chain</td>
            <td>Fill trucks for both inbound and outbound operations based on clustering, involving standard branch-and-cut methods.</td>
            <td>Part of a program with an estimated $98M savings per year.</td>
        </tr>
        <tr>
            <td>2023</td>
            <td>Meituan</td>
            <td>A multiperiod, multiobjective optimization problem that assigns food deliveries to available drivers.</td>
            <td>20% reduction in order delivery time.</td>
        </tr>
        <tr>
            <td>2023</td>
            <td>Walmart</td>
            <td>A metaheuristic-based framework integrating a suit of algorithms, including various neighborhood searches, heuristics, and mixed-integer programming models.</td>
            <td>$75M, 72M pounds of CO2 annually.</td>
        </tr>
        <tr>
            <td><a href=https://3449182.fs1.hubspotusercontent-na1.net/hubfs/3449182/2022_Edelman_Gala_Book.pdf>2022</a></td>
            <td>US Census Bureau</td>
            <td>A program leveraging machine learning and optimization techniques to provide daily assignments of cases to workers, along with the route that the workers should take to increase efficiency.</td>
            <td>$2.5B</td>
        </tr>
        <tr>
            <td><a href=https://tauber.umich.edu/sites/default/files/documents/2021_edelman_award_book.pdf>2021</a></td>
            <td>JD.com</td>
            <td>Dispatching automated vehicles with a large-scale integer program with millions of decision variables and constraints, solved via a Lagrangian relaxation together with cutting planes.</td>
            <td> 90% of JD.com’s first-party retail orders were delivered the same- or next-day after they were placed.</td>
        </tr>
        <tr>
            <td>2021</td>
            <td>Lenovo</td>
            <td>An advanced production scheduling solution utilizing machine learning, artificial intelligence, and reinforcement learning, modeled as a very large-scale combinatorial optimization problem.</td>
            <td>Helped Lenovo increase revenue by more than 4.6 billion over two years.</td>
        </tr>
        <tr>
            <td>2021</td>
            <td>OCP</td>
            <td>A mixed-integer, multiperiod optimization model to holistically optimize the entire production, sales, and supply chain</td>
            <td>$2.3B over a six-year period.</td>
        </tr>
    </table>
    <span slot=caption>A sample of recent Edelman prize finalists using integer programming and/or combinatorial optimization techniques.</span>
</Figure>

As you can see, businesses from a wide range of industries are making saving lots of money applying the methods we'll be discussing.


<style>
    table {
        border: 1pt solid black;
        border-collapse: collapse;
    }
    th {
        font-weight: bold;
        padding: 0 1rem;
        border: 1pt solid black;
    }
    td {
        padding: 0 1rem;
        border: 1pt solid black;
    }
</style>