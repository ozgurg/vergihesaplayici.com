<template>
	<v-chip-group
		:column="true"
		:value="value"
		@change="$emit('input', $event)">
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
	props: {
		value: {
			type: Number,
			request: true
		},
		presets: {
			type: Array,
			required: true
		}
	}
};
</script>