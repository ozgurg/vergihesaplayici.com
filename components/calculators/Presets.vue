<template>
	<v-chip-group
		:column="true"
		v-model="preset">
		<v-chip :key="index"
				v-for="(preset, index) in presets"
				:value="index"
				outlined="">
			{{ preset.title }}
		</v-chip>
	</v-chip-group>
</template>

<script>
export default {
	name: "Presets",
	data: () => ({
		preset: false
	}),
	props: {
		presets: {
			type: Array,
			required: true
		}
	},
	watch: {
		preset() {
			const vm = this;
			vm.$emit("input", vm.preset);
		}
	}
};
</script>