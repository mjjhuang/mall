<template>
	<div class="goods-item" @click="itemClick">
		<img v-lazy="showImage" alt="" @load="imageLoad" />
		<div class="goods-info">
			<p>{{goodsItem.title}}</p>
			<span class="price">{{goodsItem.price}}</span>
			<span class="collect">{{goodsItem.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'GoodsListItem',
		props: {
			goodsItem: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		computed: {
			showImage() {
				return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
			}
		},
		methods: {
			imageLoad() {
				// console.log("imageLoad");
				this.$bus.$emit('itemImageLoad')
			},
			itemClick() {
				// console.log("跳转到详情页")
				// 使用动态路由来做,取数据时$route.params.iid
				this.$router.push('/detail/' + this.goodsItem.iid)
				
				// 使用query来做跳转时，路由只要/detail即可,取数据$route.query.iid
				// this.$router.push({
				// 	path: '/detail',
				// 	query: {
				// 		iid: this.goodsItem.iid
				// 	}
				// })
			}
		}
	}
</script>

<style scoped>
	.goods-item {
		padding-bottom: 40px;
		position: relative;
		width: 48%;
	}
	.goods-item img {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	.goods-info {
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
		padding: 0;
		border-bottom: 0;
	}
	.goods-info p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
	}
	.goods-info .price {
		color: var(--color-high-text);
		margin-right: 30px;
	}
	.goods-info .collect {
		position: relative;
	}
	.goods-info .collect::before {
		content: '';
		position: absolute;
		left: -15px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
	}
</style>