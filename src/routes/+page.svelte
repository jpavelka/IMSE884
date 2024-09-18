<script lang="ts">
    import { onMount } from "svelte";
    import TopBar from "$lib/TopBar.svelte";
    import Menu from "$lib/Menu.svelte";
    import {
        showMenu, printMode, windowInfo, layoutInfo, popupShown,
        popupsAllowed, scaleFactor,

        prePrintScaleFactor

    } from "$lib/stores";
    import Sections from "../sections/Sections.svelte";
    import CurrentSectionDisp from "$lib/CurrentSectionDisp.svelte";

    let stillLoading = true;
    let stillScrolling = true;

    const bodyClick = (e: MouseEvent) => {
        let el = e.target as HTMLElement;
        if ($showMenu && el?.id !== 'menuClick' && $layoutInfo.notesLeft < $layoutInfo.menuWidth) {
            while (!['BODY', 'HTML'].includes(el.tagName)) {
                if ([...el.classList].includes('menu')) {
                    return
                }
                el = el?.parentNode as HTMLElement;
            }
            showMenu.update(() => {
                return false
            });
        }
    }
    onMount(() => {
        const { hash } = document.location;
        const scrollTo = hash && document.getElementById(hash.slice(1));
        stillLoading = false;
        setTimeout(() => {
            if (scrollTo) {
                scrollTo.scrollIntoView();
            }
            stillScrolling = false;
        }, 100);
        window.onbeforeprint = () => {
            printMode.update(() => true);
            prePrintScaleFactor.update(() => $scaleFactor)
            scaleFactor.update(f => 0.875);
        }
        window.onafterprint = () => {
            printMode.update(() => false);
            scaleFactor.update(() => $prePrintScaleFactor);
        }
    });
    const standardFontSize = '1.4rem'
    $: {
        try {
            document.getElementsByTagName('html')[0].style.fontSize = `${100 * $scaleFactor}%`
            document.getElementsByTagName('body')[0].style.fontSize = `${standardFontSize}`
            document.getElementsByTagName('body')[0].style.lineHeight = '2.25rem'
        } catch {

        }
    }
    try {
        document.onclick = bodyClick
    } catch {

    }
    let innerWidth = 0;
    let innerHeight = 0;
    let scrollY = 0;
    $: windowInfo.update(w => {
        w.innerWidth = innerWidth;
        w.innerHeight = innerHeight;
        w.scrollY = scrollY;
        return w;
    })
    const closeAllPopups = () => {
        popupsAllowed.update(() => false);
        setTimeout(() => {
            popupsAllowed.update(() => true);
        }, 1000);
    }
</script>

<svelte:window
    bind:innerWidth={innerWidth}
    bind:innerHeight={innerHeight}
    bind:scrollY={scrollY}
/>

<div style="
    --totalWidth: {$windowInfo.innerWidth};
    --notesWidth: {$layoutInfo.notesWidth};
    --menuWidth: {$layoutInfo.menuWidth};
    --marginWidth: {$layoutInfo.marginWidth};
    --notesLeft: {$layoutInfo.notesLeft};
    --popupWidth: {$layoutInfo.popupWidth};
    --popupLeft: {$layoutInfo.popupLeft};
    --popupPadding: {$layoutInfo.popupPadding};
    --standardFontSize: {standardFontSize};
    --scaleFactor: {$scaleFactor};
">
    <div class=allContent>
        {#if stillLoading}
            <div class=loading>
                <div>Your notes are loading.</div>
                <div>Hang in there, this can take some time.</div>
                <div class=loader></div>
            </div>
        {/if}
        <div style={'display:' + (stillLoading ? 'none' : 'block')}>
            <TopBar />
            <div class=underBar style={'visibility:' + (stillScrolling ? 'hidden' : 'visible')}>
                <Menu />
                <CurrentSectionDisp />
                {#if $popupShown && !$printMode && $layoutInfo.popupPlacement === 'Side'}
                    <div
                        class=popupsClose
                        role=button
                        tabindex="0"
                        aria-label="Close popups"
                        on:keydown={(e) => {
                            if (e.key === 'Enter') {
                                closeAllPopups()
                            }
                        }}
                        on:click={closeAllPopups}
                    >
                        Close all popups
                    </div>
                {/if}
                <div class={"notesContent" + ($printMode ? ' notesPrint' : '')}>
                    <Sections />
                    <div class=afterNotes></div>
                </div>
            </div>
            {#if !$printMode}
                <div class=footer>
                    © Copyright 2025, Jeffrey Pavelka
                </div>
            {/if}
        </div>
    </div>
</div>


<style>
    .allContent {
        display: flex;
        flex-direction: column;
    }
    .underBar {
        margin-top: 4rem;
        max-width: var(--totalWidth);
    }
    .notesContent {
        width: calc(var(--notesWidth) * 1px);
        padding: 1rem 0;
        font-family: Georgia, serif;
        height: 100%;
        position: absolute;
        left: calc(var(--notesLeft) * 1px);
        transition: all .5s;
        -webkit-transition: all .5s;
        -moz-transition: all .5s;
        -o-transition: all .5s;
        -ms-transition: all .5s;
    }
    .notesPrint {
        left: auto;
        padding: 4rem;
    }
    .noteContentWithPopup {
        left: 20px;
    }
    .noteContentShifted {
        left: calc(var(--menuWidth) * 1px)
    }
    .loading {
        text-align: center;
        font-size: 1.5rem;
        margin-top: 3rem;
        padding: 1pt;
    }
    :global(img) {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 100%;
    }
    :global(body) {
        margin: 0;
    }
    :global(body *) {
        scroll-margin-top: 8rem;
    }
    :global(.basicCenter) {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        max-width: 90vw;
    }
    @keyframes -global-line-pulse {
        0% {
            stroke-width: 2;
        }
        30% {
            stroke-width: 5;
        }
        60% {
            stroke-width: 2;
        }
    }
    .afterNotes {
        height: 3rem;
    }
    .footer {
        position: fixed;
        bottom: 0;
        text-align: center;
        width: 100%;
        background: white;
        border-top: 1pt solid lightgray;
        font-size: 0.8rem;
    }
    .footerActions {
        float: right;
        padding-right: 1rem;
        font-size: 0.8rem;
        cursor: pointer;
    }
    .loader {
        border: 0.4rem solid #f3f3f3;
        border-radius: 50%;
        border-top: 0.4rem solid #7f7f7f;
        width: 2rem;
        height: 2rem;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
        margin: 1rem auto;
    }
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        33% { transform: rotate(90deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        33% { transform: rotate(90deg); }
        100% { transform: rotate(360deg); }
    }
    .popupsClose {
        position:fixed;
        font-size:calc(0.8 * var(--standardFontSize));
        right:calc(var(--marginWidth)*1pt);
        top: 6rem;
        font-style:italic;
        color:gray;
        cursor:pointer;
    }
</style>
