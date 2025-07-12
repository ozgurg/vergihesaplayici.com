import type { APIRoute } from "astro";
import logoSvgBase64 from "@/assets/img/logo.svg?inline";

export const GET: APIRoute = async (): Promise<Response> => {
    const {
        debug,
        size,
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
                margin-top: 24px;
                width: ${size.height}px; /* Some sites show "og:image" as square, so let's fix ours to be square to play it safe */
                flex: 1
            }

            .og-image-footer {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                width: 100%;
                height: 24px;
                background: #88df95
            }
        </style>

        <div class="og-image">
            <div class="debug"></div>
            <div class="og-image-body">
                <!-- DO NOT ADD width -->
                <img
                    src="${logoSvgBase64}"
                    height="80" />
            </div>
            <div class="og-image-footer"></div>
        </div>
    `);
};
