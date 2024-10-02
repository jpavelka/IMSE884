<script lang="ts">
    import MathInline from "./MathInline.svelte";

    export let b: number;
    export let possibleItems: Array<{
        value: number;
        weight: number;
    }>

    let n = possibleItems.length;
    let possibleItemsDict: { [key: number]: {
        value: number;
        weight: number;
    } } = {};
    for (const item of possibleItems) {
        possibleItemsDict[Object.keys(possibleItemsDict).length + 1] = item;
    }
    let r = 1;
    let s = 0;
    let f: Array<Array<number>> = [];
    let items: Array<Array<undefined | Array<number>>> = [];
    let rr = 0;
    while (rr <= n) {
        f[rr] = [];
        items[rr] = [];
        let ss = 0
        while (ss <= b) {
            if (rr == 0) {
                f[rr][ss] = 0;
                items[rr][ss] = [];
            } else {
                f[rr][ss] = ss === 0 ? 0 : -Infinity;
                items[rr][ss] = ss === 0 ? [] : undefined;
            }
            ss++;
        }
        rr += 1;
    }
    const lastClick = () => {
        if (r <= n) {
            f[r][s] = -Infinity;
            items[r][s] = undefined;
        }
        if (s === 1) {
            if (r === 1) {
                s = 0;
            } else {
                r -= 1;
                s = b;
            }
        } else {
            s -= 1;
        }
    }
    const nextClick = () => {
        s += 1;
        if (s > b) {
            r += 1;
            s = 1;
        }
        if (r === n + 1) {
            return
        }
        let includeValue = possibleItemsDict[r].value;
        if (s - possibleItemsDict[r].weight >= 0) {
            includeValue += f[r - 1][s - possibleItemsDict[r].weight];
        } else {
            includeValue = -Infinity;
        }
        const excludeValue = f[r - 1][s];
        if (includeValue > excludeValue) {
            f[r][s] = includeValue;
            items[r][s] = [...(items[r - 1][s - possibleItemsDict[r].weight] || []), r];
        } else {
            f[r][s] = excludeValue;
            items[r][s] = items[r - 1][s];
        }
    }
    $: cellClass = (ss: number, rr: number) => {
        if (s === 0) {
            return ''
        }
        if (r === n + 1) {
            return ss === b && rr === n ? 'currentCell' : ''
        }
        if (rr === r && ss === s) {
            return 'currentCell'
        }
        if (rr === r - 1 && ss === s) {
            return 'notIncludeCell'
        }
        if (rr === r - 1 && ss === s - possibleItemsDict[r].weight) {
            return 'includeCell'
        }
        return ''
    }
    $: rrLoop = [...Array(n + 1).keys()];
    $: ssLoop = [...Array(b + 1).keys()];
    $: initializing = r + s === 1;
    $: completed = r === n + 1;
</script>

