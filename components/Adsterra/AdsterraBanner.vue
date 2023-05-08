<template>
    <div
        ref="scriptContainer"
        :style="sizeStyle"
        class="vh-ab" />
</template>

<script>
const LOAD_DELAY = 750;

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
        sizeStyle() {
            const vm = this;
            return `--_width:${vm.width}px;--_height:${vm.height}px`;
        }
    },
    mounted() {
        const vm = this;
        setTimeout(() => vm._initScripts(), LOAD_DELAY * vm.order);
    }
};
</script>

<style>
.vh-ab {
    background: rgba(255, 255, 255, .05);
    border-radius: .5rem;
    overflow: hidden;
    display: inline-block;
    width: var(--_width, 0);
    height: var(--_height, 0);
    max-width: 100%
}
</style>
