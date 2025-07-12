import type { ImageMetadata } from "astro";
import type { HSLColor } from "@/types/common.js";

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

const mapThumbEntries = (
    metadataPair: { [key: string]: ImageMetadata },
    base64Pair: { [key: string]: string },
    thumbColors: ThumbColors
): Promise<Thumb[]> => {
    // oxlint-disable-next-line prefer-await-to-then
    return Promise.all(
        Object.entries(metadataPair).map(([_filePath, _metadata]) => {
            const base64 = base64Pair[_filePath] as string;
            const fileName = filePathToFileName(_filePath);
            const color = thumbColors[fileName] as { hsl: HSLColor };
            return {
                metadata: _metadata,
                base64,
                fileName,
                color
            };
        })
    );
};


// We'll need to duplicate the import statement for each domain because it requires literal strings

// oxlint-disable first
import telefonVergisiHesaplayici_thumbColors from "@root/.generated/telefon-vergisi-hesaplayici-thumb-colors.json" assert { type: "json" };
import konsolVergisiHesaplayici_thumbColors from "@root/.generated/konsol-vergisi-hesaplayici-thumb-colors.json" assert { type: "json" };

export const loadThumbs = async (domain: string): Promise<Thumb[]> => {
    let thumbColors: ThumbColors;
    let thumbsFilePathBase64Pair: { [key: string]: string };
    let thumbsFilePathMetadataPair: { [key: string]: ImageMetadata };

    if (domain === "telefon-vergisi-hesaplayici") {
        thumbColors = telefonVergisiHesaplayici_thumbColors;
        thumbsFilePathBase64Pair = import.meta.glob<string>("@/domains/telefon-vergisi-hesaplayici/thumb/*.png", {
            eager: true,
            import: "default",
            query: "?inline"
        });
        thumbsFilePathMetadataPair = import.meta.glob<ImageMetadata>("@/domains/telefon-vergisi-hesaplayici/thumb/*.png", {
            eager: true,
            import: "default"
        });
    } else if (domain === "konsol-vergisi-hesaplayici") {
        thumbColors = konsolVergisiHesaplayici_thumbColors;
        thumbsFilePathBase64Pair = import.meta.glob<string>("@/domains/konsol-vergisi-hesaplayici/thumb/*.png", {
            eager: true,
            import: "default",
            query: "?inline"
        });
        thumbsFilePathMetadataPair = import.meta.glob<ImageMetadata>("@/domains/konsol-vergisi-hesaplayici/thumb/*.png", {
            eager: true,
            import: "default"
        });
    } else {
        throw new Error(`Unsupported domain: ${domain}`);
    }

    return await mapThumbEntries(thumbsFilePathMetadataPair, thumbsFilePathBase64Pair, thumbColors);
};
