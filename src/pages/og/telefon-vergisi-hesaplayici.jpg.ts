import type { APIRoute } from "astro";
import logoSvgBase64 from "@/assets/img/logo.svg?inline";
import { TelefonVergisiHesaplayiciPageDef } from "@/domains/telefon-vergisi-hesaplayici/page-def.js";

const page = TelefonVergisiHesaplayiciPageDef();

export const GET: APIRoute = async (): Promise<Response> => {
    const {
        debug,
        size,
        fonts,
        build
    } = await ogImage();

    const iconSvgColored = page.icon.replace(`fill="currentColor"`, `fill="#88df95"`);

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

            .icon {
                padding: 16px;
                border-radius: 50rem;
                background: rgba(136, 223, 149, .125);
                display: flex
            }

            .icon svg {
                width: 96px;
                height: 96px
            }

            .title {
                font-family: "${fonts.interLatin700Normal.name}";
                text-wrap: balance;
                margin-top: 24px;
                font-size: 56px;
                font-weight: 900
            }
        </style>

        <div class="og-image">
            <div class="debug"></div>
            <div class="og-image-body">
                <div class="icon">
                    ${iconSvgColored}
                </div>
                <div class="title">${page.title}</div>
            </div>
            <div class="og-image-footer">
                <img src="${logoSvgBase64}" />
            </div>
        </div>
    `);
};
