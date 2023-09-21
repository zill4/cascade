import { IVirtualNodeProps } from '../dom/IVirtualNode';
export declare namespace Elements {
    interface BaseNode {
        nodeValue?: string;
        textContent?: string;
        [name: string]: any;
    }
    interface BaseElement extends BaseNode, IVirtualNodeProps {
        className?: string;
        id?: string;
        msContentZoomFactor?: number;
        onariarequest?: (ev?: Event) => any;
        oncommand?: (ev?: Event) => any;
        ongotpointercapture?: (ev?: PointerEvent) => any;
        onlostpointercapture?: (ev?: PointerEvent) => any;
        onmsgotpointercapture?: (ev?: PointerEvent) => any;
        onmslostpointercapture?: (ev?: PointerEvent) => any;
        onmspointercancel?: (ev?: PointerEvent) => any;
        onmspointerdown?: (ev?: PointerEvent) => any;
        onmspointerenter?: (ev?: PointerEvent) => any;
        onmspointerleave?: (ev?: PointerEvent) => any;
        onmspointermove?: (ev?: PointerEvent) => any;
        onmspointerout?: (ev?: PointerEvent) => any;
        onmspointerover?: (ev?: PointerEvent) => any;
        onmspointerup?: (ev?: PointerEvent) => any;
        ontouchcancel?: (ev?: TouchEvent) => any;
        ontouchend?: (ev?: TouchEvent) => any;
        ontouchmove?: (ev?: TouchEvent) => any;
        ontouchstart?: (ev?: TouchEvent) => any;
        onwebkitfullscreenchange?: (ev?: Event) => any;
        onwebkitfullscreenerror?: (ev?: Event) => any;
        scrollLeft?: number;
        scrollTop?: number;
        innerHTML?: string;
    }
    interface JSXElement extends BaseElement {
        accessKey?: string;
        contentEditable?: string;
        dir?: string;
        draggable?: boolean;
        hidden?: boolean;
        hideFocus?: boolean;
        innerHTML?: string;
        innerText?: string;
        lang?: string;
        onabort?: (ev?: UIEvent) => any;
        onactivate?: (ev?: UIEvent) => any;
        onbeforeactivate?: (ev?: UIEvent) => any;
        onbeforecopy?: (ev?: ClipboardEvent) => any;
        onbeforecut?: (ev?: ClipboardEvent) => any;
        onbeforedeactivate?: (ev?: UIEvent) => any;
        onbeforepaste?: (ev?: ClipboardEvent) => any;
        onblur?: (ev?: FocusEvent) => any;
        oncanplay?: (ev?: Event) => any;
        oncanplaythrough?: (ev?: Event) => any;
        onchange?: (ev?: Event) => any;
        onclick?: (ev?: MouseEvent) => any;
        oncontextmenu?: (ev?: PointerEvent) => any;
        oncopy?: (ev?: ClipboardEvent) => any;
        oncuechange?: (ev?: Event) => any;
        oncut?: (ev?: ClipboardEvent) => any;
        ondblclick?: (ev?: MouseEvent) => any;
        ondeactivate?: (ev?: UIEvent) => any;
        ondrag?: (ev?: DragEvent) => any;
        ondragend?: (ev?: DragEvent) => any;
        ondragenter?: (ev?: DragEvent) => any;
        ondragleave?: (ev?: DragEvent) => any;
        ondragover?: (ev?: DragEvent) => any;
        ondragstart?: (ev?: DragEvent) => any;
        ondrop?: (ev?: DragEvent) => any;
        ondurationchange?: (ev?: Event) => any;
        onemptied?: (ev?: Event) => any;
        onerror?: (ev?: ErrorEvent) => any;
        onfocus?: (ev?: FocusEvent) => any;
        oninput?: (ev?: Event) => any;
        oninvalid?: (ev?: Event) => any;
        onkeydown?: (ev?: KeyboardEvent) => any;
        onkeypress?: (ev?: KeyboardEvent) => any;
        onkeyup?: (ev?: KeyboardEvent) => any;
        onload?: (ev?: Event) => any;
        onloadeddata?: (ev?: Event) => any;
        onloadedmetadata?: (ev?: Event) => any;
        onloadstart?: (ev?: Event) => any;
        onmousedown?: (ev?: MouseEvent) => any;
        onmouseenter?: (ev?: MouseEvent) => any;
        onmouseleave?: (ev?: MouseEvent) => any;
        onmousemove?: (ev?: MouseEvent) => any;
        onmouseout?: (ev?: MouseEvent) => any;
        onmouseover?: (ev?: MouseEvent) => any;
        onmouseup?: (ev?: MouseEvent) => any;
        onmousewheel?: (ev?: WheelEvent) => any;
        onmscontentzoom?: (ev?: UIEvent) => any;
        onmsmanipulationstatechanged?: (ev?: Event) => any;
        onpaste?: (ev?: ClipboardEvent) => any;
        onpause?: (ev?: Event) => any;
        onplay?: (ev?: Event) => any;
        onplaying?: (ev?: Event) => any;
        onprogress?: (ev?: ProgressEvent) => any;
        onratechange?: (ev?: Event) => any;
        onreset?: (ev?: Event) => any;
        onscroll?: (ev?: UIEvent) => any;
        onseeked?: (ev?: Event) => any;
        onseeking?: (ev?: Event) => any;
        onselect?: (ev?: UIEvent) => any;
        onselectstart?: (ev?: Event) => any;
        onstalled?: (ev?: Event) => any;
        onsubmit?: (ev?: Event) => any;
        onsuspend?: (ev?: Event) => any;
        ontimeupdate?: (ev?: Event) => any;
        onvolumechange?: (ev?: Event) => any;
        onwaiting?: (ev?: Event) => any;
        outerHTML?: string;
        outerText?: string;
        spellcheck?: boolean;
        style?: string | Partial<CSSStyleDeclaration>;
        tabIndex?: number;
        title?: string;
    }
    interface JSXSVGElement extends BaseElement {
        onclick?: (ev?: MouseEvent) => any;
        ondblclick?: (ev?: MouseEvent) => any;
        onfocusin?: (ev?: FocusEvent) => any;
        onfocusout?: (ev?: FocusEvent) => any;
        onload?: (ev?: Event) => any;
        onmousedown?: (ev?: MouseEvent) => any;
        onmousemove?: (ev?: MouseEvent) => any;
        onmouseout?: (ev?: MouseEvent) => any;
        onmouseover?: (ev?: MouseEvent) => any;
        onmouseup?: (ev?: MouseEvent) => any;
        xmlbase?: string;
        className?: any;
    }
    interface JSXAnchorElement extends JSXElement {
        Methods?: string;
        charset?: string;
        coords?: string;
        hash?: string;
        host?: string;
        hostname?: string;
        href?: string;
        hreflang?: string;
        mimeType?: string;
        name?: string;
        nameProp?: string;
        pathname?: string;
        port?: string;
        protocol?: string;
        protocolLong?: string;
        rel?: string;
        rev?: string;
        search?: string;
        shape?: string;
        target?: string;
        text?: string;
        type?: string;
        urn?: string;
    }
    interface JSXAppletElement extends JSXElement {
        BaseHref?: string;
        align?: string;
        alt?: string;
        altHtml?: string;
        archive?: string;
        border?: string;
        code?: string;
        codeBase?: string;
        codeType?: string;
        contentDocument?: Document;
        data?: string;
        declare?: boolean;
        form?: string;
        height?: string;
        hspace?: number;
        name?: string;
        object?: string;
        standby?: string;
        type?: string;
        useMap?: string;
        vspace?: number;
        width?: number;
    }
    interface JSXAreaElement extends JSXElement {
        alt?: string;
        coords?: string;
        hash?: string;
        host?: string;
        hostname?: string;
        href?: string;
        noHref?: boolean;
        pathname?: string;
        port?: string;
        protocol?: string;
        rel?: string;
        search?: string;
        shape?: string;
        target?: string;
    }
    interface JSXAudioElement extends JSXMediaElement {
    }
    interface JSXBRElement extends JSXElement {
        clear?: string;
    }
    interface JSXBaseElement extends JSXElement {
        href?: string;
        target?: string;
    }
    interface JSXBaseFontElement extends JSXElement {
        face?: string;
        size?: number;
    }
    interface JSXBlockElement extends JSXElement {
        cite?: string;
        clear?: string;
        width?: number;
    }
    interface JSXBodyElement extends JSXElement {
        aLink?: any;
        background?: string;
        bgColor?: any;
        bgProperties?: string;
        link?: any;
        noWrap?: boolean;
        onafterprint?: (ev?: Event) => any;
        onbeforeprint?: (ev?: Event) => any;
        onbeforeunload?: (ev?: BeforeUnloadEvent) => any;
        onblur?: (ev?: FocusEvent) => any;
        onerror?: (ev?: Event) => any;
        onfocus?: (ev?: FocusEvent) => any;
        onhashchange?: (ev?: HashChangeEvent) => any;
        onload?: (ev?: Event) => any;
        onmessage?: (ev?: MessageEvent) => any;
        onoffline?: (ev?: Event) => any;
        ononline?: (ev?: Event) => any;
        onorientationchange?: (ev?: Event) => any;
        onpagehide?: (ev?: PageTransitionEvent) => any;
        onpageshow?: (ev?: PageTransitionEvent) => any;
        onpopstate?: (ev?: PopStateEvent) => any;
        onresize?: (ev?: UIEvent) => any;
        onstorage?: (ev?: StorageEvent) => any;
        onunload?: (ev?: Event) => any;
        text?: any;
        vLink?: any;
    }
    interface JSXButtonElement extends JSXElement {
        autofocus?: boolean;
        disabled?: boolean;
        form?: string;
        formAction?: string;
        formEnctype?: string;
        formMethod?: string;
        formNoValidate?: string;
        formTarget?: string;
        name?: string;
        status?: any;
        type?: string;
        validationMessage?: string;
        validity?: ValidityState;
        value?: string;
        willValidate?: boolean;
    }
    interface JSXCanvasElement extends JSXElement {
        height?: number;
        width?: number;
    }
    interface JSXDataElement extends JSXElement {
        value?: string;
    }
    interface JSXDDElement extends JSXElement {
        noWrap?: boolean;
    }
    interface JSXDetailsElement extends JSXElement {
        open?: boolean;
    }
    interface JSXDListElement extends JSXElement {
        compact?: boolean;
    }
    interface JSXDTElement extends JSXElement {
        noWrap?: boolean;
    }
    interface JSXDataListElement extends JSXElement {
        options?: HTMLCollection;
    }
    interface JSXDirectoryElement extends JSXElement {
        compact?: boolean;
    }
    interface JSXDivElement extends JSXElement {
        align?: string;
        noWrap?: boolean;
    }
    interface JSXEmbedElement extends JSXElement {
        height?: string;
        hidden?: any;
        msPlayToDisabled?: boolean;
        msPlayToPreferredSourceUri?: string;
        msPlayToPrimary?: boolean;
        msPlayToSource?: any;
        name?: string;
        palette?: string;
        pluginspage?: string;
        readyState?: string;
        src?: string;
        units?: string;
        width?: string;
    }
    interface JSXFieldSetElement extends JSXElement {
        align?: string;
        disabled?: boolean;
        form?: string;
        validationMessage?: string;
        validity?: ValidityState;
        willValidate?: boolean;
    }
    interface JSXFontElement extends JSXElement {
        face?: string;
    }
    interface JSXFormElement extends JSXElement {
        acceptCharset?: string;
        action?: string;
        autocomplete?: string;
        elements?: HTMLCollection;
        encoding?: string;
        enctype?: string;
        length?: number;
        method?: string;
        name?: string;
        noValidate?: boolean;
        target?: string;
    }
    interface JSXFrameElement extends JSXElement {
        border?: string;
        borderColor?: any;
        contentDocument?: Document;
        contentWindow?: Window;
        frameBorder?: string;
        frameSpacing?: any;
        height?: string | number;
        longDesc?: string;
        marginHeight?: string;
        marginWidth?: string;
        name?: string;
        noResize?: boolean;
        onload?: (ev?: Event) => any;
        scrolling?: string;
        security?: any;
        src?: string;
        width?: string | number;
    }
    interface JSXFrameSetElement extends JSXElement {
        border?: string;
        borderColor?: any;
        cols?: string;
        frameBorder?: string;
        frameSpacing?: any;
        name?: string;
        onafterprint?: (ev?: Event) => any;
        onbeforeprint?: (ev?: Event) => any;
        onbeforeunload?: (ev?: BeforeUnloadEvent) => any;
        onblur?: (ev?: FocusEvent) => any;
        onerror?: (ev?: Event) => any;
        onfocus?: (ev?: FocusEvent) => any;
        onhashchange?: (ev?: HashChangeEvent) => any;
        onload?: (ev?: Event) => any;
        onmessage?: (ev?: MessageEvent) => any;
        onoffline?: (ev?: Event) => any;
        ononline?: (ev?: Event) => any;
        onorientationchange?: (ev?: Event) => any;
        onpagehide?: (ev?: PageTransitionEvent) => any;
        onpageshow?: (ev?: PageTransitionEvent) => any;
        onresize?: (ev?: UIEvent) => any;
        onstorage?: (ev?: StorageEvent) => any;
        onunload?: (ev?: Event) => any;
        rows?: string;
    }
    interface JSXHRElement extends JSXElement {
        align?: string;
        noShade?: boolean;
        width?: number;
    }
    interface JSXHeadElement extends JSXElement {
        profile?: string;
    }
    interface JSXHeadingElement extends JSXElement {
        align?: string;
        clear?: string;
    }
    interface JSXHtmlElement extends JSXElement {
        version?: string;
    }
    interface JSXIFrameElement extends JSXElement {
        align?: string;
        allowFullscreen?: boolean;
        border?: string;
        contentDocument?: Document;
        contentWindow?: Window;
        frameBorder?: string;
        frameSpacing?: any;
        height?: string;
        hspace?: number;
        longDesc?: string;
        marginHeight?: string;
        marginWidth?: string;
        name?: string;
        noResize?: boolean;
        onload?: (ev?: Event) => any;
        sandbox?: DOMTokenList;
        scrolling?: string;
        security?: any;
        src?: string;
        vspace?: number;
        width?: string;
    }
    interface JSXImageElement extends JSXElement {
        align?: string;
        alt?: string;
        border?: string;
        complete?: boolean;
        crossOrigin?: string;
        currentSrc?: string;
        height?: number;
        hspace?: number;
        isMap?: boolean;
        longDesc?: string;
        msPlayToDisabled?: boolean;
        msPlayToPreferredSourceUri?: string;
        msPlayToPrimary?: boolean;
        msPlayToSource?: any;
        name?: string;
        naturalHeight?: number;
        naturalWidth?: number;
        src?: string;
        srcset?: string;
        useMap?: string;
        vspace?: number;
        width?: number;
        x?: number;
        y?: number;
    }
    interface JSXInputElement extends JSXElement {
        accept?: string;
        align?: string;
        alt?: string;
        autocomplete?: string;
        autofocus?: boolean;
        border?: string;
        checked?: boolean;
        complete?: boolean;
        defaultChecked?: boolean;
        defaultValue?: string;
        disabled?: boolean;
        files?: FileList;
        form?: string;
        formAction?: string;
        formEnctype?: string;
        formMethod?: string;
        formNoValidate?: string;
        formTarget?: string;
        height?: string;
        hspace?: number;
        indeterminate?: boolean;
        list?: HTMLElement;
        max?: string;
        maxLength?: number;
        min?: string;
        multiple?: boolean;
        name?: string;
        pattern?: string;
        placeholder?: string;
        readOnly?: boolean;
        required?: boolean;
        selectionEnd?: number;
        selectionStart?: number;
        size?: number;
        src?: string;
        status?: boolean;
        step?: string;
        type?: string;
        useMap?: string;
        validationMessage?: string;
        validity?: ValidityState;
        value?: string;
        valueAsDate?: Date;
        valueAsNumber?: number;
        vspace?: number;
        width?: string;
        willValidate?: boolean;
    }
    interface JSXIsIndexElement extends JSXElement {
        action?: string;
        form?: string;
        prompt?: string;
    }
    interface JSXKeygenElement extends JSXElement {
        autofocus?: boolean;
        challenge?: string;
        disabled?: boolean;
        form?: string;
        keytype?: string;
        name?: string;
        type?: string;
        willValidate?: boolean;
    }
    interface JSXLIElement extends JSXElement {
        type?: string;
        value?: number;
    }
    interface JSXLabelElement extends JSXElement {
        form?: string;
        htmlFor?: string;
    }
    interface JSXLegendElement extends JSXElement {
        align?: string;
        form?: string;
    }
    interface JSXLinkElement extends JSXElement {
        charset?: string;
        disabled?: boolean;
        href?: string;
        hreflang?: string;
        media?: string;
        rel?: string;
        rev?: string;
        target?: string;
        type?: string;
    }
    interface JSXMapElement extends JSXElement {
        areas?: HTMLCollection;
        name?: string;
    }
    interface JSXMarqueeElement extends JSXElement {
        behavior?: string;
        bgColor?: any;
        direction?: string;
        height?: string;
        hspace?: number;
        loop?: number;
        onbounce?: (ev?: Event) => any;
        onfinish?: (ev?: Event) => any;
        onstart?: (ev?: Event) => any;
        scrollAmount?: number;
        scrollDelay?: number;
        trueSpeed?: boolean;
        vspace?: number;
        width?: string;
    }
    interface JSXMediaElement extends JSXElement {
        autoplay?: boolean;
        buffered?: TimeRanges;
        controls?: boolean;
        currentSrc?: string;
        currentTime?: number;
        defaultMuted?: boolean;
        defaultPlaybackRate?: number;
        duration?: number;
        ended?: boolean;
        error?: MediaError;
        loop?: boolean;
        msAudioCategory?: string;
        msAudioDeviceType?: string;
        msKeys?: MediaKeys;
        msPlayToDisabled?: boolean;
        msPlayToPreferredSourceUri?: string;
        msPlayToPrimary?: boolean;
        msPlayToSource?: any;
        msRealTime?: boolean;
        muted?: boolean;
        networkState?: number;
        onmsneedkey?: (ev?: MediaKeyMessageEvent) => any;
        paused?: boolean;
        playbackRate?: number;
        played?: TimeRanges;
        preload?: string;
        readyState?: number;
        seekable?: TimeRanges;
        seeking?: boolean;
        src?: string;
        textTracks?: TextTrackList;
        volume?: number;
        HAVE_CURRENT_DATA?: number;
        HAVE_ENOUGH_DATA?: number;
        HAVE_FUTURE_DATA?: number;
        HAVE_METADATA?: number;
        HAVE_NOTHING?: number;
        NETWORK_EMPTY?: number;
        NETWORK_IDLE?: number;
        NETWORK_LOADING?: number;
        NETWORK_NO_SOURCE?: number;
    }
    interface JSXMenuElement extends JSXElement {
        compact?: boolean;
        type?: string;
    }
    interface JSXMetaElement extends JSXElement {
        charset?: string;
        content?: string;
        httpEquiv?: string;
        name?: string;
        scheme?: string;
        url?: string;
    }
    interface JSXMeterElement extends JSXElement {
        high?: number;
        low?: number;
        max?: number;
        min?: number;
        optimum?: number;
        labels?: string;
    }
    interface JSXModElement extends JSXElement {
        cite?: string;
        dateTime?: string;
    }
    interface JSXNextIdElement extends JSXElement {
        n?: string;
    }
    interface JSXOListElement extends JSXElement {
        compact?: boolean;
        start?: number;
        type?: string;
    }
    interface JSXObjectElement extends JSXElement {
        BaseHref?: string;
        align?: string;
        alt?: string;
        altHtml?: string;
        archive?: string;
        border?: string;
        code?: string;
        codeBase?: string;
        codeType?: string;
        contentDocument?: Document;
        data?: string;
        declare?: boolean;
        form?: string;
        height?: string;
        hspace?: number;
        msPlayToDisabled?: boolean;
        msPlayToPreferredSourceUri?: string;
        msPlayToPrimary?: boolean;
        msPlayToSource?: any;
        name?: string;
        object?: any;
        readyState?: number;
        standby?: string;
        type?: string;
        useMap?: string;
        validationMessage?: string;
        validity?: ValidityState;
        vspace?: number;
        width?: string;
        willValidate?: boolean;
    }
    interface JSXOptGroupElement extends JSXElement {
        defaultSelected?: boolean;
        disabled?: boolean;
        form?: string;
        index?: number;
        label?: string;
        selected?: boolean;
        text?: string;
        value?: string;
    }
    interface JSXOptionElement extends JSXElement {
        defaultSelected?: boolean;
        disabled?: boolean;
        form?: string;
        index?: number;
        label?: string;
        selected?: boolean;
        text?: string;
        value?: string;
    }
    interface JSXOutputElement extends JSXElement {
        defaultValue?: string;
        form?: string;
        labels?: string;
        name?: string;
        type?: string;
        validationMessage?: string;
        validity?: ValidityState;
        value?: string;
        willValidate?: boolean;
    }
    interface JSXParagraphElement extends JSXElement {
        align?: string;
        clear?: string;
    }
    interface JSXParamElement extends JSXElement {
        name?: string;
        type?: string;
        value?: string;
        valueType?: string;
    }
    interface JSXPhraseElement extends JSXElement {
        cite?: string;
        dateTime?: string;
    }
    interface JSXPreElement extends JSXElement {
        cite?: string;
        clear?: string;
        width?: number;
    }
    interface JSXProgressElement extends JSXElement {
        form?: string;
        max?: number;
        position?: number;
        value?: number;
    }
    interface JSXQuoteElement extends JSXElement {
        cite?: string;
        dateTime?: string;
    }
    interface JSXScriptElement extends JSXElement {
        async?: boolean;
        charset?: string;
        defer?: boolean;
        event?: string;
        htmlFor?: string;
        src?: string;
        text?: string;
        type?: string;
    }
    interface JSXSelectElement extends JSXElement {
        autofocus?: boolean;
        disabled?: boolean;
        form?: string;
        length?: number;
        multiple?: boolean;
        name?: string;
        options?: HTMLCollection;
        required?: boolean;
        selectedIndex?: number;
        size?: number;
        type?: string;
        validationMessage?: string;
        validity?: ValidityState;
        value?: string;
        willValidate?: boolean;
        selectedOptions?: HTMLCollection;
    }
    interface JSXSourceElement extends JSXElement {
        media?: string;
        msKeySystem?: string;
        src?: string;
        type?: string;
    }
    interface JSXSpanElement extends JSXElement {
    }
    interface JSXStyleElement extends JSXElement {
        media?: string;
        type?: string;
    }
    interface JSXTableCaptionElement extends JSXElement {
        align?: string;
        vAlign?: string;
    }
    interface JSXTableAlignment {
        ch?: string;
        chOff?: string;
        vAlign?: string;
    }
    interface JSXTableCellElement extends JSXElement, JSXTableAlignment {
        abbr?: string;
        align?: string;
        axis?: string;
        bgColor?: any;
        cellIndex?: number;
        colSpan?: number;
        headers?: string;
        height?: any;
        noWrap?: boolean;
        rowSpan?: number;
        scope?: string;
        width?: string;
    }
    interface JSXTableColElement extends JSXElement, JSXTableAlignment {
        align?: string;
        span?: number;
        width?: any;
    }
    interface JSXTableDataCellElement extends JSXTableCellElement {
    }
    interface JSXTableElement extends JSXElement {
        align?: string;
        bgColor?: any;
        border?: string;
        borderColor?: any;
        caption?: HTMLTableCaptionElement;
        cellPadding?: string;
        cellSpacing?: string;
        cols?: number;
        frame?: string;
        height?: any;
        rows?: HTMLCollection;
        rules?: string;
        summary?: string;
        tBodies?: HTMLCollection;
        tFoot?: HTMLTableSectionElement;
        tHead?: HTMLTableSectionElement;
        width?: string;
    }
    interface JSXTableHeaderCellElement extends JSXTableCellElement {
        scope?: string;
    }
    interface JSXTableRowElement extends JSXElement, JSXTableAlignment {
        align?: string;
        bgColor?: any;
        cells?: HTMLCollection;
        height?: any;
        rowIndex?: number;
        sectionRowIndex?: number;
    }
    interface JSXTableSectionElement extends JSXElement, JSXTableAlignment {
        align?: string;
        rows?: HTMLCollection;
    }
    interface JSXTextAreaElement extends JSXElement {
        autofocus?: boolean;
        cols?: number;
        defaultValue?: string;
        disabled?: boolean;
        form?: string;
        maxLength?: number;
        name?: string;
        placeholder?: string;
        readOnly?: boolean;
        required?: boolean;
        rows?: number;
        selectionEnd?: number;
        selectionStart?: number;
        status?: any;
        type?: string;
        validationMessage?: string;
        validity?: ValidityState;
        value?: string;
        willValidate?: boolean;
        wrap?: string;
    }
    interface JSXTimeElement extends JSXElement {
        dateTime?: string;
    }
    interface JSXTitleElement extends JSXElement {
        text?: string;
    }
    interface JSXTrackElement extends JSXElement {
        default?: boolean;
        kind?: string;
        label?: string;
        readyState?: number;
        src?: string;
        srclang?: string;
        track?: TextTrack;
        ERROR?: number;
        LOADED?: number;
        LOADING?: number;
        NONE?: number;
    }
    interface JSXUListElement extends JSXElement {
        compact?: boolean;
        type?: string;
    }
    interface JSXUnknownElement extends JSXElement {
    }
    interface JSXVideoElement extends JSXMediaElement {
        height?: number;
        msHorizontalMirror?: boolean;
        msIsLayoutOptimalForPlayback?: boolean;
        msIsStereo3D?: boolean;
        msStereo3DPackingMode?: string;
        msStereo3DRenderMode?: string;
        msZoom?: boolean;
        onMSVideoFormatChanged?: (ev?: Event) => any;
        onMSVideoFrameStepCompleted?: (ev?: Event) => any;
        onMSVideoOptimalLayoutChanged?: (ev?: Event) => any;
        poster?: string;
        videoHeight?: number;
        videoWidth?: number;
        webkitDisplayingFullscreen?: boolean;
        webkitSupportsFullscreen?: boolean;
        width?: number;
    }
}
//# sourceMappingURL=Elements.d.ts.map