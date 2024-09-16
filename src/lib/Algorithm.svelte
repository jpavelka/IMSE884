<script>
    export let refId;
</script>

<div class=algoWrapper>
    <div class=algoName><slot name=name /></div>
    <div class=algoSolves>Solves: <slot name=solves /></div>
    <slot />
</div>

<style>
    .algoWrapper {
        background-color: #ededed;
        padding: 1.7em;
        border: 1pt solid gray;
        margin: 0.5rem;
        padding-top: 0;
        font-size: var(--standardFontSize);
    }
    .algoName {
        font-weight: bold;
        margin-top: 2rem;
        font-size: calc(1.1 * var(--standardFontSize));
        text-decoration: underline;
    }
    .algoSolves {
        margin-top: 0.25rem;
        margin-bottom: 1rem;
    }
</style>