import type { ImageMetadata } from "astro";
import type { HSLColor } from "@/types/common.js";
import sharp from "sharp";
import thumbColorsJson from "@root/.generated/thumb-colors.json" with { type: "json" };

export type Thumb = {
    metadata: ImageMetadata; // Used for the `<Image />` component
    base64: string; // Used for `og:image` generation
    fileName: string; // Used to map with a color
    color: {
        hsl: HSLColor
    };
};

export type ThumbColors = { [key: string]: { hsl: HSLColor } };


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
): Promise<Thumb[]> => {
    return Promise.all(
        Object.entries(metadataPair).map(async ([_filePath, _metadata]) => {
            const base64Webp = base64Pair[_filePath] as string;
            const base64Png = await webpToBase64Png(base64Webp);
            const fileName = filePathToFileName(_filePath);
            const color = thumbColors[fileName] as { hsl: HSLColor };
            return {
                metadata: _metadata,
                base64: base64Png,
                fileName,
                color
            };
        })
    );
};

let thumbsCache: Promise<Thumb[]> | null = null;

export const loadThumbs = (): Promise<Thumb[]> => {
    if (thumbsCache === null) {
        thumbsCache = (async (): Promise<Thumb[]> => {
            const thumbColors: ThumbColors = thumbColorsJson;
            const thumbsFilePathBase64Pair: {
                [key: string]: string
            } = import.meta.glob<string>("@root/public/img/thumb/*.webp", {
                eager: true,
                import: "default",
                query: "?inline"
            });
            const thumbsFilePathMetadataPair: {
                [key: string]: ImageMetadata
            } = import.meta.glob<ImageMetadata>("@root/public/img/thumb/*.webp", {
                eager: true,
                import: "default"
            });
            return await mapThumbEntries(thumbsFilePathMetadataPair, thumbsFilePathBase64Pair, thumbColors);
        })();
    }
    return thumbsCache;
};
