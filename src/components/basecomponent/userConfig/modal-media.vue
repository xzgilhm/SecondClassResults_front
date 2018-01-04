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
		<div v-show="show">
            <Table :columns="columns" :data="dataTable" no-data-text="暂无"></Table>
            <Row type="flex" justify="end" class="code-row-bg">
              <Col>
                <Button type="primary" @click="showTable" style="margin-top:15px">添加</Button>
              </Col>
            </Row>
          </div>
          <div v-show="!show">
            <Row>
            <Col span="6">
                <h5 style="text-align:center;">类型</h5> 
              </Col> 
              <Col span="6">
                <Cascader :data="mediaList" v-model="media"></Cascader>
              </Col>
            </Row>
            <Row>
            <Col span="6">
                <h5 style="text-align:center;">收件人</h5> 
              </Col> 
              <Col span="6">
                <Input v-model="sendto" placeholder="请输入..."></Input>
              </Col>
            </Row>
            <Row>
            <Col span="6">
                <h5 style="text-align:center;">监控时间段</h5> 
              </Col> 
              <Col span="6">
                <Input v-model="period" placeholder="请输入..."></Input>
              </Col>
            </Row>
            <Row>
            <Col span="6">
                <h5 style="text-align:center;">报警条件</h5> 
              </Col> 
              <Col span="18">
                <Checkbox-group v-model="serious">
                  <Checkbox label="未分类"></Checkbox>
                  <Checkbox label="信息"></Checkbox>
                  <Checkbox label="警告"></Checkbox>
                  <Checkbox label="一般严重"></Checkbox>
                  <Checkbox label="严重"></Checkbox>
                  <Checkbox label="灾难"></Checkbox>
                </Checkbox-group>
              </Col>
            </Row>
            <Row type="flex" justify="end" class="code-row-bg">
              <Col span="3">
                <Button type="text"  @click="notSave">取消</Button>
              </Col>
              <Col>
                <Button type="primary"  @click="addOrUpdateMedia">确认</Button>
              </Col>
            </Row>
          </div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				show: true,
				columns: [
		            {
		              title:'类型',
		              key:'type'
		            },
		            {
		              title:'收件人',
		              key:'sendto'
		            },
		            {
		              title:'监控时间段',
		              key:'period'
		            },
		            {
		              title:'报警条件',
		              key:'severity'
	            	},
	            	{
						title: '操作',
			            key: 'action',
			            width: 130,
			            align: 'center',
			            render: (h, params) => {
			                return h('div', [
			                    h('Button', {
			                      props: {
			                        type: 'primary',
			                        size: 'small'
			                      },
			                      style: {
			                        marginRight: '5px'
			                      },
			                      on: {
			                        click: () => {
			                        	this.flag = 1;
			                          	this.showTable(params)
			                        }
			                      }
			                    }, '修改'),
			                    h('Button', {
			                      props: {
			                        type: 'error',
			                        size: 'small'
			                      },
			                      on: {
			                        click: () => {
			                          this.deleteMedia(params.row)
			                        }
			                      }
			                      }, '删除')
			                 ]);
	            		}
	            	}
	            	],
        		dataTable: [],
        		media: ["1"],
		        mediaList:[
		          {
		            value: '1',
		            label: 'email'
		          },
		          {
		            value: '2',
		            label: 'Jabber'
		          },
		          {
		            value: '3',
		            label: 'SMS'
		          }
		        ],
		        sendto: '',
		        period: '1-7,00:00-24:00',
		        serious: [],
		        medias: [],
		        flag: 0,
		        tableindex: 0
			}
		},
		props: {
			userid: String
		},
		mounted (){
			
    	},
		methods: {
			showTable(params){  
				console.log(params);
				this.tableindex = params.index;
	        	this.show = !this.show;
	      	},
	      	notSave(){
	        	this.show = !this.show
	      	},
	      	addOrUpdateMedia(){
	      		if(this.flag === 1){
	      			console.log("updateMedia");
	      			this.updateMedia();
	      		}
	      		else{
	      			console.log("addssMedia");
	      			this.addMedia();  
	      		}     
	      		this.flag = 0;
		        this.show = !this.show;
	      	},
	      	//查询报警媒介数据
		    getMedia(){
		    	var req = {
		    		"jsonrpc": "2.0",
				    "method": "usermedia.get",
				    "params": {
				        "output": "extend",
				        "userids": this.userid
				    },
				    "auth": sessionStorage.auth,
				    "id": 1
		    	};
		    	this.axios({
		            method : "POST",
		            url: "",
		            data: req
	          	}).then((response)=>{
	          		if(response.error){
		            	alert("查找失败");
		            }
		            else{
		            	response = response.result;
		            	// console.log("getMedia");
		            	// console.log(response);
		            	for(var i=0;i<response.length;i++){
		            		var temp = {};
		            		temp['mediaid'] = response[i].mediaid;
			            	temp['type'] = (this.mediaList[(response[i].mediatypeid-1)]).label;
				        	temp['sendto'] = response[i].sendto; 
				        	temp['period'] = response[i].period;
				        	temp['severity'] = response[i].severity;
				        	this.dataTable.push(temp);
		            	}
		            }
	          	});
	        },  
	      	//添加报警媒介
	      	addMedia(){
		        var medias={
					mediatypeid: this.media[0],
		            sendto: this.sendto,
		            active: 0,
		            severity: "63",
		            period: this.period
	        	};
	        	var mediaReq = {
		            "jsonrpc": "2.0",
		            "method": "user.addmedia",
		            "params": {
		                "users": [
		                    {
		                        "userid":this.userid
		                    }
		                  ],
		                "medias": medias
		            },
		            "auth": sessionStorage.auth,
		            "id": 1
          		}
          		this.axios({
		            method : "POST",
		            url: "",
		            data: mediaReq
		        }).then((response)=>{
		            console.log(response);
		            if(response.error){
		            	alert(response.error.message);
		            }
		            else{
		            	var temp ={};
				        temp['type'] = (this.mediaList[(this.media[0]-1)]).label;
				        temp['sendto'] = this.sendto;
				        temp['period'] = this.period;
				        temp['severity'] = this.serious[0];
				        this.dataTable.push(temp);
		            }
		        });
		    },
	        //更新报警媒介
	        updateMedia(){
	        	//处理数据
	        	var temp = this.dataTable[this.tableindex];
	        	temp['type'] = (this.mediaList[(this.media[0]-1)]).label;
				temp['sendto'] = this.sendto;
				temp['period'] = this.period;
				temp['severity'] = "63";
				var sendmsg = [];
				for(var i =0 ;i<this.dataTable.length;i++){
					var t = {};
					t["period"] = this.dataTable[i].period;
					t["sendto"] = this.dataTable[i].sendto;
					t["active"] = 0;
					t["severity"] = 63;
					if(this.dataTable[i].type === "email"){
						t["mediatypeid"] = "1";
					}
					else if(this.dataTable[i].type === "Jabber"){
						t["mediatypeid"] = "2"
					}
					else{
						t["mediatypeid"] = "3"
					}
					sendmsg.push(t);
				}
				console.log(sendmsg);
	        	var req = {
		            "jsonrpc": "2.0",
		            "method": "user.updatemedia",
		            "params": {
		                "users": [
		                    {
		                        "userid": this.userid 
		                    }
		                ],
        				"medias" : sendmsg
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
		            	alert(response.error.message);
		            }
		            else{
		            	this.dataTable = [];
		            	this.getMedia();
		            }
		        });
	        },
	        //删除报警媒介  
	        deleteMedia(params){
	        	console.log(params);
	        	var sendto = [];
	        	sendto.push(params.mediaid);
	        	console.log(sendto);
	        	var req = {
	        		"jsonrpc": "2.0",
				    "method": "user.deletemedia",
				    "params": sendto,
				    "auth": sessionStorage.auth,
				    "id": 1
	        	};	
	        	this.axios({
		            method : "POST",
		            url: "",
		            data: req
		        }).then((response)=>{
		        	console.log(response);
		            // if(response.error){
		            // 	alert(response.error.message);
		            // }
		            // else{
		            // }
		            //删除动画
	        		this.dataTable.splice(params._index, 1);
		        });
	        }
		},
		watch: {
			//对不同的userid进行处理
			userid: function(val,oldVal){
				this.dataTable = [];
				this.getMedia();
			}
		} 
	}
</script>