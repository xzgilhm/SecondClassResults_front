<style scoped>
	
</style>

<template>

	<i-select :model.sync="select" placeholder="请选择" style="width:180px" @on-change="clickOption">
	    <i-option  v-for="item in info" :key="item.index" :value="item.creditid">
	    	{{item.title}}
	    </i-option>
	</i-select>
</template>


<script>
export default {
	data(){
		return{
			select: "",
			info: []
		}
	},
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
		clickOption: function(val){
			console.log(val);
		}
	}
}
</script>