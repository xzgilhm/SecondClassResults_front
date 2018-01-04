<style  scoped>
  .chart{
    height:110%;
  }
  .row{
    margin-top : 25px;
  }
  .col{
    margin-top : 15px;
  }
</style>

<template lang="html">
  <div class="chart">
    <Row class="row">
        <h2>业务平台状态</h2>
        <Table stripe border :columns="columns1" :data="data1"></Table>
    </Row>
    <Row class="row">
        <h2>最新业务拨测失败列表</h2>
        <Table style="height:500px;" stripe border :columns="columns2" :data="data2"></Table>
    </Row> 
    
  </div> 
</template> 

<script>
  export default {
    data() {
      return {
         columns1: [
          {
            title: '平台名称',
            key: 'name'
          },
          {
            title: '业务数量',
            key: 'number'
          },
          {
            title: '不可用数量',
            key: 'unusedNum'
          }
        ],
        data1: [
          {
            name: '天翼阅读',
            number: 10,
            unusedNum: 1
          },
          {
            name: '翼支付',
            number: 12,
            unusedNum: 0
          },
          {
             name: '欢GO',
             number: 7,
             unusedNum: 1
          }
        ],
        columns2: [
          {
            title: '业务名称',
            key: 'serviceName'
          },
          {
            title: '平台名称',
            key: 'platName'
          },
          {
            title: '连续失败次数',
            key: 'failNum'
          },
          {
            title: '最后一次时间',
            key: 'lastTime'
          },
          {
            title: '拨测间隔',
            key: 'moniTime'
          },
        ],
        data2: [
          {
            serviceName: '系统登陆',
            platName: '天翼阅读',
            failNum: 2,
            lastTime: '2017-7-1',
            moniTime: '1h'
          },
          {
            serviceName: '书架查询',
            platName: '天翼阅读',
            failNum: 4,
            lastTime: '2017-7-3',
            moniTime: '1h'
          }
        ]
      }
    }
  }
</script>


