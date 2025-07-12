// The custom components I create
// using the specialized component-building structures provided
// by frameworks should behave like native HTML elements.
//
// I strive to achieve this behavior as much as possible.
// To this end, I've imported and exported
// the attr types currently used in this app.
//
// Initially, I attempted to use `IntrinsicElementAttributes["..."]`
// within Vue's `IntrinsicElementAttributes`,
// but TypeScript couldn't recognize it.
//
// Importing types directly into each component
// using `import type { ... } from "vue"`
// would have required manual updates for any future changes.
// To avoid this, I centralized all the attrs types in one place.
//
// Furthermore, even if no custom attrs are defined,
// I exported the types for tags like `div` and `header`,
// treating them as aliases to provide added flexibility.

export type { AnchorHTMLAttributes as HtmlAttrs_a } from "vue";
export type { ButtonHTMLAttributes as HtmlAttrs_button } from "vue";
export type { InputHTMLAttributes as HtmlAttrs_input } from "vue";
export type { SelectHTMLAttributes as HtmlAttrs_select } from "vue";
export type { OptionHTMLAttributes as HtmlAttrs_option } from "vue";
export type { LabelHTMLAttributes as HtmlAttrs_label } from "vue";

export type { SVGAttributes as HtmlAttrs_svg } from "vue";
export type { HTMLAttributes as HtmlAttrs_div } from "vue";
export type { HTMLAttributes as HtmlAttrs_header } from "vue";
export type { HTMLAttributes as HtmlAttrs_fieldset } from "vue";
export type { HTMLAttributes as HtmlAttrs_h1 } from "vue";
export type { HTMLAttributes as HtmlAttrs_h2 } from "vue";
export type { HTMLAttributes as HtmlAttrs_h3 } from "vue";
export type { HTMLAttributes as HtmlAttrs_hgroup } from "vue";
export type { HTMLAttributes as HtmlAttrs_main } from "vue";
export type { HTMLAttributes as HtmlAttrs_i } from "vue";
export type { HTMLAttributes as HtmlAttrs_dl } from "vue";
export type { HTMLAttributes as HtmlAttrs_legend } from "vue";

export type { VideoHTMLAttributes as HtmlAttrs_video } from "vue";
export type { DialogHTMLAttributes as HtmlAttrs_dialog } from "vue";
