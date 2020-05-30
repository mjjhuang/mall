<template>
	<div>
		<nav-bar class="nav-bar">
			<template v-slot:left>
				<div class="back" @click="backClick">
					<img src="~assets/img/common/back.svg" alt="">
				</div>
			</template>
			<template v-slot:center>
				<div class="title">
					<div v-for="(item, index) in titles" 
							class="title-item" 
							:class="{active: index === currentIndex}"
							@click="titleClick(index)">
						{{item}}
					</div>
				</div>
			</template>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	
	export default {
		name: 'DetailNavBar',
		components: {
			NavBar
		},
		data() {
			return {
				titles: ['商品', '参数', '评论', '推荐'],
				currentIndex: 0
			}
		},
		methods: {
			titleClick(index) {
				this.currentIndex = index;
				this.$emit('titleClick', index)
			},
			backClick() {
				this.$router.back();
				// this.$router.go(-1);
			}
		}
	}
</script>

<style scpoed>
	.nav-bar {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	.title {
		display: flex;
		font-size: 14px;
	}
	.title-item {
		flex: 1;
	}
	.active {
		color: var(--color-high-text)
	}
	.back {
		margin-top: 8px;
	}
</style>
