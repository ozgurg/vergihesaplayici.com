<template>
    <div class="vh-ab">
        <span class="vh-ab__caption text-caption text-uppercase">
            Reklam
        </span>
        <div
            ref="scriptContainer"
            class="vh-ab__inner" />
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
        _isScriptsLoaded() {
            const vm = this;
            return vm.$refs.scriptContainer.querySelector("iframe") !== null;
        },
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
@import "~vuetify/src/styles/styles.sass";

$vh-ab-border-radius: .5rem;

.vh-ab {
    position: relative;
    display: flex;
    flex-flow: column wrap;
    width: v-bind(unitizedWidth);
    max-width: 100%;
    @media #{map-get($display-breakpoints, "sm-and-down")} {
        margin-inline: auto
    }

    &__caption {
        background: rgba(#fff, .12);
        display: inline-flex;
        align-self: flex-end;
        padding: .125rem .375rem;
        border-radius: $vh-ab-border-radius $vh-ab-border-radius 0 0
    }

    &__inner {
        background: rgba(#fff, .04);
        border-radius: $vh-ab-border-radius 0 $vh-ab-border-radius $vh-ab-border-radius;
        overflow: hidden;
        width: 100%;
        height: v-bind(unitizedHeight)
    }
}
</style>
