import Vue from "vue";

const numberDirectiveInputListener = (event, input, { min, max }) => {
    const value = parseFloat(input.value);

    const isDeleting = event.key === "Backspace";
    const isUpOrDown = event.key === "ArrowUp" || event.key === "ArrowDown";
    const isAllowedKey = isDeleting || isUpOrDown;

    if (!isAllowedKey) {
        if (value < min) {
            input.value = min;
        }
        if (value > max) {
            input.value = max;
        }
    }
};

Vue.directive("number", {
    bind(element) {
        const input = element.querySelector("input");

        // FIXME: Looks ugly
        const min = input.hasAttribute("min") ? parseFloat(input.getAttribute("min")) : -10_000_000_000_000_000_000;
        const max = input.hasAttribute("max") ? parseFloat(input.getAttribute("max")) : 10_000_000_000_000_000_000;

        input.addEventListener("input", event => {
            numberDirectiveInputListener(event, input, { min, max });
        });
    },
    unbind(element) {
        const input = element.querySelector("input");
        input.removeEventListener("input", numberDirectiveInputListener);
    }
});
