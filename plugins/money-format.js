import { moneyFormat } from "@/utils/money-format";

export default (context, inject) => {
    inject("moneyFormat", moneyFormat);
};
