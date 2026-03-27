import type { AstroIntegration } from "astro";

// oxlint-disable-next-line import/no-relative-parent-imports
import { initializeExchangeRates } from "./../utils/exchange-rates.js";

const INTEGRATION_NAME = "exchange-rates";

// oxlint-disable-next-line import/no-default-export
export default function exchangeRates(): AstroIntegration {
    return {
        name: INTEGRATION_NAME,
        hooks: {
            "astro:config:setup": async ({ updateConfig }): Promise<void> => {
                console.info(`[${INTEGRATION_NAME}] 🟡 Started`);
                const startTime = performance.now();

                const EXCHANGE_RATES = await initializeExchangeRates();
                updateConfig({
                    vite: {
                        define: {
                            "window.__EXCHANGE_RATES__": JSON.stringify(EXCHANGE_RATES)
                        }
                    }
                });

                const endTime = performance.now();
                console.info(`[${INTEGRATION_NAME}] ✅ Done in ${(endTime - startTime).toFixed(2)} ms!`);
            }
        }
    };
}
