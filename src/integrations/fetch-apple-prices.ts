import type { AstroIntegration } from "astro";

// oxlint-disable-next-line import/no-relative-parent-imports
import { fetchAndGenerateApplePrices } from "../domains/iphone-ulke-fiyatlari/utils/apple-prices.js";

const INTEGRATION_NAME = "fetch-apple-prices";

// oxlint-disable-next-line import/no-default-export
export default function fetchApplePricesIntegration(): AstroIntegration {
    return {
        name: INTEGRATION_NAME,
        hooks: {
            "astro:config:setup": async (): Promise<void> => {
                console.info(`[${INTEGRATION_NAME}] 🟡 Started`);
                const startTime = performance.now();

                await fetchAndGenerateApplePrices();

                const endTime = performance.now();
                console.info(`[${INTEGRATION_NAME}] ✅ Done in ${(endTime - startTime).toFixed(2)} ms!`);
            }
        }
    };
}
