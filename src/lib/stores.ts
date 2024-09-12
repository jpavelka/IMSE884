import { readable, writable, derived, type Writable } from "svelte/store";
import { getCitations } from "./bibUtils";

export const sections: Writable<{
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

export const figures: Writable<{
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

export const equations: Writable<{
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

export const problems: Writable<{
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

export const definitions: Writable<{
  plainText: {[key: string]: string}
}> = writable({
  plainText: {}
})

export const notebooks: Writable<{
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

export const theorems: Writable<{
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

export const citations = writable(await getCitations());
export const showMenu = writable(false);
export const popupShown = writable(false);
export const eqReferenced: Writable<Array<string>> = writable([]);
export const printMode = writable(false);
export const highlightKeyPoints = writable(false);
export const windowInfo = writable({
  innerWidth: 0,
  innerHeight: 0,
  scrollY: 0
})
export const layoutInfo = derived(
  [windowInfo, showMenu, popupShown],
  ([$windowInfo, $showMenu, $popupShown]) => {
    const marginWidth = 20;
    const popupPadding = 16;
    const notesMaxWidth = 800;
    const openMenuWidth = 350;
    const minPopupSideWidth = 350;
    let notesWidth = Math.min(notesMaxWidth, $windowInfo.innerWidth - 3 * marginWidth);
    let menuWidth = $showMenu ? openMenuWidth : 0;
    let popupWidth = 0;
    let popupPlacement = 'Center';
    let notesLeft = ($windowInfo.innerWidth - notesWidth) / 2;
    const spaceForSidePopup = $windowInfo.innerWidth - notesWidth - 3 * marginWidth - 2 * popupPadding - menuWidth;
    if ($popupShown) {
      if (spaceForSidePopup >= minPopupSideWidth) {
        popupPlacement = 'Side';
        popupWidth = spaceForSidePopup;
        notesLeft = marginWidth;
      } else {
        popupWidth = 0.85 * notesWidth;
      }
    }
    const spaceForMenu = $windowInfo.innerWidth - notesWidth - (popupPlacement === 'Side' ? 1 : 0) * (popupWidth - marginWidth);
    if ($showMenu) {
      if (spaceForMenu > menuWidth) {
        notesLeft = menuWidth + (spaceForMenu - menuWidth - 2 * marginWidth) / 2;
      } else {
        notesLeft = Math.max(spaceForMenu / 2, $windowInfo.innerWidth - notesWidth - 2 * marginWidth);
      }
    }
    return {
      notesWidth: notesWidth,
      menuWidth: menuWidth,
      popupWidth: popupWidth,
      popupPlacement: popupPlacement,
      popupLeft: notesWidth,
      popupPadding: popupPadding,
      marginWidth: marginWidth,
      notesLeft: notesLeft,
    }
  }
)
