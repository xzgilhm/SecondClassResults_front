<style  scoped>
.chart{
  height:864px;
}
h5{
  float: left;
}
.ivu-form-item{
  margin-bottom: 10px
}

</style>

<template lang="html">
  <div>
    <Modal v-model="modalshow" width="900" :scrollable="true" title="日志信息">
      <Table :columns="columns" :data="tableData" stripe size="small"></Table>
    </Modal>
  </div>
</template> 

<script>

export default{
  props: {
    tempid:{
      type: Object,
      default: function () {
          return { }
        }
    }
  },
  data(){
    return {
        modalshow: false,
        columns: [
          {
            title: '时间',
            key: 'create_date'
          },
          {
            title: '结果',
            key: 'result'
          }
        ],
        id: '',
        tableData: [],
        // apiurl: "http://192.168.1.106:8090/api/templet/"
        apiurl: 'http://119.23.202.246:8090/api/templet/'
    }
  },
  mounted(){
  },
  methods:{ 
    getLog(){
        this.tableData = [];
                let req = {
                    "temp_id": this.tempid.tempId,
                }
                this.axios({
                    method: "POST",
                    url: this.apiurl + "logList", 
                    data: req,  
                    headers:{'Content-Type':'application/json'}
                }).then((response) => {
                    // console.log(response);
                    response = response.page;
                    let temp = {};
                    for(let i=0;i<response.length;i++){
                      temp['create_date'] = response[i].createDate;
                      temp["result"] = response[i].result;
                      this.tableData.push(temp);
                      temp={};
                    }
                    
                })
      },
  },
  watch: {
    //打开modal框时 查询日志
    modalshow: function(val){
      if(val){
        this.getLog();
      }
    }
  }
}
</script>



