import { readable, writable, type Writable } from "svelte/store";
import { getCitations } from "./bibUtils";

const sections: Writable<{
  hierarchy: Array<any>,
  numbers: {[key: string]: string},
  numRefs: {[key: string]: number},
  returnIds: {[key: string]: string},
  headingTexts: {[key: string]: string},
  dispSecNums: {[key: string]: string},
  contexts: {[key: string]: string}
}> = writable({
  hierarchy: [],
  numbers: {},
  numRefs: {},
  returnIds: {},
  headingTexts: {},
  dispSecNums: {},
  contexts: {}
});

const figures: Writable<{
  secCounts: {[key: string]: number},
  numbers: {[key: string]: string},
  numRefs: {[key: string]: number},
  returnIds: {[key: string]: string}
}> = writable({
  secCounts: {},
  numbers: {},
  numRefs: {},
  returnIds: {}
})

const equations: Writable<{
  secCounts: {[key: string]: number},
  numbers: {[key: string]: string},
  numRefs: {[key: string]: number},
  returnIds: {[key: string]: string},
  names: {[key: string]: string}
}> = writable({
  secCounts: {},
  numbers: {},
  numRefs: {},
  returnIds: {},
  names: {}
})

const problems: Writable<{
  numRefs: {[key: string]: number},
  returnIds: {[key: string]: string},
  names: {[key: string]: HTMLElement},
  abbrevs: {[key: string]: HTMLElement}
}> = writable({
  numRefs: {},
  returnIds: {},
  names: {},
  abbrevs: {}
})

const definitions: Writable<{
  plainText: {[key: string]: string}
}> = writable({
  plainText: {}
})

const notebooks: Writable<{
  secCounts: {[key: string]: number},
  numbers: {[key: string]: string},
  numRefs: {[key: string]: number},
  returnIds: {[key: string]: string},
}> = writable({
  secCounts: {},
  numbers: {},
  numRefs: {},
  returnIds: {}
})

const theorems: Writable<{
  secCounts: {[key: string]: number},
  numbers: {[key: string]: string},
  numRefs: {[key: string]: number},
  returnIds: {[key: string]: string},
  thmTypes: {[key: string]: string}
}> = writable({
  secCounts: {},
  numbers: {},
  numRefs: {},
  returnIds: {},
  thmTypes: {}
})

const citations = writable(await getCitations());
const showMenu = writable(false);
const popupShown = writable(false);
const notesMaxWidth = readable(800);
const tocWidth = readable(350);
const minPopupSideWidth = readable(400);
const eqReferenced: Writable<Array<string>> = writable([]);
const printMode = writable(false);
const highlightKeyPoints = writable(false);

export {
  sections, citations, figures, equations, showMenu, notebooks,
  theorems, popupShown, notesMaxWidth, tocWidth, eqReferenced,
  minPopupSideWidth, printMode, highlightKeyPoints, problems,
  definitions
}
