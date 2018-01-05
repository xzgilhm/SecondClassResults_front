<style scoped>
	
</style>

<template>
	<Card  style="margin-top:15px">
		<p slot="title" style="text-align:left;font-size:20px">
		{{moduleName}}
		</p>
		<i-form :model="formItem" :label-width="310" inline v-for="t in typeArray" :key=t.index>
		    <Form-item :label="t.typeName">
			    <each-select :moduleId="moduleId" :typeId="t.typeId" :ref="'ses'+moduleId">
			    	
			    </each-select>
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
	//接收父组件each-module传过来的moduleId和moduleName
	props: {
		moduleId : {
			type: String,
			default: "0"
		},
		moduleName : String
	},
	//通过moduleId获取到typeId以及typename
	mounted(){
		this.axios.get('node/findTypeByModule/'+this.moduleId)
			.then((data) => {
				this.typeArray = data.data;
				console.log(this.typeArray);
			})
	},
	methods: {
	
	}
}
</script>