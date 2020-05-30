<template>
	<div class="recommend">
		<div v-for="item in recommends" class="recommend-item">
			<a :href="item.link">
				<img :src="item.image" alt="">
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'RecommendView',
		props: {
			recommends: {
				type: Array,
				default() {
					return []
				}
			}
		}
	}
</script>

<style scpoed>
	.recommend {
		display: flex;
		text-align: center;
		font-size: 12px;
		
		padding: 10px 0 15px;
		border-bottom: 6px solid #eee;
	}
	.recommend-item {
		flex: 1;
	}
	.recommend-item img {
		widows: 60px;
		height: 60px;
		margin-bottom: 10px;
	}	
</style>
