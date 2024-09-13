import { writable, derived, type Writable } from "svelte/store";
import { getCitations } from "./bibUtils";
import { browser } from "$app/environment";

const createStorageSyncedStore = (
  name: string,
  defaultValue: string | number,
  allowedValues: Array<string | number> | undefined = undefined,
) => {
  let currentStorageValue = defaultValue;
  if (browser) {
      currentStorageValue = localStorage.getItem(name) || defaultValue;
      if (typeof(defaultValue) === 'number' && typeof(currentStorageValue) === 'string') {
          currentStorageValue = parseFloat(currentStorageValue);
      }
  }
  if (allowedValues !== undefined){
      if (currentStorageValue === undefined){
          currentStorageValue = defaultValue;
      }
      if (!allowedValues.includes(currentStorageValue)){
          currentStorageValue = defaultValue;
      }
  }
  const storageStore: Writable<string | number> = writable(currentStorageValue);
  if (browser) {
      storageStore.subscribe(val => {
          
          localStorage.setItem(name, val)
      })
  }
  return storageStore
}

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
export const popupsAllowed = writable(true);
export const eqReferenced: Writable<Array<string>> = writable([]);
export const printMode = writable(false);
export const highlightKeyPoints = writable(false);
export const scaleFactor = createStorageSyncedStore('scaleFactor', 1);
export const prePrintScaleFactor = writable(1);
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
    const maxPopupSideWidth = 650;
    const maxNotesLeft = 650;
    let notesWidth = Math.min(notesMaxWidth, $windowInfo.innerWidth - 3 * marginWidth);
    let menuWidth = $showMenu ? openMenuWidth : 0;
    let popupWidth = 0;
    let popupPlacement = 'Center';
    let notesLeft = ($windowInfo.innerWidth - notesWidth) / 2;
    const spaceForSidePopup = $windowInfo.innerWidth - notesWidth - 3 * marginWidth - 2 * popupPadding - menuWidth;
    if ($popupShown) {
      if (spaceForSidePopup >= minPopupSideWidth) {
        popupPlacement = 'Side';
        popupWidth = Math.min(spaceForSidePopup, maxPopupSideWidth);
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
    notesLeft = Math.min(notesLeft, maxNotesLeft)
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
