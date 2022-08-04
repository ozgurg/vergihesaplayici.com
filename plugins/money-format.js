import { moneyFormat } from "@/utils/formatter.js";

export default (context, inject) => {
    inject("moneyFormat", moneyFormat);
};
