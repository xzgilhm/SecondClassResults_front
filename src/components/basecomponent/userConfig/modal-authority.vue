<style  scoped>
	h5{
		margin-top: 7px;
	}
	.ivu-row{
		margin-top: 20px;
	}
</style>

<template>
	<div>
		<Row>
	   	    <Col span="6">
	   	      <h5 style="text-align:center;">用户类型</h5> 
	   	    </Col> 
	   	    <Col span="6">
	   	      <Cascader :data="typeList" v-model="type"></Cascader>
	   	    </Col>
	   	</Row>
	   	<Row>
	   	    <Col span="6">
	   	  		<h5 style="text-align:center;">权限</h5> 
	        </Col> 
	        <Col span="6">
	        </Col>
	    </Row>
	    <Row>
	        <Col span="6">
	          	<h5 style="text-align:center;">信息</h5> 
	        </Col> 
	        <Col span="6">
	       	</Col>
	    </Row>
    </div>
</template>


<script>
	export default{
		data(){
			return {
				type:[],
				typeList: [
	                {
	                  value: "1",
	                  label: '用户'
	                },
	                {
	                  value: "2",
	                  label: '管理员'
	                },
	                {
	                  value: "3",
	                  label: '超级管理员'
	                }
        		]
			} 
		},
		props: {
			isclick: Boolean,
			msg: String
		},
		watch: {
			isclick: function(val,oldVal){
				console.log("auth type"); 
				console.log(this.type);
				if(val){
					this.$emit('auth-data',this.type[0]);
				}
			},
			msg: function(val,oldval){
				this.type = [];
				this.type.push(val);
			}
		}
	}
</script>