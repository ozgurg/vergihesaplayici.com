import type { Head, HtmlString, SvgIcon } from "@/types/common.js";

export type BreadcrumbItem = {
    title: string;
    url: URL;
};

export type Breadcrumbs = BreadcrumbItem[];


export type Page = {
    id: Lowercase<string>;
    title: string;
    url: ReturnType<typeof siteUrl>;
    breadcrumbs: Breadcrumbs;
    head: Head;
};

export type PageDef = () => Page;


export type CalculatorPage = Page & {
    shortTitle: string;
    icon: SvgIcon;
    summary: HtmlString;
};

export type CalculatorPageDef = () => CalculatorPage;
