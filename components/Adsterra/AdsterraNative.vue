<template>
    <div>
        <div ref="scriptContainer" />
        <div :id="containerId" />
    </div>
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
            default: "18d820d42a43bbb54b363d01dc952cf3"
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

            const srcScript = document.createElement("script");
            srcScript.async = true;
            srcScript.setAttribute("data-cfasync", "false");
            srcScript.src = `https://pl19311592.highrevenuegate.com/${vm.adKey}/invoke.js`;
            srcScript.setAttribute("nonce", vm.nonce);
            container.appendChild(srcScript);
        }
    },
    computed: {
        containerId() {
            const vm = this;
            return `container-${vm.adKey}`;
        }
    },
    mounted() {
        const vm = this;
        setTimeout(() => vm._initScripts(), LOAD_DELAY * vm.order);
    }
};
</script>
