<template>
	<div id="home">
		<nav-bar class="home-nav">
			<!-- <div slot="center">购物街</div> -->
			<template v-slot:center>
				购物街
			</template>
		</nav-bar>
		<tab-control :titles="['流行','新款','精选']"
									@tabClick="tabClick"
									ref="tabControl1"
									class="tab-control"
									v-show="isTabFixed" />
		<scroll class="content" ref="scroll" 
						:probe-type="3" 
						@scroll="contentScroll"
						:pull-up-load="true"
						@pullingUp="loadMore">
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
			<recommend-view :recommends="recommends" />
			<feature-view />
			<tab-control :titles="['流行','新款','精选']" 
										@tabClick="tabClick"
										ref="tabControl2" />
			<goods-list :goods="showGoods" />
		</scroll>
		<!-- 监听组件根元素的原生事件 -->
		<back-top @click.native="backClick" v-show="isShowBackTop" />
	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'
	
	import NavBar from 'components/common/navbar/NavBar'
	import TabControl from 'components/content/tabControl/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import Scroll from 'components/common/scroll/Scroll'
	import BackTop from 'components/content/backTop/BackTop'
	
	import {getHomeMultidata, getHomeGoods} from 'network/home'
	import {debounce} from 'common/utils'
	
	export default {
		name: 'Home',
		components: {
			HomeSwiper,
			RecommendView,
			FeatureView,
			NavBar,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
		},
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					'pop': {page: 0,list: []},
					'new': {page: 0,list: []},
					'sell': {page: 0,list: []},
				},
				currentType: 'pop',
				isShowBackTop: false,
				tabOffsetTop: 0,
				isTabFixed: false,
				saveY: 0,
				itemImgListener: null
			}
		},
		created() {
			// 1.请求多个数据
			this.getHomeMultidata();
		
			// 2.请求商品数据
			this.getHomeGoods('pop');
			this.getHomeGoods('new');
			this.getHomeGoods('sell');
			
		},
		activated() {
			this.$refs.scroll.refresh()
			this.$refs.scroll.scrollTo(0, this.saveY, 0);
		},
		deactivated() {
			// 1.保存Y值
			this.saveY = this.$refs.scroll.getScrollY()
			// console.log(this.saveY)
			// 2.取消全局事件的监听
			this.$bus.$off('itemImgLoad', this.itemImgListener)
		},
		mounted() {
			// 3.监听item中的图片加载完成
			let refresh = debounce(this.$refs.scroll.refresh, 100);
			
			// 对监听的事件进行保存
			this.itemImgListener = () => {
				refresh();
			}
			this.$bus.$on('itemImageLoad', this.itemImgListener)
			// this.$bus.$on('itemImageLoad', () => {
			// 	// console.log("-----")
			// 	// this.$refs.scroll.refresh()
			// 	// this.$refs.scroll && this.$refs.scroll.refresh()
			// 	refresh()
			// })
			
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		methods: {
			// 事件监听相关的方法
			tabClick(index) {
				// console.log(index);
				switch(index) {
					case 0:
						this.currentType = 'pop';
						break;
					case 1:
						this.currentType = 'new';
						break;
					case 2:
						this.currentType = 'sell';
						break;
				}
				// 让两个tab-control的currentIndex保持一致
				this.$refs.tabControl1.currentIndex = index;
				this.$refs.tabControl2.currentIndex = index;
			},
			backClick() {
				this.$refs.scroll.scrollTo(0, 0)
			},
			contentScroll(position) {
				// console.log(position);
				// 1.判断BackTop是否显示
				this.isShowBackTop = (-position.y) > 1000
				// 2.决定tabControl是否吸顶(position: fixed)
				this.isTabFixed = (-position.y) > this.tabOffsetTop;
			},
			loadMore() {
				console.log("上拉加载更多")
				this.getHomeGoods(this.currentType);
			},
			swiperImageLoad() {
				// 4.获取tabControl的offsetTop
				// 所有的组件都有一个属性$el,用于获取组件中的元素
				// console.log(this.$refs.tabControl.$el.offsetTop);
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
			},
			// 网络请求相关的方法
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					// console.log(res);
					this.banners = res.data.banner.list;
					this.recommends = res.data.recommend.list;
				})
			},
			getHomeGoods(type) {
				// good是一个对象，但是type是一个变量，所以这里用[]形式而不是.的形式
				const page = this.goods[type].page + 1;
				getHomeGoods(type, page).then(res => {
					// console.log(res);
					this.goods[type].list.push(...res.data.list);
					this.goods[type].page += 1;
					
					this.$refs.scroll.finishPullUp()
				})
			}
			
		}
	}
</script>

<style scoped>
	#home {
		/* padding-top: 44px; */
		/* padding-bottom: 50px; */
		height: 100vh;
		position: relative;
	}
	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
		
		/* 在使用浏览器原生滚动时，为了让导航不跟着一起滚动 */
		/* position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: 9; */
	}
	/* .tab-control {
		未达到某个值是相当于static，达到某个值时就修改为fixed
		position: sticky;
		top: 44px;
		z-index: 9;
	} */
	.content {
		/* height: calc(100% - 93px); */
		/* overflow: hidden; */
		/* margin-top: 44px; */
		
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	.tab-control {
		position: relative;
		z-index: 9;
	}
</style>
