<template>
	<swiper>
		<SwiperItem v-for="item in banners">
			<a :href="item.link" alt="">
				<img :src="item.image" alt="" @load="imageLoad">
			</a>
		</SwiperItem>
	</swiper>
</template>

<script>
	import {Swiper,SwiperItem} from 'components/common/swiper'
	
	export default {
		name: 'HomeSwiper',
		props: {
			banners: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				isLoad: false
			}
		},
		components: {
			Swiper,
			SwiperItem
		},
		methods: {
			imageLoad() {
				// console.log("轮播加载")
				if(!this.isLoad) {
					this.$emit("swiperImageLoad");
					this.isLoad = true;
				}
			}
		}
	}
</script>

<style scoped>
	
</style>
