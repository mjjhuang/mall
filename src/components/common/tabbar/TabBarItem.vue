<template>
	<div class="tab-bar-item" @click="itemClick">
		<div v-if="!isActive">
			<slot name="item-icon"></slot>
		</div>
		<div v-else>
			<slot name="item-icon-active"></slot>
		</div>
		<!-- <div :class="{active: isActive}" > -->
		<div :style="activeStyle" >	
			<slot name="item-text"></slot>
		</div>
		<!-- 所有的item都展示同一个图片，同一个文字 -->
		<!-- <img src="../../assets/img/tabbar/home.svg" alt=""> -->
		<!-- <div>首页</div> -->
		
	</div>
</template>

<script>
	export default {
		name:'TabBarItem',
		props: {
			path: String,
			activeColor: {
				type: String,
				default: 'red'
			}
		},
		data() {
			return {
				// isActive: true
			}
		},
		computed: {
			isActive() {
				return this.$route.path.indexOf(this.path) !== -1
			},
			activeStyle() {
				return this.isActive ? {color:this.activeColor} : {}
			}
		},
		methods: {
			itemClick() {
				// if(this.$route.path === this.path) return;
				this.$router.replace(this.path).catch(err => {})
			}
		}
	}
</script>

<style>
	.tab-bar-item {
		/* 会对多个flex进行均等分 */
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
	}
	.tab-bar-item img {
		height: 24px;
		width: 24px;
		margin-top: 3px;
		vertical-align: middle;
		margin-bottom: 2px;
	}
	.active {
		/* color: red; */
	}
</style>
