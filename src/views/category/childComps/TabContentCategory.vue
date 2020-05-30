<template>
	<div>
		<grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
			<div class="item" v-for="(item, index) in subcategories.list" :key="index">
				<a :href="item.link">
					<img class="item-img" :src="item.image" alt="" />
					<div class="item-text">{{item.title}}</div>
				</a>
			</div>
		</grid-view>
	</div>
</template>

<script>
	import GridView from 'components/common/gridview/GridView'
	
	export default {
		name: 'TabContentCategory',
		components: {
			GridView,
		},
		props: {
			subcategories: {
				type: Object,
				default() {
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.item {
		font-size: 12px;
		text-align: center;
	}
	.item-img{
		width: 90%;
	}
	.item-text {
		margin-top: 15px;
	}
</style>
