<template>
    <div
        ref="root"
        class="vh-an">
        <span class="vh-an__caption text-caption text-uppercase">
            Reklam
        </span>
        <div class="vh-an__inner">
            <div ref="scriptContainer" />
            <div :id="containerId" />
        </div>
    </div>
</template>

<script>
const LOAD_DELAY_IN_MS = 500;
const RETRY_DELAY_IN_MS = 5000;

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
        _isScriptsLoaded() {
            const vm = this;
            return vm.$refs.root.querySelector(`.${vm.containerId}__stand`) !== null;
        },
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

        setTimeout(() => {
            vm._initScripts();

            setTimeout(() => {
                if (!vm._isScriptsLoaded()) {
                    vm._initScripts();
                }
            }, RETRY_DELAY_IN_MS);
        }, LOAD_DELAY_IN_MS * vm.order);
    }
};
</script>

<style lang="scss" scoped="">
$vh-an-border-radius: .5rem;

.vh-an {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 100%;

    &__caption {
        background: rgba(#fff, .12);
        display: inline-flex;
        align-self: flex-end;
        padding: .125rem .375rem;
        border-radius: $vh-an-border-radius $vh-an-border-radius 0 0
    }

    &__inner {
        background: rgba(#fff, .04);
        border-radius: $vh-an-border-radius 0 $vh-an-border-radius $vh-an-border-radius;
        overflow: hidden;
        width: 100%;
        display: flex;
        align-items: center;
        min-height: 274px
    }
}
</style>
