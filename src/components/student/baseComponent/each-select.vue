<style scoped>
	
</style>

<template>

	<i-select  placeholder="请选择" style="width:180px" @on-change="clickOption" label-in-value>
	    <i-option  v-for="item in info" :key="item.id" :value="item.creditid">
	    	{{item.title}}
	    </i-option>
	</i-select>
</template>


<script>
export default {
	data(){
		return{
			info: [],
			selectVal : ''
		}
	},
	//接收父组件each-select传过来的moduleId和typeId
	props: {
		moduleId : {
			type: String,
			default: "0"
		},
		typeId : String
	},
	mounted(){
		this.axios.get('node/findStardByMuduleIdAndTypeId/'+this.moduleId+"&"+this.typeId)
			.then((data) => {
				this.info = data.data;
			})
	},
	methods: {
		clickOption: function(val) {
			console.log(val);
			this.selectVal = val;
		}
	}
}
</script>