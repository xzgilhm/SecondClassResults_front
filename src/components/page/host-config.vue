<style >
	/* h5{
	  margin-top: 7px;
	 }
	 .ivu-row{
	  margin-top: 20px;
	 }
	 .chart{
	  height: 600px;
	 }

	.ivu-tabs .ivu-select-dropdown{top:auto;} 
	.ivu-tabs .ivu-tabs-tabpane{position:relative;}
	.ivu-dropdown-menu {
		position: absolute !important;
	}*/
</style>
<template>
 <!--  <div class="chart" value="name1"> -->
	  <Modal v-model="modalshow" width="700"  :scrollable="true"  @on-ok="addHost" :closable="false">
	      <Tabs >
	        <Tab-pane label="主机">
	            <host :msg="host" ref="hostData"></host>
	        </Tab-pane>
	        <Tab-pane label="模板">
	            <templet :msg="temp" ref="tempData"></templet>
	        </Tab-pane>
	        <Tab-pane label="IPMI">
	            <ipmp :msg="ipmi" ref="ipmiData"></ipmp>
	        </Tab-pane>
	      </Tabs>
	      <!-- <Button type="primary" @click="addHost" style="margin-top:15px;text-align:left">添加</Button> -->
      </Modal>
<!--   </div> -->
  
</template> 

<script>
  import host from '../basecomponent/hostConfig/host.vue' 
  import templet from '../basecomponent/hostConfig/templet.vue'
  import ipmp from '../basecomponent/hostConfig/ipmp.vue' 
  export default {
    data () {
      return {
        host:{},
        temp:{},
        ipmi:{},
        modalshow:false
      
      }
    },
    
    components: {
      host,
      templet,
      ipmp
    }, 
    // props: {
    //   toshow: Number
    // }, 
    mounted (){
      
    }, 
    methods: {

    	addHost(){

    		var host = this.$refs.hostData.hostData.hostName;
    		var name = this.$refs.hostData.hostData.name;
    		
    		if (host == undefined || host == '') {

    			alert("主机名称不能为空");
    			return;
    		}
    		if (name == undefined || name == '' ) {
    			name = host;
    		}

    		var agentHost=[];
    		//获取agent代理程序的接口

    		for(var i in this.$refs.hostData.$refs.host){
    			var obj = new  Object();
    			obj.type = 1;
    			obj.main = 1;
    			obj.useip = 1;
    			obj.dns = "";
    			obj.ip =  this.$refs.hostData.$refs.host[i].host.ip_address;
    			obj.port =  this.$refs.hostData.$refs.host[i].host.port;
    			
    			agentHost.push(obj);
    		}
    		var snmp=[];
    		//获取SNMP接口
    		for(var i in this.$refs.hostData.$refs.snmp){
    			
    			var obj = new  Object();
    			obj.type = 1;
    			obj.main = 1;
    			obj.useip = 1;
    			obj.dns = "";
    			obj.ip =  this.$refs.hostData.$refs.snmp[i].host.ip_address;
    			obj.port =  this.$refs.hostData.$refs.snmp[i].host.port;
    			snmp.push(obj);
    		}

    		if (agentHost.length == 0 && snmp.length == 0) {
    			alert("请配置agent代理程序的接口或SNMP接口");
    			return;
    		}

    		if (agentHost.length >0 && snmp.length >0) {
    			alert("agent代理程序的接口和SNMP接口只能任选其一");
    			return;
    		}
    		
    		var interfaces;
    		if (agentHost.length >0) {
    			interfaces = agentHost;
    		}else {
    			interfaces = snmp;
    		}
    		
    		
    		var groupIds = this.$refs.hostData.groupId;
    		if (groupIds.length == 0) {
    			alert("请选择群组");
    			return;
    		}
    		var groups = [];
    		for (var i = 0; i < groupIds.length; i++) {
    			var obj = new Object();
    			obj.groupid = groupIds[i];
    			groups.push(obj);
    		}
    		
    		//获取模板
    	
    		var templates = [];
    		if (this.$refs.tempData.temp.tempId.length > 0) {
    			for (var i = 0; i < this.$refs.tempData.temp.tempId.length; i++) {
    				var obj = new Object();
	    			obj.templateid = this.$refs.tempData.temp.tempId[i];
	    			
	    			templates.push(obj);
    			}
    		}
    		console.info(templates);
    
	        var req={
	        	"jsonrpc": "2.0",
	          "method": "host.create",
	          "params": {
	             "host": host,
	             "name":name,
	             "description":this.$refs.hostData.hostData.description,
	             "ipmi_authtype":this.$refs.ipmiData.ipmp.authtype,
	             "ipmi_privilege":this.$refs.ipmiData.ipmp.privilege,
	             "ipmi_username":this.$refs.ipmiData.ipmp.userName,
	             "ipmi_password":this.$refs.ipmiData.ipmp.password,
	             "proxy_hostid":this.$refs.hostData.hostData.agent,
	             "groups":groups,
	             "templates":templates,
	             "interfaces":interfaces
	           },
	          "auth": sessionStorage.auth,
	          "id": 1
	        }
	        this.axios({
	          method : "POST",
	          url: "",
	          data: req
	        }).then((response)=>{
	          if(response.error){
	            alert("操作失败:"+response.error.data);
	          }
	          else{
	            alert("操作成功");
	            window.location.reload(); 
	          }
	        });
    	}
      
    },
    watch: {
      
      //开启对话框
      // toshow: function(val){
      //     this.modalshow = true;
      //     this.$emit('showmodal',0);
        	
      // }
    }
  }
</script>