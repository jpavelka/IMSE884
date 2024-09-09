import { sections } from "./stores";
import { get, type Writable } from "svelte/store";

const refNumbering = (refStore: Writable<any>, refId: string, refPre: string) => {
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

export { refNumbering }