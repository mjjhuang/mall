<template>
	<div class="list-view">
		<div v-for="(item,index) in listData" :key="index" class="item">
			<span class="icon">
				<svg :fill="item.iconColor">
					<use xmlns:xlink = "http://www.w3.org/1999/xlink" :xlink:href="item.icon"></use>
				</svg>
			</span>
			<div class="info">{{item.info}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ListView',
		props: {
			listData: {
				type: Array,
				default() {
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.list-view {
		background-color: #fff;
		font-size: 15px;
		margin-top: 10px;
	}
	.list-view .item {
		height: 44px;
		line-height: 44px;
		position: relative;
	}
	.item .icon {
		position: absolute;
		left: 12px;
		top: 4px;
	}
	.icon svg{
		width: 18px;
		height: 18px;
	}
	.info {
		margin-left: 40px;
		border-top: 1px solid rgba(100, 100, 100, .1)
	}
</style>
