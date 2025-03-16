<script>
    import Appendix from "./appendix/Appendix.svelte";
    import Bibliography from "$lib/Bibliography.svelte";
    import Welcome from "./Welcome.svelte";
    import CombOptIntro from "./combOptIntro/0CombOptIntro.svelte";
    import Glossary from "$lib/Glossary.svelte";
    import IntegerProgrammingIntro from "./integerProgrammingIntro/0IntegerProgrammingIntro.svelte";
    import ComplexityIntro from "./complexity/0ComplexityIntro.svelte";
    import Symbols from "./Symbols.svelte";
</script>

<Welcome />
<CombOptIntro />
<IntegerProgrammingIntro />
<ComplexityIntro />
<Appendix />
<Glossary />
<Symbols />
<Bibliography />