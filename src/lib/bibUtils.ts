import { Cite } from "@citation-js/core";
import { plugins } from '@citation-js/core';
import * as bibtexPlugin from '@citation-js/plugin-bibtex';
import * as cslPlugin from '@citation-js/plugin-csl';
import bibtex from "../bibtex";
import bibExtras from "../bibExtras";

const getCitations = async () => {
    const citationsData = await Cite(bibtex);

    const citationsObj: { [key: string]: any } = {};
    for (const d of citationsData.data) {
        const c = Cite(d);
        const biblio = c.format('bibliography');
        
        let words = biblio.split(' ');  
        for (const i in words) {
            let word = words[i];
            if (word.startsWith('http')) {
            words[i] = `<a href=${word} target='_blank'>${word}</a>`;
            }
        }
        citationsObj[d.id] = {
            refStr: c.format('citation'),
            biblio: words.join(' '),
            referenced: false
        }
        citationsObj[d.id] = {...citationsObj[d.id], ...bibExtras[d.id]};
    }
    return citationsObj
}

export { getCitations }