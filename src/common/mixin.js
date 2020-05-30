import {debounce} from './utils'
import {POP, NEW, SELL} from './const'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
	data() {
		return {
			itemImgListener: null,
			refresh: null
		}
	},
	mounted() {
		// let refresh = debounce(this.$refs.scroll.refresh, 100);
		this.refresh = debounce(this.$refs.scroll.refresh, 100);
		this.itemImgListener = () => {
			this.refresh();
		}
		this.$bus.$on('itemImageLoad', this.itemImgListener)
		// console.log("我是混入中的内容")
	}
}

export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	
}

export const tabControlMixin = {
	data() {
		return {
			currentType: POP
		}
	},
	methods: {
		tabClick(index) {
			switch(index) {
				case 0:
					this.currentType = POP;
					break;
				case 1:
					this.currentType = NEW;
					break;
				case 2:
					this.currentType = SELL;
					break;
			}
			console.log(this.currentType)
		}
	}
}
