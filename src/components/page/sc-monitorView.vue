<style  scoped>
.chart{
    height:864px;
  }

</style>

<template lang="html">
  <div class="chart">

    <Row class="row">
      <Col span="12"> 
        <pie :legendData="legenddata2" :titleText="title2" :seriesData='seriesdata2'></pie> 
      </Col>
      <Col span="12"> 
        <pie :legendData="legenddata1" :titleText="title1" :seriesData='seriesdata1'></pie> 
      </Col>
    </Row>
    <Row class="row">
      <Table height="400" :columns="columns" :data="data3" border>
        <h2 slot="header">异常列表</h2>
      </Table>
    </Row>
    
  </div> 
</template> 
  
<script>
  import pie from '../basecomponent/pie' 

  export default {
    data (){
      return {
        legenddata1 : ['已完成监控','未完成监控'],
        title1 : '业务监控覆盖率',
        seriesdata1 : [
          {
            value : 61, 
            name : '已完成监控'
          },
          {
            value : 39,
            name : '未完成监控'
          }
        ],
        legenddata2 : ['正常','异常'],
        title2 : '业务运行状态',
        seriesdata2 : [
          {
            value : 95, 
            name : '正常'
          },
          {
            value : 5,
            name : '异常'
          }
        ],
        columns: [
          {
            title: '异常名',
            key: 'name'
          },
          {
            title: '详情',
            key: 'msg'
          }
        ],
        data3: [
          {
              name: '异常1',
              msg: 'xxxxx'
          },
          {
              name: '异常2',
              msg: 'xxxxx'
          },
          {
              name: '异常3',
              msg: 'xxxxx'
          },
          {
              name: '异常4',
              msg: 'xxxxx'
          },
          {
              name: '异常5',
              msg: 'xxxxx'
          },
          {
              name: '异常6',
              msg: 'xxxxx'
          },
          {
              name: '异常7',
              msg: 'xxxxx'
          },
          {
              name: '异常8',
              msg: 'xxxxx'
          }
        ]  

      }
    },
    components: {
      pie
    }
  }
</script>




