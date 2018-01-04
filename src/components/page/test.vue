<style  scoped>
.chart{
    min-height:200px;
  }
p{
    font-size: 19px;

}
.ivu-table td.table-fail{
    background-color: #FFCD14;
}

</style>

<template lang="html">
  <div id="test" class="chart"> 
	 <Card > 
      <p slot="title">
            <Icon type="search"></Icon>
            查询条件
        </p> 
            <Row ype="flex" justify="start" class="code-row-bg"> 
              <Col span="24" style="padding-top:10px;"> 
                <Form  :label-width="80" inline>
                    <Form-item label="平台名称">  
                             <Dropdown trigger="custom" :visible="visible" >
                                <Input v-model="searchBizSystem" @on-change="showBizSystem" @on-blur="handleClose" style='width:150px'></Input>
                                <Dropdown-menu slot="list" style="width:150px">
                                    <div style="margin:-10px 0">
                                    <Table :columns="columns1" :data="tableData1" :show-header="false" @on-row-click="onRowClick" size="small" ></Table>
                                    </div>  
                                </Dropdown-menu>
                               
                            </Dropdown>
                    </Form-item>
                    <Form-item label="最新结果">
                         <Select v-model="searchResultSelect" placeholder="请选择" style="min-width:120px;">
                            <Option v-for="item in searchResult" :value="item.value" :key="item.label">{{item.label}}</Option>
                        </Select>
                    </Form-item> 
                    <Form-item label="目标地址">  
                        <Input v-model="searchItemInput" placeholder="请输入"></Input>
                    </Form-item>
                </Form>
              </Col> 
            </Row>  
     </Card>
     <Row >
        <Col :span="3">
            <Button type="primary" @click="saveModal" style="margin-top:15px">添加监控对象</Button>
       </Col> 
    </Row>     
    <Row style="margin-top:20px">
        <Table :columns="columns" :data="tableData" size="small" :width="tableWidth"></Table>
    </Row>
    <!--两个modal框-->
    <show-log :tempid="totempid" ref="showlogmodal"></show-log>
    <Modal v-model="addModal" @on-ok="ok" title="添加模版" ok-text="保存模版">
                <Form  :label-width="80" :model="formItem"  >
                    <Form-item label="平台名称">
                    <Input v-model="formItem.bizSystem" placeholder="请输入">
                    </Input>
                    </Form-item> 
                    <Form-item label="测试地址">
                    <Input v-model="formItem.input" placeholder="请输入">
                        <Select v-model="select1" slot="prepend" style="width: 80px">
                            <Option value="http://">http://</Option>
                            <Option value="https://">https://</Option>
                        </Select>
                    </Input>
                    </Form-item>
                    <Form-item label="频率">
                         <Select v-model="formItem.freqSelect" placeholder="请选择" style="min-width:120px;">
                            <Option v-for="item in freqList" :value="item.value" :key="item.label">{{item.label}}</Option>
                        </Select>
                    </Form-item>  
                    <Form-item label="测试类型">
                        <Select v-model="formItem.select" placeholder="请选择" style="min-width:120px;" @on-change="showkey">
                            <Option value="1">状态码</Option>
                            <Option value="2" >关键字</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="关键字" v-if="this.showkeyword">
                        <Input v-model="formItem.inputkeyword" placeholder="请输入" style="width:200px"></Input>
                    </Form-item>
                </Form>
    </Modal>
  </div> 
</template>
  
