<template>
	<div class="user-info">
		<a href="#" class="clear-fix">
			<slot name="user-icon">
				<svg class="privateImage-svg left">
					<!-- #avatar-default对应svg.vue文件中的id为avatar-default的svg图片 -->
					<use xmlns:xlink = "http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
				</svg>
			</slot>
			
			<div class="login-info left">
				<slot name="user-nickname">
					<div>登录/注册</div>
				</slot>
				<div class="phone">
					<span>
						<svg fill="#fff" class="icon-mobile">
							<use xmlns:xlink = "http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
						</svg>
					</span>
					<slot name="user-phone">暂无绑定手机号</slot>
				</div>
			</div>
			
			<svg fill="#fff" class="arrow-svg right">
				<use xmlns:xlink = "http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
			</svg>
		</a>
	</div>
</template>

<script>
	export default {
		name: 'UserInfo',
		
	}
</script>

<style scoped>
	.user-info {
		background-color: var(--color-tint);
		padding: 15px;
	}
	.user-info .privateImage-svg {
		width: 60px;
		height: 60px;
		background-color: #fff;
		border-radius: 50%;
	}
	.left {
		float: left;
	}
	.user-info .login-info {
		color: #fff;
		margin: 10px 0 0 10px;
	}
	.user-info .login-info .phone {
		position: relative;
		margin-top: 5px;
		margin-left: 15px;
		
		font-size: 13px;
		font-weight: 300;
	}
	.user-info .login-info .phone .icon-mobile {
		width: 12px;
		height: 18px;
		position: absolute;
		top: 0px;
		left: -15px;
	}
	.user-info .arrow-svg {
		width: 11px;
		height: 22px;
		margin-top: 18px;
	}
</style>
