<template>
	<scroll class="tab-menu">
		<div class="menu-list">
			<div class="menu-list-item" 
					:class="{active: index===currentIndex}"
					v-for="(item, index) in categories"
					:key="index"
					@click="itemClick(index)">
				{{item.title}}
			</div>
		</div>
	</scroll>
</template>

<script>
	import Scroll from 'components/common/scroll/Scroll'
	
	export default {
		name: 'TabMenu',
		props: {
			categories: Array
		},
		components: {
			Scroll
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			itemClick(index) {
				this.currentIndex = index;
				this.$emit('selectItem', index)
			}
		}
	}
</script>

<style scoped>
	.tab-menu {
		background-color: #f6f6f6;
		width: 100px;
		height: 100%;
		box-sizing: border-box;
	}
	.menu-list-item {
		height: 45px;
		text-align: center;
		line-height: 45px;
		font-size: 14px;
		border-top: 2px solid #eee;
	}
	.menu-list-item.active {
		font-weight: 700;
		color: var(--color-high-text);
		background-color: #fff;
		border-left: 3px solid var(--color-high-text)
	}
</style>
