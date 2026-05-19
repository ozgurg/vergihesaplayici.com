import type { ImageMetadata } from "astro";
import type { HSLColor, RGBColor } from "@/types/common.js";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { getAverageColor } from "fast-average-color-node";

const GENERATED_FOLDER_NAME = ".generated";
const GENERATED_JSON_NAME = "thumb-colors.json";
const GENERATED_JSON_PATH = path.resolve(process.cwd(), path.join(GENERATED_FOLDER_NAME, GENERATED_JSON_NAME));

export type Thumb = {
    metadata: ImageMetadata; // Used for the `<Image />` component
    base64: Promise<string>; // Used for `og:image` generation
    fileName: string; // Used to map with a color
    color: {
        hsl: HSLColor
    };
};

type ThumbColors = { [key: string]: { hsl: HSLColor } };


const getThumbColorsJson = (): ThumbColors => {
    if (fs.existsSync(GENERATED_JSON_PATH)) {
        try {
            return JSON.parse(fs.readFileSync(GENERATED_JSON_PATH, "utf8")) as ThumbColors;
        } catch {
            return {};
        }
    }
    return {};
};

const getDominantColor = async (base64: string): Promise<{ hsl: HSLColor }> => {
    const averageColor = await getAverageColor(base64);
    return {
        hsl: rgbToHsl({
            r: averageColor.value[0],
            g: averageColor.value[1],
            b: averageColor.value[2]
        })
    };
};

const rgbToHsl = ({ r, g, b }: RGBColor): HSLColor => {
    const normalizedR = r / 255;
    const normalizedG = g / 255;
    const normalizedB = b / 255;

    const max = Math.max(normalizedR, normalizedG, normalizedB);
    const min = Math.min(normalizedR, normalizedG, normalizedB);
    const delta = max - min;

    const lightness = (max + min) / 2;

    if (delta === 0) {
        return {
            h: 0,
            s: 0,
            l: Math.round(lightness * 100)
        };
    }

    const saturation = lightness > .5
        ? delta / (2 - max - min)
        : delta / (max + min);

    let hue = 0;
    switch (max) {
    case normalizedR: {
        hue = ((normalizedG - normalizedB) / delta) + (normalizedG < normalizedB ? 6 : 0);
        break;
    }
    case normalizedG : {
        hue = ((normalizedB - normalizedR) / delta) + 2;
        break;
    }
    default: { // normalizedB
        hue = ((normalizedR - normalizedG) / delta) + 4;
        break;
    }
    }

    return {
        h: Math.round(hue * 60),
        s: Math.round(saturation * 100),
        l: Math.round(lightness * 100)
    };
};

export const extractColorFromThumbs = async (): Promise<void> => {
    const thumbsPathBase64Pair: {
        [key: string]: string
    } = import.meta.glob<string>("./../../public/img/thumb/*.webp", {
        eager: true,
        import: "default",
        query: "?inline"
    });

    const results = getThumbColorsJson();
    let hasChanges = false;

    await Promise.all(
        Object.entries(thumbsPathBase64Pair).map(async ([filePath, base64]) => {
            const fileName = path.basename(filePath);
            if (results[fileName]) {
                return;
            }
            hasChanges = true;
            const { hsl } = await getDominantColor(base64 as string);
            results[fileName] = { hsl };
        })
    );

    if (hasChanges || !fs.existsSync(GENERATED_JSON_PATH)) {
        const generatedFolderPath = path.resolve(process.cwd(), GENERATED_FOLDER_NAME);
        if (!fs.existsSync(generatedFolderPath)) {
            fs.mkdirSync(generatedFolderPath);
        }

        fs.writeFileSync(
            GENERATED_JSON_PATH,
            JSON.stringify(results),
            "utf8"
        );
    }
};

const filePathToFileName = (filePath: string): string => {
    return filePath.split("/").pop() as string;
};

// https://github.com/vercel/satori/pull/622
const webpToBase64Png = async (webpDataUri: string): Promise<string> => {
    if (!webpDataUri || !webpDataUri.startsWith("data:image/webp;base64,")) {
        return webpDataUri;
    }
    const base64Data = webpDataUri.split(";base64,").pop();
    if (!base64Data) {
        return webpDataUri;
    }
    const buffer = Buffer.from(base64Data, "base64");
    const pngBuffer = await sharp(buffer).png().toBuffer();
    return `data:image/png;base64,${pngBuffer.toString("base64")}`;
};

const mapThumbEntries = (
    metadataPair: { [key: string]: ImageMetadata },
    base64Pair: { [key: string]: string },
    thumbColors: ThumbColors
): Thumb[] => {
    return Object.entries(metadataPair).map(([_filePath, _metadata]) => {
        const base64Webp = base64Pair[_filePath] as string;
        const fileName = filePathToFileName(_filePath);
        const color = thumbColors[fileName] as { hsl: HSLColor };
        return {
            metadata: _metadata,
            get base64(): Promise<string> {
                const promise = webpToBase64Png(base64Webp);
                Object.defineProperty(this, "base64", {
                    value: promise,
                    writable: false,
                    configurable: true,
                    enumerable: true
                });
                return promise;
            },
            fileName,
            color
        } as Thumb;
    });
};

const thumbsFilePathMetadataPair: {
    [key: string]: ImageMetadata
} = import.meta.glob<ImageMetadata>("./../../public/img/thumb/*.webp", {
    eager: true,
    import: "default"
});

const thumbsFilePathBase64Pair: {
    [key: string]: string
} = import.meta.glob<string>("./../../public/img/thumb/*.webp", {
    eager: true,
    import: "default",
    query: "?inline"
});

const thumbColorsJson = getThumbColorsJson();

const Thumbs: Thumb[] = mapThumbEntries(
    thumbsFilePathMetadataPair,
    thumbsFilePathBase64Pair,
    thumbColorsJson
);

export const getThumbByFileName = (fileName: string): Thumb => {
    return Thumbs.find(_thumb => _thumb.fileName === fileName) as Thumb;
};
