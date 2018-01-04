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
		    <h5 style="text-align:center;">别名</h5> 
		  </Col> 
		  <Col span="6">
		    <Input v-model="userdata.alias" placeholder="请输入..."></Input>
		  </Col>
		</Row>
		<Row>
		  <Col span="6">
		    <h5 style="text-align:center;">名称</h5> 
		  </Col> 
		  <Col span="6">
		    <Input v-model="userdata.name" placeholder="请输入..."></Input>
		  </Col>
		</Row>
		<Row>
		<Col span="6">
		    <h5 style="text-align:center;">surname</h5> 
		  </Col> 
		  <Col span="6">
		    <Input v-model="userdata.surname" placeholder="请输入..."></Input>
		  </Col>
		</Row>
		<Row v-show="errmsg">
		  <Col span="6">
		    <h5 style="text-align:center;"></h5> 
		  </Col> 
		  <Col span="6">
		    密码不正确
		  </Col>
		</Row>
		<Row>
		  <Col span="6">
		    <h5 style="text-align:center;">密码</h5> 
		  </Col> 
		  <Col span="6">
		    <Input v-model="userdata.password" placeholder="请输入..." @on-blur="check"></Input>
		  </Col>
		</Row>
		<Row>
		  <Col span="6">
		    <h5 style="text-align:center;" >确认密码</h5> 
		  </Col> 
		  <Col span="6">
		    <Input v-model="userdata.conpwd" placeholder="请输入..."  @on-blur="check"></Input>
		  </Col>
		</Row>
		<Row class="test">  
		    <Col span="6">
		      <h5 style="text-align:center;">群组</h5> 
		    </Col> 
		    <Col span="6">
		      <Select v-model="group"  multiple style="width:650px">
		          <Option v-for="item in groupList" :value="item" :key="item"></Option>
		      </Select>
		    </Col>
		</Row>
		<Row>
		  <Col span="6">
		    <h5 style="text-align:center;">语言</h5> 
		  </Col> 
		  <Col span="6">
		    <Cascader :data="langList" v-model="lang"></Cascader>
		  </Col>
		</Row>  
		<Row>
		<Col span="6">
		    <h5 style="text-align:center; ">主题</h5> 
		  </Col> 
		  <Col span="6" class="test">
		    <Cascader :data="themeList" v-model="theme"></Cascader>
		  </Col>
		</Row>
		<Row>
		<Col span="6">
		    <h5 style="text-align:center;">刷新</h5> 
		  </Col> 
		  <Col span="6">
		    <Input v-model="userdata.refresh" placeholder="30"></Input>
		  </Col>
		</Row>
		<Row>
		<Col span="6">
		    <h5 style="text-align:center;">每页行数</h5> 
		  </Col> 
		  <Col span="6">
		    <Input v-model="userdata.rows_per_page" placeholder="50"></Input>
		  </Col>
		</Row>	
	</div>
</template>

<script>
	export default {
		data(){
			return{
				errmsg: false,
				userdata: {
					alias: '',
			        name: '',
			        surname: '',
			        password: '',
			        conpwd: '',
			        refresh: 30,
	        		rows_per_page: 50      
				},
				groupList: [],
	        	group: [],
			    lang:[],
			    langList: [
			                    {
			                      value: 'en_GB',
			                      label: '英语(en_GB)'
			                    }, 
			                    {
			                      value: 'en_US',
			                      label: '英语(en_US)'
			                    },
			                    {
			                      value: 'zh_CN',
			                      label: '中文(zh_CN)'
			                    },
			                    {
			                      value: 'cs-CZ',
			                      label: '捷克(cs-CZ)'
			                    },
			                    {
			                      value: 'fr_FR',
			                      label: '法语(fr_FR)'
			                    },
			                    {
			                      value: 'it_IT',
			                      label: '意大利语(it_IT)'
			                    }
			                  ],  
			    theme: [],
			    themeList:[
			        {
			          value: 'default',
			          label: '系统默认'
			        }, 
			        {
			          value: 'blue-theme',
			          label: '蓝'
			        },
			        {
			          value: 'dark-theme',
			          label: 'Dark'
			        }
			    ]	
			}
		},
		props: {
			isclick: Boolean,
	        msg: {
	          type: Object,
	          default: function () {
	            return { }
	          }
	        }
    	},
		mounted (){
		    var tempgroup = JSON.parse(sessionStorage.group2id);
		    this.groupList = Object.keys(tempgroup);
		    console.log(tempgroup);
   		},
		methods: { 
			check(){
		        if(this.userdata.password != this.userdata.conpwd){
		          this.errmsg = true;
		        }
		        else{
		          this.errmsg =false;
		        }
		    },
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
				// this.lang = [];
				// this.theme = [];
			}
     	},

	}
</script>