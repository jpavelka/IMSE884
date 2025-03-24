import { sections } from "./stores";
import { get, type Writable } from "svelte/store";

export const refNumbering = (refStore: Writable<any>, refId: string, refPre: string) => {
    refId = refPre + ":" + refId;
    const sec = `${get(sections).hierarchy.length}`;
    let secNum = sec;
    if (Object.keys(get(sections).dispSecNums).includes(sec)) {
        secNum = get(sections).dispSecNums[sec];
    }
    if (!Object.keys(get(refStore).secCounts).includes(sec + '')) {
        refStore.update((f) => {
            f.secCounts[sec] = 0;
            return f;
        });
    }
    refStore.update((f) => {
        f.secCounts[sec] += 1;
        return f;
    });
    const eqnNum = secNum + "." + get(refStore).secCounts[sec];
    refStore.update((f) => {
        f.numbers[refId] = eqnNum;
        return f;
    })
    return refId;
}

export const exampleShortestPathNodes = [
    {id: 1, label: 's', x: 0, y: 0.5},
    {id: 2, label: 'a', x: 0.3, y: 1},
    {id: 3, label: 'b', x: 0.3, y: 0},
    {id: 4, label: 'c', x: 0.7, y: 1},
    {id: 5, label: 'd', x: 0.7, y: 0},
    {id: 6, label: 't', x: 1, y: 0.5},
]

export const exampleShortestPathEdges = [
    's-a-3',
    's-b-2',
    'a-c-5',
    'a-d-2',
    'b-d-4',
    'd-c-2',
    'c-t-2',
    'd-t-6'
]

export const maximizePlotlyChartArea = (plotDiv) => {
    const svgs = [...plotDiv.querySelectorAll(".main-svg")];
    for (const el of svgs.slice(1)) {
        if (el.tagName.toLowerCase() == 'svg') {
            el.remove();
        }
    }
    const scene = plotDiv.querySelectorAll(".gl-container")[0].querySelectorAll("#scene")[0];
    scene.style.left = 0;
    scene.style.top = 0;
    scene.style.width = "100%";
    scene.style.height = "100%";
}