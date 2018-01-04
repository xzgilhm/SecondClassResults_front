<style scoped>
	
</style>

<template>
	<Card  style="margin-top:15px">
		<p slot="title" style="text-align:left;font-size:20px">
		{{moduleName}}
		</p>
		<i-form :model="formItem" :label-width="310" inline v-for="t in typeArray" :key=t.index>
		    <Form-item :label="t.typeName">
			    <each-select :moduleId="moduleId" :typeId="t.typeId"></each-select>
			</Form-item>
			<Form-item :label="t.evidenceTitle">
		    	<Upload action="//jsonplaceholder.typicode.com/posts/">
		      		<i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
		    	</Upload>
	    	</Form-item>
		</i-form>
	</Card>
</template>


<script>
import eachSelect from './each-select';
export default {
	components:{
        eachSelect
    },
	data(){
		return{
			formItem: {
            	select: ''
            },
            typeArray: [
            	
            ]
		}
	},
	props: {
		moduleId : {
			type: String,
			default: "0"
		},
		moduleName : String
	},
	mounted(){
		this.axios.get('node/findTypeByModule/'+this.moduleId)
			.then((data) => {
				this.typeArray = data.data;
				console.log(this.typeArray);
			})
	}
}
</script>