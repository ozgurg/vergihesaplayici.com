import type { AstroIntegration } from "astro";

// oxlint-disable-next-line import/no-relative-parent-imports
import { extractColorFromThumbs } from "./../utils/thumb-loader.js";

const INTEGRATION_NAME = "extract-color-from-thumbs";

// oxlint-disable-next-line import/no-default-export
export default function extractColorFromThumbsIntegration(): AstroIntegration {
    return {
        name: INTEGRATION_NAME,
        hooks: {
            "astro:config:setup": async (): Promise<void> => {
                console.info(`[${INTEGRATION_NAME}] 🟡 Started`);
                const startTime = performance.now();

                await extractColorFromThumbs();

                const endTime = performance.now();
                console.info(`[${INTEGRATION_NAME}] ✅ Done in ${(endTime - startTime).toFixed(2)} ms!`);
            }
        }
    };
}
