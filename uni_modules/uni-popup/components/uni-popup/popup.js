
<<<<<<< HEAD
export default {
	data() {
		return {
			
		}
=======
export default {
	data() {
		return {
			
		}
>>>>>>> ce7d720ee640acdb2851c1f5a0b1c048322fdd2b
	},
	created(){
		this.popup = this.getParent()
	},
	methods:{
		/**
		 * 获取父元素实例
		 */
		getParent(name = 'uniPopup') {
			let parent = this.$parent;
			let parentName = parent.$options.name;
			while (parentName !== name) {
				parent = parent.$parent;
				if (!parent) return false
				parentName = parent.$options.name;
			}
			return parent;
		},
<<<<<<< HEAD
	}
}
=======
	}
}
>>>>>>> ce7d720ee640acdb2851c1f5a0b1c048322fdd2b
