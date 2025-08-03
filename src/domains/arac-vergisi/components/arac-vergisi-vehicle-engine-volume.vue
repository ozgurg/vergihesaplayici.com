<template>
    <form-group>
        <template #label>
            <form-label is="legend">
                <string-carousel :text="label" />
            </form-label>
        </template>
        <transition name="fade-transition" mode="out-in">
            <template v-if="items">
                <form-check-group
                    v-bind="$attrs"
                    :items="items"
                    :class="className"
                    type="radio" />
            </template>
            <template v-else>
                <alert color="info">Bu araç türünde motora göre değişen vergilendirme yok. Henüz.</alert>
            </template>
        </transition>
    </form-group>
</template>

<script lang="ts" setup>
// oxlint-disable-next-line consistent-type-imports
import type { Item as FormCheckProps } from "@/components/common/form/form-check-group.vue";
import { VehicleEngineVolume, VehicleType } from "@/domains/arac-vergisi/types.js";
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
        [VehicleType.AUTOMOBILE]: toFormCheckProps([
            VehicleEngineVolume.AUTOMOBILE__0_1400,
            VehicleEngineVolume.AUTOMOBILE__1401_1600,
            VehicleEngineVolume.AUTOMOBILE__1601_2000,
            VehicleEngineVolume.AUTOMOBILE__2001_UP
        ]),
        [VehicleType.ELECTRIC_AUTOMOBILE]: toFormCheckProps([
            VehicleEngineVolume.ELECTRIC_AUTOMOBILE__0_160,
            VehicleEngineVolume.ELECTRIC_AUTOMOBILE__161_UP
        ]),
        [VehicleType.HYBRID_AUTOMOBILE]: toFormCheckProps([
            VehicleEngineVolume.HYBRID_AUTOMOBILE__50_UP_0_1800,
            VehicleEngineVolume.HYBRID_AUTOMOBILE__100_UP_0_2500,
            VehicleEngineVolume.HYBRID_AUTOMOBILE__OTHER
        ]),
        [VehicleType.MOTORCYCLE]: toFormCheckProps([
            VehicleEngineVolume.MOTORCYCLE__0_250,
            VehicleEngineVolume.MOTORCYCLE__251_UP
        ])
    };
    return map[props.vehicleType] ?? null;
});

const className = computed<string | null>(() => {
    const map: Partial<{ [key in VehicleType]: string }> = {
        [VehicleType.AUTOMOBILE]: "arac-vergisi-vehicle-engine-volume-automobile",
        [VehicleType.ELECTRIC_AUTOMOBILE]: "arac-vergisi-vehicle-engine-volume-electric-automobile",
        [VehicleType.HYBRID_AUTOMOBILE]: "arac-vergisi-vehicle-engine-volume-hybrid-automobile",
        [VehicleType.MOTORCYCLE]: "arac-vergisi-vehicle-engine-volume-motorcycle"
    };
    return map[props.vehicleType] ?? null;
});
</script>

<style lang="scss" scoped>
.arac-vergisi-vehicle-engine-volume-automobile {
    grid-template-columns: repeat(2, 1fr);
    @include vh-media-breakpoint-up(sm) {
        grid-template-columns: repeat(3, 1fr)
    }
}

.arac-vergisi-vehicle-engine-volume-electric-automobile {
    grid-template-columns: repeat(2, 1fr);
    @include vh-media-breakpoint-up(sm) {
        grid-template-columns: repeat(3, 1fr)
    }
}

.arac-vergisi-vehicle-engine-volume-hybrid-automobile {
    grid-template-columns: repeat(1, 1fr);
    @include vh-media-breakpoint-up(sm) {
        grid-template-columns: repeat(2, 1fr)
    }
}

.arac-vergisi-vehicle-engine-volume-motorcycle {
    grid-template-columns: repeat(2, 1fr);
    @include vh-media-breakpoint-up(sm) {
        grid-template-columns: repeat(3, 1fr)
    }
}
</style>
