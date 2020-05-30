<template>
	<div class="cart">
		<!-- 导航 -->
		<nav-bar class="cart-nav">
			<template v-slot:center>
				购物车({{cartLength}})
			</template>
		</nav-bar>
		<!-- 商品的列表 -->
		<scroll class="content" ref="scroll">
			<cart-list />
		</scroll>
		
		<!-- 底部汇总 -->
		<cart-buttom-bar></cart-buttom-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import CartList from './childComps/CartList'
	import CartButtomBar from './childComps/CartButtomBar'
	
	import Scroll from 'components/common/scroll/Scroll'
	import { mapGetters } from 'vuex'
	
	export default {
		name: 'Cart',
		components: {
			NavBar,
			CartList,
			CartButtomBar,
			Scroll
		},
		computed: {
			// cartLength() {
			// 	// return this.$store.state.cartList.length
			// 	return this.$store.state.getters.length
			// }
			// 两种语法
			...mapGetters(['cartLength'])
			// ...mapGetters({
			// 	length: 'cartLength',
			// 	list: 'cartList'
			// })
		},
		activated() {
			this.$refs.scroll.refresh()
		}
	}
</script>

<style scoped>
	.cart {
		height: 100vh;
		position: relative;
	}
	.cart-nav {
		color: #fff;
		background-color: var(--color-tint);
	}
	.content {
		/* height: calc(100% - 89px);
		overflow: hidden;
		margin-top: 44px; */
		
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 89px;
		left: 0;
		right: 0;
	}
</style>