<script>
  import showLog from '../others/showLog'
  export default {
	    data (){
	      return {
                //添加或更新modal框内字段
                formItem: {
                    bizSystem: '',
                    input: '',
                    select: '1',
                    freqSelect: '30',
                    inputkeyword: '',
                    textarea: ''
                },
                freqList: [
                    {
                        value: '5',
                        label: '5秒'
                    },
                    {
                        value: '10',
                        label: '10秒'
                    },
                    {
                        value: '30',
                        label: '30秒'
                    },
                    {
                        value: '60',
                        label: '1分钟'
                    },
                    {
                        value: '300',
                        label: '5分钟'
                    },
                    {
                        value: '600',
                        label: '10分钟'
                    },
                    {
                        value: '1800',
                        label: '30分钟'
                    },
                    {
                        value: '3600',
                        label: '1小时'
                    }
                ],
                temp: '',
                //搜索内字段
                visible: false,
                bizSystemSearchCount: 0,
                columns1: [
                    {
                        title: 'xx',
                        key: 'result'
                    }
                ],
                tableData1:[
                ],
                bizSystemList: [],
                searchResultSelect: '2',
                searchResult: [
                    {
                        value: '2',
                        label: '所有'
                    },
                    {
                        value: '1',
                        label: '成功'
                    },
                    {
                        value: '0',
                        label: '失败'
                    }
                ],
                searchBizSystem: '',
                searchItemInput: '',
                timer: 0,
                tableWidth: 0,
                // apiurl: "http://192.168.1.106:8090/api/templet/",
                // apiurl: 'http://localhost:80/api/templet/',  
                apiurl: 'http://119.23.202.246:8090/api/templet/',
                totempid: {},
                addModal: false,
                modal1: 0,
                modalMsg: 'save',
                columns: [
                    {
                        title: '序号',
                        align: 'left',
                        width: 60,
                        key: 'tempId',
                        fixed: 'left'
                    },
                    {
                        title: '目标地址',
                        key: 'des_address',
                        width: 300, 
                        fixed: 'left'
                    },
                    {
                        title: '平台名称',
                        width: 120,
                        key: 'bizSystem'
                    },
                    {
                        title: '测试类型',
                        key: 'type',
                        width: 100,
                        render: (h,params) => {
                            let word = '状态码';
                            if(this.tableData[params.index].type === '2'){
                                word = '关键字';
                            }
                            return h('p',word);
                        }
                    }, 
                    {
                        title: '关键字',
                        key: 'keyword',
                        width: 250,
                        render: (h,params) => {
                            // console.log();
                            let word = this.tableData[params.index].keyword;
                            if(this.tableData[params.index].type === '1'){
                                word = '200';
                            }
                            return h('p',word);
                        }
                    },
                    {
                        title: '最后一次时间',
                        width: 250,
                        key: 'createDate'
                    },
                    {
                        title: '最后一次结果',
                        width: 350,
                        key: 'last_result'
                    },
                    {
                        title: '频率',
                        key: 'interval',
                        width: 180,
                        render: (h,params) => {
                            let t = this.tableData[params.index].interval
                            if(t === 5){
                                t = '5秒'
                            }
                            else if(t === 10){
                                t = '10秒'
                            }
                            else if(t === 30){
                                t = '30秒'
                            }
                            else if(t === 60){
                                t = '1分钟'
                            }
                            else if(t === 300){
                                t = '5分钟'
                            }
                            else if(t === 600){
                                t = '10分钟'
                            }
                            else if(t === 1800){
                                t = '30分钟'
                            }
                            else if(t === 3600){
                                t = '1小时';
                            }
                            else{
                                t = '30秒';
                            }
                            return h('p',t);
                        } 
                    },
                    {
                        title: '操作',
                        key: 'status',
                        fixed: 'right',
                        width: 270,
                        render: (h, params) => {
                            //2正在执行，1等待执行,0未执行
                            let isStop = true;
                            if(params.row.status === '1' ){
                                isStop = false; //可以点击停止
                            }
                            if(params.row.status === '0'){
                                isStop = true;
                            } 
                            return h('div', 
                                [   
                                     h('Button',
                                        {
                                            props: {
                                                type: 'ghost',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '2px'
                                            },
                                            on: {
                                                click: () => {
                                                    // console.log(params);
                                                    this.showLog(params)
                                                 }
                                            }
                                        },
                                        '查看日志'
                                    ),
                                    h('Button',  
                                        {
                                          props: {
                                            type: 'ghost',
                                            size: 'small'
                                          },
                                          style: {
                                            marginRight: '2px'
                                          },
                                          on: {
                                            click: () => {
                                                this.updateModal(params);
                                            }
                                          }
                                        }, 
                                        '编辑'
                                    ),
                                    h('Button',  
                                        {
                                          props: {
                                            type: 'primary',
                                            size: 'small',
                                            disabled: !isStop
                                          },
                                          style: {
                                            marginRight: '2px'
                                          },
                                          on: {
                                            click: () => {
                                                this.start(params);
                                                this.tableData[params.index].status = '1';
                                            }
                                          }
                                        }, 
                                        '开始'
                                    ),
                                    h('Button', 
                                        {
                                            props: {
                                                type: 'error',
                                                size: 'small',
                                                disabled: isStop
                                            },
                                            style: {
                                                marginRight: '2px'
                                            },
                                            on: {
                                            click: () => {
                                                this.stop(params);
                                                this.tableData[params.index].status = '0';
                                                // console.log("stop");
                                                // console.log(this.tableData);
                                            }
                                          }
                                        }, 
                                        '停止'
                                    ),
                                    h('Button', 
                                        {
                                            props: {
                                                type: 'error',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '2px'
                                            },
                                            on: {
                                            click: () => {
                                                this.confirm(params);
                                            }
                                          }
                                        }, 
                                        '删除'
                                    )
                                   
                                ]); 
                        }
                    }
                ],
                tableData: [],
                select1: 'http://',
                showkeyword: false,
                showArea: false,
                showButton: false,
                timer: 0,
                tempId: ''
             }
        },
        components: {
            showLog
        },
        methods: {
            showkey(e){
                if(e==='2'){
                    this.showkeyword = true;
                }
                else{
                    this.showkeyword = false;
                }               
            },

            start(e){
                let url =  this.apiurl + "test/" + e.row.tempId + "/start";
                this.axios({
                    method: "GET",
                    url: url,
                    headers:{'Content-Type':'application/json'}
                }).then((response) => {
                    // console.log(response);
                }); 
            }, 
            stop(e){ 
                let url =  this.apiurl + "test/" + e.row.tempId + "/stop";
                this.axios({
                    method: "GET",
                    url: url,
                    headers:{'Content-Type':'application/json'}
                }).then((response) => {
                    // console.log(response);
                }); 
            },
            delete(e){
                let url =  this.apiurl + "test/" + e.row.tempId + "/delete";
                this.axios({
                    method: "GET",
                    url: url,
                    headers:{'Content-Type':'application/json'}
                }).then((response) => {
                    this.search();
                }); 
            },
            //搜索平台名称事件
            //点击每行的事件
            onRowClick(e){
                this.searchBizSystem = e.result;
            },
            //Dropdown-menu中的数据
            showBizSystem(){
                this.visible = true;
                if(this.searchBizSystem != ""){
                    if(this.bizSystemSearchCount === 0){
                        let url =  this.apiurl + "/bizSystemList";
                        this.axios({
                            method: "GET",
                            url: url,  
                            headers:{'Content-Type':'application/json'}
                        }).then((response) => {
                            console.log(response);
                            if(response.code === 0){
                                this.bizSystemList = response.bizSystemList;
                                let t = this.bizSystemList.filter(item => item.toLowerCase().indexOf(this.searchBizSystem.toLowerCase()) > -1);
                                this.tableData1 = t.map(item => {
                                    return {
                                        result: item
                                    };
                                });
                                console.log("this.tableData1");
                                console.log(this.tableData1);
                            }
                            this.bizSystemSearchCount++;
                        });
                    }
                    else{
                        let t = this.bizSystemList.filter(item => item.toLowerCase().indexOf(this.searchBizSystem.toLowerCase()) > -1);
                        this.tableData1 = t.map(item => {
                            return {
                                result: item
                            };
                        });
                    }
                }
                else{
                    this.visible = false;
                }
            },
            //input框失去焦点
            handleClose(){
                this.visible = false;
            },
            
            //删除时的弹出框
            confirm(e){
                this.$Modal.confirm({
                    content: '<p>是否删除</p>',
                    onOk: () => {
                        this.delete(e);
                    },
                    onCancel: () => {
                        this.$Message.info('取消了删除');
                    }
                });
            },
            //添加或者更新模版弹出框   
            saveModal(){
                this.modalMsg = 'save';
                this.addModal = true;
                this.select1 = 'http://'; 
                this.formItem.input = '';
                this.formItem.bizSystem = '';
                this.formItem.freqSelect = '10';
                this.formItem.select = '1';
                this.formItem.inputkeyword = '';
                console.log(this.formItem);
            },
            updateModal(params){
                this.modalMsg = 'update';
                this.addModal = true;
                this.formItem.bizSystem = params.row.bizSystem;
                let str = params.row.des_address.split("//");
                this.select1 = str[0] + '//';
                this.formItem.input = str[1];
                this.formItem.freqSelect = params.row.interval.toString();
                this.formItem.select = params.row.type;
                this.formItem.inputkeyword = params.row.keyword;
                this.tempId = params.row.tempId;
            },
            //点击modal框的保存事件
            ok(){
                if(this.modalMsg === 'update'){
                    this.update();
                }
                else{
                    this.save()
                }
            },
            //更新模版信息
            update(){
                let req ={
                    "tempId": this.tempId,
                    "bizSystem": this.formItem.bizSystem,
                    "desAddress":this.select1 + this.formItem.input,
                    "type":this.formItem.select,
                    "keyword":(this.formItem.select === '1') ? '' : this.formItem.inputkeyword,
                    "interval":this.formItem.freqSelect
                };
                console.log(req);
                this.axios({
                    method: "POST",
                    url: this.apiurl + "update",
                    data: req,   
                    headers:{'Content-Type':'application/json'}
                }).then((response) => {
                    // console.log(response) 
                    this.search();
                }) 
            },
            //存模版数据
            save(){
                let req = {
                    'desAddress': this.select1 + this.formItem.input,
                    "bizSystem": this.formItem.bizSystem,  
                    'type': this.formItem.select,
                    'keyword': this.formItem.inputkeyword,
                    'interval': this.formItem.freqSelect,
                    "status": '0'
                }
                console.log(req);
                this.axios({
                    method: "POST",
                    url: this.apiurl + "save",
                    data: req,   
                    headers:{'Content-Type':'application/json'}
                }).then((response) => {
                    // console.log(response);
                    this.search();
                }) 
            },
            //搜索,取模版信息
            search() {
                let temp = '';
                if(this.searchResultSelect === '2'){
                    temp = '';
                }
                else{
                    temp = this.searchResultSelect
                }
                let req = {
                    "page": 1,
                    "limit": 20,
                    "desAddress": this.searchItemInput,
                    "lastStatus": temp,
                    "bizSystem": this.searchBizSystem
                }
                console.log(req);
                this.axios({
                    method: "POST",
                    url: this.apiurl + "list", 
                    data: req,  
                    headers:{'Content-Type':'application/json'}
                }).then((response) => {
                    this.tableData = []; 
                    console.log(response);
                    if(response.msg=== "未知异常，请联系管理员"){
                        alert("暂无数据");
                    }
                    else{
                        response = response.page.list;
                        console.log(response);
                        let temp = {};
                        for(let i=0;i<response.length;i++){
                            temp['bizSystem'] = response[i].bizSystem;
                            temp['tempId'] = response[i].tempId;
                            temp['des_address'] = response[i].desAddress;
                            temp['type'] = response[i].type;
                            temp['keyword'] = response[i].keyword;
                            temp['createDate'] = response[i].lastTempLog ? response[i].lastTempLog.createDate : '';
                            temp['last_result'] = response[i].lastTempLog ? response[i].lastTempLog.result : '';
                            temp['lastStatus']  = response[i].lastStatus;
                            temp['interval'] = response[i].interval; 
                            temp['status'] = response[i].status;
                            if(response[i].lastStatus === 0){
                                temp['cellClassName'] = {
                                    'last_result': 'table-data2-general-serious'
                                }
                            }
                            this.tableData.push(temp);
                            temp = {};
                        }
                    }
                })  
            },
            showLog(e){
                this.$refs.showlogmodal.modalshow = true;
                this.totempid = e.row;
            }        	
        },
        created(){
            this.search();
        },
        mounted(){
            this.tableWidth = document.getElementById("test").offsetWidth;
            setInterval(this.search,10000);
        },
        watch: {
            searchItemInput: function(val){
                this.search();
            },
            searchResultSelect: function(val){
                this.search();
            },
            searchBizSystem:  function(val){
                console.log("searchBizSystem");
                console.log(val);
                this.search();
            },
        },
        beforeDestroy(){
      		clearInterval(this.timer);
    	}
     }
</script>




