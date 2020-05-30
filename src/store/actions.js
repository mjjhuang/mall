import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation-types'

export default {
		addCart(context, payload) {
			// state.cartList.push(payload)
			
			// payload新添加商品,需要先判断是否已存在,存在的话只需将数量加一
			// let oldproduct = null;
			// for(let item of state.cartList) {
			// 	if(item.iid === payload.iid) {
			// 		oldproduct = item;
			// 	}
			// }
			
			return new Promise((resolve, reject) => {
				// 1.查找之前数组中是否有该商品?
				let product = context.state.cartList.find(item => item.iid === payload.iid)
				// 2.判断oldProduct
				if(product) {
					// product.count += 1;
					context.commit(ADD_COUNTER, product)
					resolve("当前的商品数量+1")
				}else {
					payload.count = 1;
					// context.state.cartList.push(payload);
					context.commit(ADD_TO_CART, payload)
					resolve("添加了新的商品")
				}
				// console.log(state.cartList.length)
			})
			
		}
	}