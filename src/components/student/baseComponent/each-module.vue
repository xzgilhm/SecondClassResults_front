<style scoped>
	
</style>

<template>
	<Card  style="margin-top:15px">
		<p slot="title" style="text-align:left;font-size:20px">
		{{moduleName}}
		</p>
		<Row v-for="t in typeArray" :key=t.index>
			<!-- 把每一行封装成一个组件 -->
			<each-row :moduleId="moduleId" :typeId="t.typeId" :typeName="t.typeName"  :moduleName="moduleName" 
			:evidenceTitle="t.evidenceTitle" :evidenceId="t.evidenceid" :isExit="isExit" :ref="'row' + t.typeId">
			</each-row>
		</Row>
	</Card>
</template>


<script>
import eachRow from './each-select';
export default {
	components:{
        eachRow
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
		moduleName: String,
		isExit: Boolean
	},
	//通过moduleId获取到typeId、typename、evidenceTitle以及evidenceid
	mounted(){
		this.axios.get('node/findTypeByModule/'+this.moduleId)
		.then((data) => {
			this.typeArray = data.data;
		})
		
	},
	methods: {
		
	}
}
</script>