<table class=basicCenter>
    <tr>
        <th>Item</th>
        {#each rrLoop.slice(1) as rr}
            <th>{rr}</th>
        {/each}
    </tr>
    <tr>
        <td>Weight</td>
        {#each rrLoop.slice(1) as rr}
            <td>{possibleItemsDict[rr].weight}</td>
        {/each}
    </tr>
    <tr>
        <td>Value</td>
        {#each rrLoop.slice(1) as rr}
            <td>{possibleItemsDict[rr].value}</td>
        {/each}
    </tr>
</table>
<div style=margin-bottom:calc(0.5*var(--standardFontSize))/>

<table class=basicCenter>
    <tr>
        <th>s</th>
        {#each rrLoop as rr}
            <th><MathInline extraMacros={{'\\frr': `f_{${rr}}`}}>\frr(s)</MathInline></th>
        {/each}
        {#each rrLoop as rr}
            <th><MathInline
                    extraMacros={{'\\srr': `S_{${rr}}`}}
                >\srr(s)
            </MathInline></th>
        {/each}
    </tr>
    {#each ssLoop as ss}
        <tr>
            <td style='font-weight:bold;'>{ss}</td>
            {#each rrLoop as rr}
                <td class={cellClass(ss, rr)}
                >{f[rr][ss] > -Infinity ? f[rr][ss] : '-'}</td>
            {/each}
            {#each rrLoop as rr}
                <td class={cellClass(ss, rr)}
                >
                    {#if !(items[rr] || {})[ss]}
                        -
                    {:else if ((items[rr] || {})[ss] || []).length > 0}
                        <MathInline>{'\\{'}{items[rr][ss]}{'\\}'}</MathInline>
                    {:else}
                        <MathInline>\emptyset</MathInline>
                    {/if}
                </td>
            {/each}
        </tr>
    {/each}
</table>
<div class=buttonDiv>
    <button
        disabled={initializing}
        on:click={lastClick}
    >Last</button>
    <button
        disabled={completed}
        on:click={nextClick}
    >Next</button>
</div>
{#key f}
    {#if initializing}
        Initialize: <MathInline>f_r(s)=0,S_r(s)=\emptyset</MathInline> whenever <MathInline>r=0</MathInline> or <MathInline>s=0</MathInline>.
    {:else if completed}
        <div>
            The algorithm is finished!
        </div>
        <div>
            The optimal subset of items is
            <MathInline
                extraMacros={{'\\snb': `S_{${n}}(${b})`}}
            >\snb={'\\{'}{items[n][b]}{'\\}'}</MathInline>
            with total value <MathInline
                extraMacros={{'\\fnb': `f_{${n}}(${b})`}}>\fnb={f[n][b]}</MathInline>.
        </div>
    {:else}
        <div>
            <MathInline>s={s}</MathInline>, <MathInline>r={r}</MathInline>.
        </div>
        <div>
            {#if s < possibleItemsDict[r].weight}
                <div>
                    <MathInline
                        extraMacros={{'\\w': `w_{${r}}`}}>{'s < \\w'}</MathInline>
                    (item <MathInline>{r}</MathInline> is heavier than weight limit).
                </div>
                <div>
                    Best subset is
                    <MathInline
                        extraMacros={{'\\s': `S_{${r-1}}(${s})`}}>{'\\s'}={'\\{'}{items[r - 1][s]}{'\\}'}</MathInline>
                    with value
                    <MathInline
                        extraMacros={{'\\f': `f_{${r-1}}(${s})`}}>{'\\f'}={f[r - 1][s]}</MathInline>.
                </div>
            {:else}
                <div><MathInline extraMacros={{'\\wr': `w_${r}`}}>{`s - \\wr = ${s - possibleItemsDict[r].weight}`}</MathInline>.</div>
                <div>
                    If item <MathInline>{r}</MathInline> is not included, then the best value is <MathInline
                        extraMacros={{'\\frm': `f_${r-1}`}}>
                        {`\\frm`}({s}) = {`${f[r - 1][s]}`}
                    </MathInline>.
                </div>
                <div>
                    If item <MathInline>{r}</MathInline> is included, then the best value is <MathInline
                        extraMacros={{'\\vr': `v_${r}`}}>
                        {`\\vr`} + f_{r-1}({s - possibleItemsDict[r].weight}) = {`${possibleItemsDict[r].value + f[r - 1][s - possibleItemsDict[r].weight]}`}
                    </MathInline>.
                </div>
                {#if possibleItemsDict[r].value + f[r - 1][s - possibleItemsDict[r].weight] > f[r - 1][s]}
                    <div>Maximum attained when item <MathInline>{r}</MathInline> is included.</div>
                    <div>
                        Best subset is
                        <MathInline
                            extraMacros={{'\\s': `S_{${r-1}}`}}>{`\\s(${s - possibleItemsDict[r].weight})\\cup\\{${r}\\}`}={'\\{'}{items[r][s]}{'\\}'}</MathInline>
                        with value
                        <MathInline
                            extraMacros={{'\\vr': `v_${r}`}}>
                            {`\\vr`} + f_{r-1}({s - possibleItemsDict[r].weight}) = {`${possibleItemsDict[r].value + f[r - 1][s - possibleItemsDict[r].weight]}`}
                        </MathInline>.
                    </div>
                {:else}
                <div>Maximum attained when item <MathInline>{r}</MathInline> is <em>not</em> included.</div>
                    <div>
                        Best subset is
                        <MathInline
                            extraMacros={{'\\s': `S_{${r-1}}(${s})`}}>{'\\s'}={'\\{'}{items[r - 1][s]}{'\\}'}</MathInline>
                        with value
                        <MathInline
                            extraMacros={{'\\f': `f_{${r-1}}(${s})`}}>{'\\f'}={f[r - 1][s]}</MathInline>.
                    </div>
                {/if}
            {/if}
        </div>
    {/if}
{/key}
<div style=margin-bottom:calc(0.5*var(--standardFontSize))/>

<style>
    table {
        border-collapse: collapse;
    }
    th {
        padding: 0 0.5rem;
        border-bottom: 1pt solid black;
    }
    td {
        padding: 0 0.4rem;
        text-align: center;
    }
    .buttonDiv {
        display: flex;
        justify-content: center;
    }
    .currentCell {
        background-color: skyblue;
    }
    .includeCell {
        background-color: orange;
    }
    .notIncludeCell {
        background-color: rgb(142, 218, 175);
    }
</style>