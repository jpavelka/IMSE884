<script lang="ts">
    import { equations } from "./stores";
    import KatexDisp from "./KatexDisp.svelte";
    import { refNumbering } from "$lib";

    export let refId: string = "";
    export let ignoreOverflow: boolean = false;
    export let fontSize = '1';
    export let name = '';
    export let alwaysRender = false;

    const options = {
        displayMode: true,
        throwOnError: false,
    };
    let eqnNum = "";
    if (refId !== "") {
        refId = refNumbering(equations, refId, 'eqn');
        eqnNum = $equations.numbers[refId];
        if (name !== "") {
            equations.update(e => {
                e.names[refId] = name;
                return e
            })
        }
    }
    $: returnId = $equations.returnIds[refId];
	let el: HTMLElement;
	$: {
		if (!!el && !alwaysRender) {
			const parent = el.parentElement || {classList: []};
			alwaysRender = ![...parent.classList].includes('notesContent');
		}
	}
</script>

<span bind:this={el}></span>
<div style="display:flex;align-items:center">
    <div class=mathDisp style={"flex-grow:1;" + (ignoreOverflow ? "" : "overflow-x:auto")} id={refId}>
        <KatexDisp {options} fontSize={fontSize} refId={refId} {alwaysRender}>
            <slot />
        </KatexDisp>
    </div>
    {#if eqnNum !== ""}
        <div style="font-size:1.2rem;margin-left:0.5rem;">({eqnNum})</div>
    {/if}
</div>
{#if !!returnId}    
    <a
    style="float:right;"
    href={"#" + returnId}
    on:click={() => {
        equations.update((s) => {
            delete s.returnIds[refId];
            return s;
        });
    }}
    >
    ↩︎</a
    >
{/if}
