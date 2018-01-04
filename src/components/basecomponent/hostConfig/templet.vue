
<template>
	<Form :model="temp" :label-width="80" style="width:600px">
			<div style="display：inline-block">
				<label style="padding-right:10px">链接的模板</label>
				<Select v-model="temp.tempId" multiple placeholder="请选择" style="width:500px">
	            	<Option v-for="item in tempList"  :value="item.templateid" :key="item.templateid">{{ item.name }}</Option>
	            </Select>
			</div>
	</Form>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
				temp:{
					tempId:[]
				},
				tempList:[

				]

			}
		},
		mounted (){
      		var req = {
	          "jsonrpc": "2.0",
	          "method": "template.get",
	          "params": {
	             
	           },
	          "auth": sessionStorage.auth,
	          "id": 1
	        }
	        this.axios({
	          method : "POST",
	          url: "",
	          data: req
	        }).then((response)=>{
	         	this.tempList = response.result;
	        });
    	}

	}
</script>