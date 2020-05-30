<template>
	<div class="category">
		<nav-bar class="nav-bar">
			<template v-slot:center>
				商品分类
			</template>
		</nav-bar>
		
		<div class="content">
			<tab-menu :categories="categories" @selectItem="selectItem" />
			
			<scroll class="tab-content">
				<div>
					<tab-content-category :subcategories="showSubcategory" />
					<tab-control :titles="['综合', '新品', '销量']"
												@tabClick="tabClick"/>
					<tab-content-detail :category-detail="showCategoryDetail" />
				</div>	
			</scroll>
		</div>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import TabMenu from './childComps/TabMenu'
	import TabContentCategory from './childComps/TabContentCategory'
	import TabControl from 'components/content/tabControl/TabControl'
	import TabContentDetail from './childComps/TabContentDetail'
	
	import Scroll from 'components/common/scroll/Scroll'
	import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
	import {POP, SELL, NEW} from 'common/const'
	import {tabControlMixin} from 'common/mixin'
	
	export default {
		name: 'Category',
		data() {
			return {
				categories: [],
				categoryData: [],
				currentIndex: -1
			}
		},
		mixins: [tabControlMixin],
		components: {
			NavBar,
			TabMenu,
			TabContentCategory,
			TabControl,
			TabContentDetail,
			Scroll
		},
		created() {
			// 1.请求分类数据
			this.getCategory()
		},
		mounted() {
			
		},
		computed: {
			showSubcategory() {
				if(this.currentIndex === -1) return {}
				return this.categoryData[this.currentIndex].subcategories;
			},
			showCategoryDetail() {
				if(this.currentIndex === -1) return []
				console.log(this.categoryData[this.currentIndex].categoryDetail[this.currentType])
				return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
				// let detail = this.categoryData[this.currentIndex].categoryDetail[this.currentType]
				// let arr = []
				// for(let i=0; i< detail.length; i++) {
				// 	arr.push(detail[i])
				// }
				
			}
		},
		methods: {
			getCategory() {
				getCategory().then(res => {
					// console.log(res)
					// 1.获取分类数据
					this.categories = res.data.category.list;
					// 2.初始化每个类别的子数据
					for(let i = 0; i< this.categories.length; i++) {
						this.categoryData[i] = {
							subcategories: {},
							categoryDetail: {
								'pop': [],
								'new': [],
								'sell': []
							}
						}
					}
					// 3.请求第一个分类的数据
					this.getSubcategories(0);
				})
			},
			getSubcategories(index) {
				this.currentIndex = index;
				const mailkey = this.categories[index].maitKey;
				getSubcategory(mailkey).then(res => {
					// console.log(res);
					this.categoryData[index].subcategories = res.data
					this.categoryData = {...this.categoryData}
					this.getCategoryDetail(POP);
					this.getCategoryDetail(SELL);
					this.getCategoryDetail(NEW);
				})
			},
			getCategoryDetail(type) {
				// 1.获取请求的miniWallkey
				const miniWallkey = this.categories[this.currentIndex].miniWallkey;
				// 2.发送请求，传入miniWallkey和type
				getCategoryDetail(miniWallkey, type).then(res => {
					// 3.将获取的数据保存下来
					// console.log(res);
					this.categoryData[this.currentIndex].categoryDetail[type] = res;
					this.categoryData = {...this.categoryData}
				})
			},
			// 左侧导航栏的点击事件响应的相关方法
			selectItem(index) {
				this.getSubcategories(index)
			}
		}
	}
</script>

<style scoped>
	.category {
		height: 100vh;
		position: relative;
	}
	.nav-bar {
		background-color: var(--color-tint);
		color: #fff;
		font-weight: 700;
		/* position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: 9; */
	}
	.content {
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		
		display: flex;
	}
	.tab-content {
		height: 100%;
		flex: 1;
	}
</style>
