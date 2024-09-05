<script>
    import { printMode } from "./stores";


</script>

<div class={"bodyText" + ($printMode ? ' bodyTextPrintMode' : '')}>
    <slot />
</div>

<style>
    .bodyText {
        font-size: 1.4rem;
        margin-top: 1.5rem;
        line-height: 2.25rem;
    }
    .bodyTextPrintMode {
        font-size: 1.1rem;
    }
</style>
