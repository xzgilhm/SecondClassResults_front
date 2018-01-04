
<template>
	

	<Form :model="hostData" :label-width="80" style="width:600px">
		<Form-item label="主机名称">
           <Input v-model="hostData.hostName" ></Input>
        </Form-item>
        <Form-item label="可见的名称">
           <Input v-model="hostData.name" ></Input>
        </Form-item>
        <!-- <Form-item label="其他群组">
           <Select v-model="groupId" :multiple="true" placeholder="请选择" transfer>
            	<Option v-for="item in groupList"  :value="item.groupid" :key="item.groupid">{{ item.name }}</Option>
            </Select>
        </Form-item> -->
        <div style="display：inline-block;padding-bottom:20px;">
            <label style="width: 80px;height:32px;margin-left:20px;padding-right:9px">其他群组</label>
            <Select v-model="groupId" :multiple="true" placeholder="请选择" style="width:510px">
            	<Option v-for="item in groupList"  :value="item.groupid" :key="item.groupid">{{ item.name }}</Option>
            </Select>
        </div>
        <Form-item label="新的群组">
           <Input v-model="hostData.newGroup" ></Input>
        </Form-item>
        <Form-item label="agent代理程序的接口">
           <div style="border:1px solid #CCCCCC">
		  		<Row style="margin-top:5px">
		  			<inputComp ref="host" v-for="(todo, index) in todos" v-bind:key="index" v-on:remove="todos.splice(index,1)">
		  			</inputComp>
		  		</Row>
		  		<a @click="addInput">添加</a>
		  	</div>
        </Form-item>
		<Form-item label="SNMP接口">
           <div style="border:1px solid #CCCCCC">
		  		<Row style="margin-top:5px">
		  			<inputComp2 ref="snmp" v-for="(todo, index) in snmp" v-bind:key="index" v-on:remove="snmp.splice(index,1)">
		  			</inputComp2>
		  		</Row>
		  		<a @click="add">添加</a>
		  	</div>
        </Form-item>
        <Form-item label="描述">
           <Input v-model="hostData.description" type="textarea" :rows="4"></Input>
        </Form-item>
        <!-- <Form-item label="由agent代理程序监测">
           <Select v-model="hostData.agent" placeholder="请选择">
            	<Option v-for="item in agentList"  :value="item.proxyid" :key="item.proxyid">{{ item.host }}</Option>
            </Select>
        </Form-item> -->
        <div style="display：inline-block;padding-bottom:20px;">
            <label style="width:80px;height:32px;padding-right:7px">由agent<br>代理程序监测</label>
            <Select v-model="hostData.agent" placeholder="请选择" style="width:510px" placement="top">
            	<Option v-for="item in agentList"  :value="item.proxyid" :key="item.proxyid">{{ item.host }}</Option>
            </Select>
        </div>
        <Form-item >
        	<Checkbox v-model="single" label="1">已启用</Checkbox>
        </Form-item>
	</Form>
</template>

<script>
	import inputComp from '../../basecomponent/hostConfig/inputComp.vue'
	import inputComp2 from '../../basecomponent/hostConfig/inputComp2.vue'
	export default {
		data(){
			return {
				hostData: {
					
				},
				todos: [
			      
			    ],
			    snmp:[

			    ],
			    single:true,
			    agentList: [],
			    groupList:[],
			    groupId:[],
			    iAgent:[]
			  
			}
		},
		mounted (){
		    var req = {
	          "jsonrpc": "2.0",
	          "method": "hostgroup.get",
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
	        	this.groupList = response.result;
	         	
	        });
	        
	        var agentReq = {
	          "jsonrpc": "2.0",
	          "method": "proxy.get",
	          "params": {
	             
	           },
	          "auth": sessionStorage.auth,
	          "id": 1
	        }
	        this.axios({
	          method : "POST",
	          url: "",
	          data: agentReq
	        }).then((response)=>{
	        	this.agentList = response.result;
	         	
	        });
 
   		},
   		components: {
                inputComp,
                inputComp2
        },
		methods: { 
		    addInput(){
		    	this.todos.push(inputComp);
		    },
		    add(){
		    	this.snmp.push(inputComp2);
		    }
		},
		watch: {
	      	msg : function(val,oldVal){
	      		// console.log(val);
	      		this.group = [];
        		this.lang = [];
        		this.theme = []
	        	this.userdata = val;
	        	this.group.push(val.group);
	        	this.lang.push(val.lang);
	        	this.theme.push(val.theme);
	        },
	        isclick: function(val,oldVal){
	        	var emitdata = this.userdata;
	        	emitdata['lang'] = (this.lang[0]);
	        	emitdata['theme'] = (this.theme[0]);
	        	console.log("emitdata");
	        	console.log(emitdata); 
				if(val){
					this.$emit('user-data',emitdata);
				}
			}
     	}
	}
</script>