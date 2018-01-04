<template>
	<Row>
		<Col span="20">
	       <Input v-model="host.ip_address" placeholder="IP地址" style="width:150px"></Input>
	       <Input v-model="host.port" placeholder="端口号" style="width:120px"></Input>
	       <input type="radio" name="default"  v-model="host.default">默认</input>
	       <a v-on:click="$emit('remove')">移除</a>
	    </Col>
	</Row>
</template>
<script type="text/javascript">
	export default {
		data(){
			return{
				host:{
					ip_address:'',
					port:'',
					default:"1"
				}
				
			}
			
		}
	}
</script>
