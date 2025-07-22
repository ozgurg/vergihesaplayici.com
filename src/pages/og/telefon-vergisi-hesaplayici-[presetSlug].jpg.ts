import type { APIRoute } from "astro";
import logoSvgBase64 from "@/assets/img/logo.svg?inline";
import {
    getPresetBySlug,
    getPresetsForAllBrands,
    getThumbByFileName
} from "@/domains/telefon-vergisi-hesaplayici/db.js";
import { TelefonVergisiHesaplayiciPageDef } from "@/domains/telefon-vergisi-hesaplayici/page-def.js";

const page = TelefonVergisiHesaplayiciPageDef();

export const GET: APIRoute = async ({ params }): Promise<Response> => {
    const preset = getPresetBySlug(params.presetSlug as string);
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
                height: 72px;
                background: rgba(0, 0, 0, .25)
            }

            .og-image-footer img {
                height: 38px
            }

            .thumb {
                display: flex;
                border-radius: 12px;
                padding: 4px;
                background: hsl(${thumb.color.hsl.h}deg, ${thumb.color.hsl.s}%, ${thumb.color.hsl.l}%);
                width: 160px
            }

            .thumb img {
                object-fit: contain;
                width: 100%
            }

            .title {
                color: hsl(${thumb.color.hsl.h}deg, 100%, 94%);
                font-family: "${fonts.interLatin700Normal.name}";
                text-wrap: balance;
                margin-top: 24px;
                font-size: 40px;
                font-weight: 700
            }

            .calculator {
                font-family: "${fonts.interLatin500Normal.name}";
                margin-top: 40px;
                padding: 4px 16px;
                font-weight: 500;
                border-radius: 16px;
                background: #88df95;
                color: #00262c;
                font-size: 20px
            }
        </style>

        <div class="og-image">
            <div class="debug"></div>
            <div class="og-image-body">
                <div class="thumb">
                    <img src="${thumb.base64}" width="160" />
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
