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
import type { VehicleType } from "@/domains/arac-vergisi/types.js";
import { VehicleEngineVolume } from "@/domains/arac-vergisi/types.js";
import {
    VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_ENGINE_VOLUME,
    VEHICLE_ENGINE_VOLUME_LABEL_BY_VEHICLE_TYPE
} from "@/domains/arac-vergisi/config.js";

const toFormCheckProps = (items: VehicleEngineVolume[]) => {
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
            VehicleEngineVolume.AUTOMOBILE__0_1400,
            VehicleEngineVolume.AUTOMOBILE__1401_1600,
            VehicleEngineVolume.AUTOMOBILE__1601_2000,
            VehicleEngineVolume.AUTOMOBILE__2001_UP
        ]),
        "electric-automobile": toFormCheckProps([
            VehicleEngineVolume.ELECTRIC_AUTOMOBILE__0_160,
            VehicleEngineVolume.ELECTRIC_AUTOMOBILE__161_UP
        ]),
        "hybrid-automobile": toFormCheckProps([
            VehicleEngineVolume.HYBRID_AUTOMOBILE__50_UP_0_1800,
            VehicleEngineVolume.HYBRID_AUTOMOBILE__100_UP_0_2500,
            VehicleEngineVolume.HYBRID_AUTOMOBILE__OTHER
        ]),
        "motorcycle": toFormCheckProps([
            VehicleEngineVolume.MOTORCYCLE__0_250,
            VehicleEngineVolume.MOTORCYCLE__251_UP
        ])
    };
    return map[props.vehicleType] ?? null;
});

const className = computed<string | null>(() => {
    const map: Partial<{ [key in VehicleType]: string }> = {
        "automobile": "vehicle-engine-volume-automobile",
        "electric-automobile": "vehicle-engine-volume-electric-automobile",
        "hybrid-automobile": "vehicle-engine-volume-hybrid-automobile",
        "motorcycle": "vehicle-engine-volume-motorcycle"
    };
    return map[props.vehicleType] ?? null;
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
