<script lang="ts">
	import KatexDisp from "./KatexDisp.svelte";

	export let fontSize = 0.9;
	export let extraStyle = "";
	export let mouseOverFunction = undefined;
	export let mouseOutFunction = undefined;
	export let alwaysRender = false;
	export let extraMacros: {[key: string]: string} = {};
	const options = {
		displayMode: false,
		throwOnError: false,
	};
	let el: HTMLElement;
	$: {
		if (!!el && !alwaysRender) {
			const parent = el.parentElement || {classList: []};
			alwaysRender = ![...parent.classList].includes('notesContent');
		}
	}
</script>

<span bind:this={el}></span>
<KatexDisp
	{options}
	{fontSize}
	{extraStyle}
	{mouseOverFunction}
	{mouseOutFunction}
	{alwaysRender}
	{extraMacros}
>
	<slot />
</KatexDisp>
