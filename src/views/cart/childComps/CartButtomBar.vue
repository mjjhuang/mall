<template>
	<div class="buttom-bar">
		<div class="check-content">
			<check-button class="check-bottom" 
										:is-check="isSelectAll"
										@click.native="checkClick"></check-button>
			<span>全选</span>
		</div>
		<div class="price">
			合计:￥{{totalPrice}}
		</div>
		<div class="calculate" @click="calcClick">
			去计算({{checkLength}})
		</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'
	
	export default {
		name: 'CartButtomBar',
		components: {
			CheckButton
		},
		computed: {
			totalPrice() {
				return this.$store.state.cartList.filter(item => {
					return item.checked
				}).reduce((preValue, item) => {
					return preValue + item.price * item.count
				}, 0).toFixed(2)
			},
			checkLength() {
				return this.$store.state.cartList.filter(item => item.checked).length
			},
			isSelectAll() {
				if(this.$store.state.cartList.length === 0) return false;
				// 1.使用filter
				// return !(this.$store.state.cartList.filter(item => !item.checked).length);
				
				// 2.使用find
				return !this.$store.state.cartList.find(item => !item.checked)
				// 3.普通遍历
				for(let item of this.$store.state.cartList){
					if(!item.checked){
						return false
					}
				}
				return true
			}
		
		},
		methods: {
			checkClick() {
				if(this.isSelectAll) { //全部选中
					this.$store.state.cartList.forEach(item => item.checked = false)
				}else { //部分或全都不选中
					this.$store.state.cartList.forEach(item => item.checked = true)
				}
				
			},
			calcClick() {
				// if(!this.isSelectAll) {
				// 	this.$toast.show('请选择购买的商品', 2000)
				// }
				
				for(let item of this.$store.state.cartList){
					if(item.checked) {
						return;
					}
				}
				this.$toast.show('请选择购买的商品')
			}
		}
	}
</script>

<style scoped>
	.buttom-bar {
		position: fixed;
		bottom: 49px;
		height: 40px;
		
		width: 100%;
		line-height: 40px;
		align-items: center;
		
		background-color: #eee;
		display: flex;
	}
	.check-content {
		display: flex;
		align-items: center;
		width: 80px;
		margin-left: 10px;
	}
	.check-bottom {
		width: 22px;
		height: 22px;
		line-height: 20px;
		margin-right: 5px;
	}
	.price {
		flex: 1;
	}
	.calculate {
		width: 80px;
		text-align: center;
		background-color: var(--color-tint);
	}
</style>
