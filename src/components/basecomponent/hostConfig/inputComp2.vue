<template>
	<Row>
		<Col span="20">
	       <Input v-model="snmp.ip_address" placeholder="IP地址" style="width:150px"></Input>
	       <Input v-model="snmp.port" placeholder="端口号" style="width:120px"></Input>
	       <input type="radio" name="default" v-model="snmp.default">默认</input>
	       <a v-on:click="$emit('remove')">移除</a>
	       <Checkbox v-model="snmp.single" label="1">使用大量请求</Checkbox>
	    </Col>
		
	</Row>
</template>
<script type="text/javascript">
	export default {
		data(){
			return{
				snmp:{
					ip_address:'',
					port:'',
					default:'1',
					single: true
				},
				
			}
			
		}
	}
</script>
