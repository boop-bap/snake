<template>
	<div @keydown="move" tabindex="0" id="123" class="snake">Snakee</div>
</template>

<script>
	import vue from "vue";
	export default vue.extend({
		name: "Snake",
		methods: {
			move(event) {
				if (event.key === "ArrowUp" || event.key === "ArrowDown") this.$emit("upDown", event.key);
				if (event.key === "ArrowLeft" || event.key === "ArrowRight") this.$emit("leftRight", event.key);
			},
		},
	});
</script>

<style lang="scss" scoped>
	.snake {
		width: 50px;
		height: 50px;
		background: purple;
		text-align: center;
	}
</style>
