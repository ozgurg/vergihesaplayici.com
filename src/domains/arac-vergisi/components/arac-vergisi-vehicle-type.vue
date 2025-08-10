<template>
    <form-check-group
        v-model="model"
        v-bind="props"
        :items="items"
        type="radio"
        class="vehicle-type" />

    <template v-if="!isAllShown">
        <div class="show-all">
            <form-button
                @click="isAllShown = true"
                type="button"
                scale="small"
                variant="plain">
                Tümünü göster
            </form-button>
        </div>
    </template>
</template>

<script lang="ts" setup>
// oxlint-disable extensions
import type {
    Item as FormCheckProps,
    Props as FormCheckGroupProps
} from "@/components/common/form/form-check-group.vue";
import icon_automobile from "remixicon/icons/Map/car-line.svg?raw";
import icon_electricAutomobile from "remixicon/icons/Weather/flashlight-fill.svg?raw";
import icon_hybridAutomobile from "remixicon/icons/Map/roadster-line.svg?raw";
import icon_motorcycle from "remixicon/icons/Map/motorbike-line.svg?raw";
import { VehicleType } from "@/domains/arac-vergisi/types.js";
import { VEHICLE_TYPE_LABEL_BY_VEHICLE_TYPE } from "@/domains/arac-vergisi/config.js";

const INITIAL_ITEMS = [
    {
        icon: icon_automobile,
        value: VehicleType.AUTOMOBILE
    },
    {
        icon: icon_electricAutomobile,
        value: VehicleType.ELECTRIC_AUTOMOBILE
    },
    {
        icon: icon_hybridAutomobile,
        value: VehicleType.HYBRID_AUTOMOBILE
    },
    {
        icon: icon_motorcycle,
        value: VehicleType.MOTORCYCLE
    }
].map(_item => ({
    title: VEHICLE_TYPE_LABEL_BY_VEHICLE_TYPE[_item.value],
    icon: _item.icon,
    input: {
        value: _item.value
    }
}));
const HIDDEN_ITEMS = [
    VehicleType.BUS,
    VehicleType.MIDIBUS,
    VehicleType.MINIBUS,
    VehicleType.HELICOPTER,
    VehicleType.PLANE,
    VehicleType.BOAT,
    VehicleType.YACHT
].map(_item => ({
    title: VEHICLE_TYPE_LABEL_BY_VEHICLE_TYPE[_item],
    input: {
        value: _item
    }
}));

export type Props = Partial<FormCheckGroupProps>;

const props = defineProps<Props>();

const model = defineModel<VehicleType>();
const isAllShown = ref<boolean>(false);
const items = ref<FormCheckProps<VehicleType>[]>(INITIAL_ITEMS);

watch(isAllShown, () => {
    items.value.push(...HIDDEN_ITEMS);
}, { once: true });
</script>

<style lang="scss" scoped>
.vehicle-type {
    grid-template-columns: repeat(2, 1fr);
    @include vh-media-breakpoint-up(sm) {
        grid-template-columns: repeat(3, 1fr)
    }
    @include vh-media-breakpoint-up(md) {
        grid-template-columns: repeat(4, 1fr)
    }
}

.show-all {
    margin-block-start: calc(var(--vh-spacer) * .5)
}
</style>
