<style  scoped>
  .chart{
    height:839px;
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
        <Col span="11" class="col">
            <Table :columns="columns" :data="data1" border stripe>
              <h2 slot="header">天翼阅读</h2>
            </Table>
        </Col>
        <Col span="11" class="col" offset="2">
            <Table :columns="columns" :data="data2" border stripe>
              <h2 slot="header">欢GO网厅组</h2>
            </Table>
        </Col> 
    </Row>
    <Row class="row">
        <Col span="11" class="col">
            <Table :columns="columns" :data="data3" border stripe>
              <h2 slot="header">业务平台一</h2>
            </Table>
        </Col>  
        <Col span="11" class="col" offset="2">
             <Table :columns="columns" :data="data4" border stripe>
              <h2 slot="header">业务平台二</h2>
            </Table>
        </Col>
    </Row> 
    
  </div> 
</template> 

<script>
  export default {
    data(){
      return {
        columns: [
          {
            title: '产品名称',
            key: 'name'
          },
          {
            title: '所在主机',
            key: 'hostGroup'
          },
          {
            title: '访问地址',
            key: 'address'
          },
          {
            title: '技术支持',
            key: 'support'
          },
          {
            title: '监控时间',
            key: 'monitorTime'
          }
        ],
        data1: [
          {
            name:'天翼阅读',
            hostGroup: '182.150.7.254',
            address: '192.168.1.23',
            support: '',
            monitorTime: '2017-6-1'
          },
          {
            name:'天翼阅读',
            hostGroup: '182.150.7.254',
            address: '192.168.1.24',
            support: '',
            monitorTime: '2017-6-1'
          },
          {
            name:'天翼阅读',
            hostGroup: '182.150.7.254',
            address: '192.168.1.25',
            support: '',
            monitorTime: '2017-6-1'
          },
        ],
        data2: [
          {
            name:'欢GO网厅组',
            hostGroup: '182.150.7.254',
            address: '192.168.1.23',
            support: '',
            monitorTime: '2017-6-1'
          },
          {
            name:'欢GO网厅组',
            hostGroup: '182.150.7.254',
            address: '192.168.1.24',
            support: '',
            monitorTime: '2017-6-1'
          },
          {
            name:'欢GO网厅组',
            hostGroup: '182.150.7.254',
            address: '192.168.1.25',
            support: '',
            monitorTime: '2017-6-1'
          },
        ],
        data3: [
          {
            name:'业务平台一',
            hostGroup: '182.150.7.254',
            address: '192.168.1.23',
            support: '',
            monitorTime: '2017-6-1'
          },
          {
            name:'业务平台一',
            hostGroup: '182.150.7.254',
            address: '192.168.1.24',
            support: '',
            monitorTime: '2017-6-1'
          },
          {
            name:'业务平台一',
            hostGroup: '182.150.7.254',
            address: '192.168.1.25',
            support: '',
            monitorTime: '2017-6-1'
          },
        ],
        data4: [
          {
            name:'业务平台二',
            hostGroup: '182.150.7.254',
            address: '192.168.1.23',
            support: '',
            monitorTime: '2017-6-1'
          },
          {
            name:'业务平台二',
            hostGroup: '182.150.7.254',
            address: '192.168.1.24',
            support: '',
            monitorTime: '2017-6-1'
          },
          {
            name:'业务平台二',
            hostGroup: '182.150.7.254',
            address: '192.168.1.25',
            support: '',
            monitorTime: '2017-6-1'
          },
        ]
      }
    }
    
  }
</script>


