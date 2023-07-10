<template>
    <div
        ref="scriptContainer"
        class="vh-ab" />
</template>

<script>
const LOAD_DELAY = 500;

export default {
    props: {
        order: {
            type: Number,
            required: true
        },
        adKey: {
            type: String,
            required: true
        },
        format: {
            type: String,
            default: () => "iframe"
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        nonce: {
            type: String,
            default: () => "nonce-ad"
        }
    },
    methods: {
        _initScripts() {
            const vm = this;

            const container = vm.$refs.scriptContainer;

            const optionsScript = document.createElement("script");
            optionsScript.type = "text/javascript";
            optionsScript.setAttribute("nonce", vm.nonce);
            optionsScript.innerHTML = `
                atOptions = {
                    "key": "${vm.adKey}",
                    "format": "${vm.format}",
                    "width": ${vm.width},
                    "height": ${vm.height},
                    "params": {}
                };
            `;
            container.appendChild(optionsScript);

            const srcScript = document.createElement("script");
            srcScript.type = "text/javascript";
            srcScript.src = `https://www.profitabledisplaynetwork.com/${vm.adKey}/invoke.js`;
            srcScript.setAttribute("nonce", vm.nonce);
            container.appendChild(srcScript);
        }
    },
    computed: {
        unitizedWidth() {
            const vm = this;
            return `${vm.width}px`;
        },
        unitizedHeight() {
            const vm = this;
            return `${vm.height}px`;
        }
    },
    mounted() {
        const vm = this;
        setTimeout(() => vm._initScripts(), LOAD_DELAY * vm.order);
    }
};
</script>

<style lang="scss" scoped="">
.vh-ab {
    background: rgba(#fff, .05);
    border-radius: .5rem;
    overflow: hidden;
    display: inline-block;
    width: v-bind(unitizedWidth);
    height: v-bind(unitizedHeight);
    max-width: 100%
}
</style>
