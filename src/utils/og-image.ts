import type { Font, SatoriOptions } from "satori";
import satori from "satori";
import sharp from "sharp";
import { html } from "satori-html";

const INTER_FONT_VERSION = "5.2.6";
const OG_IMAGE_QUALITY = 75;
const OG_IMAGE_WIDTH_IN_PIXELS = 1_200;
const OG_IMAGE_HEIGHT_IN_PIXELS = 627;
const DEBUG = import.meta.env.DEV;

const fontCache = new Map<string, Font>();
const loadFont = async (url: `https://${string}.woff`, name: Font["name"]): Promise<Font> => {
    const cacheKey = `${name}-${url}`;
    if (fontCache.has(cacheKey)) {
        // oxlint-disable-next-line no-non-null-assertion
        return fontCache.get(cacheKey)!;
    }
    const font = await fetch(url)
        .then(async _response => ({
            data: await _response.arrayBuffer(),
            name
        }));
    fontCache.set(cacheKey, font);
    return font;
};

const svgToJpgBuffer = (svgString: string, width: number, height: number): Promise<Buffer> => {
    return sharp(Buffer.from(svgString), { limitInputPixels: false })
        .resize(width, height)
        .jpeg({ mozjpeg: true, quality: OG_IMAGE_QUALITY })
        .toBuffer();
};

const toSatori = (template: string, options: SatoriOptions): Promise<string> => {
    return satori(html(template), options);
};

const toResponse = async (svgString: string, width: number, height: number): Promise<Response> => {
    const jpgBuffer = await svgToJpgBuffer(svgString, width, height);
    return new Response(jpgBuffer, {
        headers: {
            "Content-Type": "image/jpeg"
        }
    });
};


type OgImageResult = {
    debug: boolean;
    size: {
        width: number;
        height: number;
    };
    fonts: {
        interLatin500Normal: Font;
        interLatin700Normal: Font;
    },
    build: (template: string) => Promise<Response>;
};

export const ogImage = async (): Promise<OgImageResult> => {
    const fonts = {
        interLatin500Normal: await loadFont(`https://cdn.jsdelivr.net/fontsource/fonts/inter@${INTER_FONT_VERSION}/latin-500-normal.woff`, "Inter Latin 500 Normal"),
        interLatin700Normal: await loadFont(`https://cdn.jsdelivr.net/fontsource/fonts/inter@${INTER_FONT_VERSION}/latin-700-normal.woff`, "Inter Latin 700 Normal")
    };

    const satoriOptions = {
        width: OG_IMAGE_WIDTH_IN_PIXELS,
        height: OG_IMAGE_HEIGHT_IN_PIXELS,
        debug: DEBUG,
        fonts: Object.values(fonts)
    };

    const size = {
        width: OG_IMAGE_WIDTH_IN_PIXELS,
        height: OG_IMAGE_HEIGHT_IN_PIXELS
    };

    return {
        debug: DEBUG,
        size,
        fonts,
        async build(template: string): Promise<Response> {
            const svgString = await toSatori(template, satoriOptions);
            return toResponse(svgString, size.width, size.height);
        }
    };
};
