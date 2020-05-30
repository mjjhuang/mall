<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav"
										ref="nav"
										@titleClick="titleClick" />
		<scroll class="content" ref="scroll" 
						:probe-type="3"
						@scroll="contentScroll">
			<div>
				<!-- <ul>
					<li v-for="item in $store.state.cartList">{{item}}</li>
				</ul> -->
				<!-- 属性: topImages 传入值：top-images -->
				<detail-swiper :top-images="topImages" />
				<detail-base-info :goods="goods" />
				<detail-shop-info :shop="shop" />
				<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
				<detail-param-info ref="params" :paramInfo="paramInfo" />
				<detail-comment-info ref="comment" :comment-info="commentInfo" />
				<goods-list ref="recommend" :goods="recommends" />
			</div>
		</scroll>
		<!-- 监听组件根元素的原生事件 -->
		<back-top @click.native="backClick" v-show="isShowBackTop" />
		<detail-bottom-bar @addCart="addToCart" />
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
	import DetailBottomBar from './childComps/DetailBottomBar'
	
	import Scroll from 'components/common/scroll/Scroll'
	import GoodsList from 'components/content/goods/GoodsList'
	
	import {getDetail,getRecommend , Goods, Shop, GoodsParam} from 'network/detail'
	import {debounce} from 'common/utils'
	import {itemListenerMixin, backTopMixin} from 'common/mixin'
	
	import { mapActions } from 'vuex'
	
	export default {
		name: 'Detail',
		mixins: [itemListenerMixin, backTopMixin],
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: [],
				// itemImgListener: null
				themeTopYs: [],
				getThemeTopY: null,
				currentIndex: 0
			}
		},
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			Scroll,
			GoodsList
		},
		created() {
			// 1.保存传入的iid
			this.iid = this.$route.params.iid;
			// 2.根据iid请求详情数据
			getDetail(this.iid).then(res => {
				// console.log(res)
				const data = res.result;
				// 1.获取顶部的图片轮播数据
				this.topImages = data.itemInfo.topImages;
				// console.log(this.topImages);
				
				// 2.获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				// console.log(this.goods)
				
				// 3.创建店铺信息的对象
				this.shop = new Shop(data.shopInfo);
				
				// 4.保存商品的详情信息
				this.detailInfo = data.detailInfo;
				
				// 5.获取参数的信息
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
			
				// 6.取出评论的信息
				if(data.rate.cRate !== 0) {
					this.commentInfo = data.rate.list[0];
				}
				
				// 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
				this.getThemeTopY = debounce(() => {
					this.themeTopYs = []
					this.themeTopYs.push(0)
					this.themeTopYs.push(this.$refs.params.$el.offsetTop)
					this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
					this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
					this.themeTopYs.push(Number.MAX_VALUE)
					// console.log(this.themeTopYs)
				}, 100)
				
				// 1.第一次获取，值不对，原因是:this.$refs.params.$el压根没有渲染
				// this.themeTopYs = []
				// this.themeTopYs.push(0)
				// this.themeTopYs.push(this.$refs.params.$el.offsetTop)
				// this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
				// this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
				// console.log(this.themeTopYs)
				
				// this.$nextTick(() => {
				// 	// 2.第二次获取，值不对，原因是:图片没有计算在内
				// 	// 根据最新的数据，对应的DOM是已经被渲染出来
				// 	// 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
				// 	// offsetTop值不对的时候，都是因为图片的问题
				// 	this.themeTopYs = []
				// 	this.themeTopYs.push(0)
				// 	this.themeTopYs.push(this.$refs.params.$el.offsetTop)
				// 	this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
				// 	this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
				// 	console.log(this.themeTopYs)
				// })
				
			})
			// 3.请求推荐数据
			getRecommend().then(res => {
				this.recommends = res.data.list;
				// console.log(res);
			})
		},
		methods: {
			...mapActions(['addCart']),
			imageLoad() {
				this.$refs.scroll.refresh()
				// 使用混入中的防抖函数
				// this.refresh()
				this.getThemeTopY()
			},
			titleClick(index) {
				// console.log(index);
				this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index]-44), 100)
			},
			contentScroll(position) {
				this.isShowBackTop = -(position.y) > 1000;
				// console.log(position)
				// 1.获取Y值
				const positionY = -(position.y - 44)
				
				// 2.positionY和主题中的值进行对比
				// [0, 7938, 9120, 9452]
				// positionY在 0 和 7938 之间，index = 0
				// positionY在 7938 和 9120 之间，index = 1
				// positionY在 9120 和 9452 之间，index = 2
				// positionY大于等于 9452，index = 3
				let length = this.themeTopYs.length;
				// for(let i = 0;i < length; i++) {
				// 	if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || 
				// 	(i === length - 1 && positionY >= this.themeTopYs[i]))) {
				// 		this.currentIndex = i;
				// 		console.log(this.currentIndex)
				// 		this.$refs.nav.currentIndex = this.currentIndex;
				// 	}
				// }
				
				for(let i = 0;i < length-1; i++) {
					if(this.currentIndex !== i && 
					(positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
						this.currentIndex = i;
						// console.log(this.currentIndex)
						this.$refs.nav.currentIndex = this.currentIndex;
					}
				}
				
				
			},
			backClick() {
				this.$refs.scroll.scrollTo(0, 0)
			},
			addToCart() {
				// 1.获取购物车需要展示的信息
				const product = {}
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.realPrice;
				product.iid = this.iid;
				// console.log(product)
				// 2.将商品添加到购物车里
				// this.$store.commit('addCart', product)
				
				// this.$store.dispatch('addCart', product).then(res => {
				// 	console.log(res)
				// })
				
				this.addCart(product).then(res => {
					// console.log(res)
					this.$toast.show(res, 1000)
				})
				
			}
		},
		mounted() {
			// console.log("mounted")
			
		},
		destroyed() {
			this.$bus.$off('itemImgLoad', this.itemImgListener)
		}
	}
</script>

<style scoped>
	#detail {
		height: 100vh;
		background-color: #fff;
		position: relative;
		z-index: 9;
	}
	.detail-nav {
		z-index: 9;
		background-color: #fff;
		/* position: fixed;
		top: 0px;
		right: 0px;
		left: 0px; */
	}
	.content {
		height: calc(100% - 44px - 49px);
		background-color: #fff;
	}
</style>
