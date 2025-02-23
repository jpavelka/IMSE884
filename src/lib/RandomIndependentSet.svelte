<script lang="ts">
    import InteractiveIndependentSet from "./InteractiveIndependentSet.svelte";

    let numVertices = 10;
    let nodes = {};
    let edges = [];
    const generateInstance = (n) => {
        nodes = {};
        let i = 0;
        while (i < n) {
            nodes[String.fromCharCode(97 + i)] = Math.ceil(9 * Math.random());
            i++;
        }
        const nodesWithNbrs = new Set();
        edges = [];
        for (const u of Object.keys(nodes)) {
            for (const v of Object.keys(nodes)) {
                if (u < v) {
                    if (Math.random() <= 0.3) {
                        edges.push(`${u},${v}`)
                        nodesWithNbrs.add(u);
                        nodesWithNbrs.add(v);
                    }
                }
            }
        }
        for (const v of Object.keys(nodes)) {
            if (!nodesWithNbrs.has(v)) {
                const others = [...Object.keys(nodes)].filter(u => u !== v);
                const u = others[Math.floor(Math.random() * others.length)];
                edges.push(`${u},${v}`)
                nodesWithNbrs.add(u);
                nodesWithNbrs.add(v);
            }
        }
    }
    generateInstance(numVertices);
</script>

{#key [nodes, edges]}
<InteractiveIndependentSet
    nodes={nodes}
    edges={edges}
    height={400}
    allowDrag={true}
    allowDragNodes={true}
    allowZoom={true}
/>
{/key}
<button on:click={() => generateInstance(numVertices)}>
    New Instance
</button>