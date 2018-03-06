<style scoped>
	
</style>

<template>
	<Card  style="margin-top:15px">
		
		<slot slot="title"></slot>

		<Row v-for="t in typeArray" :key=t.index>
			<!-- 编辑页面的行 -->
			<each-edit-row v-if="isExit" :moduleId="moduleId" :typeId="t.typeId" :typeName="t.typeName"  :moduleName="moduleName" 
			:evidenceTitle="t.evidenceTitle" :evidenceId="t.evidenceid" :isExit="isExit" :ref="'row' + t.typeId">
			</each-edit-row>

			<!-- 申请页面的行 -->
			<each-row  v-else :moduleId="moduleId" :typeId="t.typeId"  :evidenceTitle="t.evidenceTitle" :evidenceId="t.evidenceid" :ref="'row' + t.typeId">

				<p slot="typeName"> {{t.typeName}}</p>
				<p slot="evidenceTitle"> {{t.evidenceTitle}} </p>
				
			</each-row> 
		</Row>

	</Card>
</template>


<script>
import eachRow from './each-select';
import eachEditRow from './each-select-edit';
export default {
	components:{
        eachRow,
        eachEditRow
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