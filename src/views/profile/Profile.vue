<template>
	<div class="profile">
		<nav-bar class="nav-bar">
			<template v-slot:center>HXJ商城</template>
		</nav-bar>
		
		<user-info></user-info>
		
		<!-- 由于需要传参的地方太多就没有单独封装 -->
		<section class="account">
			<div class="account-item">
				<div class="number">
					<span class="balance">0.00</span>元
				</div>
				<div class="account-info">我的余额</div>
			</div>
			<div class="account-item">
				<div class="number">
					<span class="balance">0</span>个
				</div>
				<div class="account-info">我的优惠</div>
			</div>
			<div class="account-item">
				<div class="number">
					<span class="balance">0</span>分
				</div>
				<div class="account-info">我的积分</div>
			</div>
		</section>
		
		<!-- 封装成一个整体 -->
		<list-view :list-data="orderList" class="order-list" />
		<list-view :list-data="serviceList" class="service-list" />
		
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import UserInfo from './childComps/UserInfo'
	import ListView from './childComps/ListView'
	
	export default {
		name: 'Profile',
		components: {
			NavBar,
			UserInfo,
			ListView
		},
		data() {
			return {
				orderList: [
					{icon: '#order', iconColor: '#ff8198', info: '我的消息'},
					{icon: '#point', iconColor: '#fc7b53', info:'积分商城'},
					{icon: '#vip', iconColor: '#ffc636', info:'会员卡'}
				],
				serviceList: [
					{icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
					{icon: '#download', iconColor: '#ff8198', info: '下载购物APP'}
				]
			}
		}
	}
</script>

<style scoped>
	.profile {
		background-color: #f2f2f2;
	}
	.nav-bar {
		background-color: var(--color-tint);
		color: #fff;
		font-weight: 700;
	}
	
	.account {
		display: flex;
		font-size: 14px;
		background-color: #fff;
	}
	.account-item {
		flex: 1;
		padding: 15px 20px;
		text-align: center;
		border-right: 1px #eee solid;
	}
	.account-item .balance {
		color: var(--color-tint);
		font-weight: 700;
		font-size: 24px;
	}
	.account-item .account-info {
		margin-top: 8px;
	}
</style>
