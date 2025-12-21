<template>
    <form-group>
        <template #label>
            <form-label is="legend">
                <string-carousel :text="label" />
            </form-label>
        </template>
        <transition name="fade-transition" mode="out-in">
            <div v-if="items">
                <form-check-group
                    v-bind="$attrs"
                    :items="items"
                    :class="className"
                    type="radio" />
            </div>
            <div v-else>
                <alert color="info">Bu araç türünde motora göre değişen vergilendirme yok. Henüz.</alert>
            </div>
        </transition>
    </form-group>
</template>

<script lang="ts" setup>
// oxlint-disable-next-line consistent-type-imports
import type { Item as FormCheckProps } from "@/components/common/form/form-check-group.vue";
import type { VehicleEngineVolume, VehicleType } from "@/domains/arac-vergisi/types.js";
import {
    VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_ENGINE_VOLUME,
    VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_TYPE
} from "@/domains/arac-vergisi/config.js";

const toFormCheckProps = (items: VehicleEngineVolume[]): FormCheckProps[] => {
    return items.map(_item => ({
        title: VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_ENGINE_VOLUME[_item],
        input: {
            value: _item
        }
    }));
};

export type Props = {
    vehicleType: VehicleType;
}

defineOptions({ inheritAttrs: false });
const props = defineProps<Props>();

const label = computed<string>(() => {
    return VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_TYPE[props.vehicleType];
});

const items = computed<FormCheckProps[] | null>(() => {
    const map: Partial<{ [key in VehicleType]: FormCheckProps[] }> = {
        "automobile": toFormCheckProps([
            "automobile.0-1400",
            "automobile.1401-1600",
            "automobile.1601-2000",
            "automobile.2001-up"
        ]),
        "electric-automobile": toFormCheckProps([
            "electric-automobile.0-160",
            "electric-automobile.161-up"
        ]),
        "hybrid-automobile": toFormCheckProps([
            "hybrid-automobile.50-up.0-1800",
            "hybrid-automobile.100-up.0-2500",
            "hybrid-automobile.other"
        ]),
        "motorcycle": toFormCheckProps([
            "motorcycle.0-250",
            "motorcycle.251-up"
        ])
    };
    return map[props.vehicleType] ?? null;
});

const className = computed<string>(() => {
    return `vehicle-engine-volume-${props.vehicleType}`;
});
</script>

<style lang="scss" scoped>
.vehicle-engine-volume-automobile {
    grid-template-columns: repeat(2, 1fr);
    @include vh-media-breakpoint-up(sm) {
        grid-template-columns: repeat(3, 1fr)
    }
}

.vehicle-engine-volume-electric-automobile {
    grid-template-columns: repeat(2, 1fr);
    @include vh-media-breakpoint-up(sm) {
        grid-template-columns: repeat(3, 1fr)
    }
}

.vehicle-engine-volume-hybrid-automobile {
    grid-template-columns: repeat(1, 1fr);
    @include vh-media-breakpoint-up(sm) {
        grid-template-columns: repeat(2, 1fr)
    }
}

.vehicle-engine-volume-motorcycle {
    grid-template-columns: repeat(2, 1fr);
    @include vh-media-breakpoint-up(sm) {
        grid-template-columns: repeat(3, 1fr)
    }
}
</style>
