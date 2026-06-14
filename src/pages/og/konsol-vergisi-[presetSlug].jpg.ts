import type { APIRoute } from "astro";
import type { PageSlug } from "@/types/page-def.js";
import logoSvgBase64 from "@/assets/img/logo.svg?inline";
import {
    getPresetBySlug,
    getPresetsForAllBrands
} from "@/domains/konsol-vergisi/db.js";
import { KonsolVergisiPageDef } from "@/domains/konsol-vergisi/page-def.js";

const page = KonsolVergisiPageDef();

export const GET: APIRoute = async ({ params }): Promise<Response> => {
    const preset = getPresetBySlug(params.presetSlug as PageSlug);
    const thumb = getThumbByFileName(preset.thumb);

    const {
        debug,
        size,
        fonts,
        build
    } = await ogImage();

    //language=HTML
    return build(`
        <style>
            .debug {
                position: absolute;
                inset: auto;
                display: ${debug ? "flex" : "none"};
                background: red;
                opacity: .5;
                width: ${size.height}px;
                height: ${size.height}px
            }

            .og-image {
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-flow: column wrap;
                height: 100%;
                width: 100%;
                background: linear-gradient(-45deg, #00262c, #113733)
            }

            .og-image-body {
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 32px;
                margin-top: 72px;
                width: ${size.height}px; /* Some sites show "og:image" as square, so let's fix ours to be square to play it safe */
                flex: 1
            }

            .og-image-footer {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                border-top: 1px solid rgba(255, 255, 255, .12);
                width: 100%;
                height: 80px;
                background: rgba(0, 0, 0, .25)
            }

            .og-image-footer img {
                height: 48px
            }

            .thumb {
                display: flex
            }

            .thumb img {
                object-fit: contain;
                height: 150px
            }

            .title {
                color: hsl(${thumb.color.hsl.h}deg, 100%, 94%);
                font-family: "${fonts.bold.name}";
                text-wrap: balance;
                margin-top: 24px;
                font-size: 42px;
                font-weight: 700
            }

            .calculator {
                font-family: "${fonts.normal.name}";
                margin-top: 40px;
                padding: 4px 16px;
                font-weight: 500;
                border-radius: 32px;
                background: #88df95;
                color: #00262c;
                font-size: 26px
            }
        </style>

        <div class="og-image">
            <div class="debug"></div>
            <div class="og-image-body">
                <div class="thumb">
                    <img src="${await thumb.base64}" />
                </div>
                <div class="title">${preset.pageTitle}</div>
                <div class="calculator">${page.title}</div>
            </div>
            <div class="og-image-footer">
                <img src="${logoSvgBase64}" />
            </div>
        </div>
    `);
};

export const getStaticPaths = (): object => {
    return getPresetsForAllBrands().map(_preset => ({
        params: {
            presetSlug: _preset.slug
        }
    }));
};
