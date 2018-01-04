<style  scoped>
.chart{
    height:1000px;
  }

</style>

<template lang="html">
  <div class="chart">

    <Row>
      <Col span="24" style="padding-top:10px;"> 
        <Form  :label-width="80" :model="formItem"  inline>
          <Form-item label="主机名">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="群组">
            <Select v-model="formItem.select" placeholder="请选择" style="min-width:120px;">
                <Option value="beijing">A服务器组</Option>
                <Option value="shanghai">B服务器组</Option>
                <Option value="shenzhen">C服务器组</Option>
            </Select>
        </Form-item>
        <Form-item label="录入日期">
            <Row>
                <Col span="11">
                    <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <Time-picker type="time" placeholder="选择时间" v-model="formItem.time"></Time-picker>
                </Col>
            </Row>
        </Form-item>
      </Form>
      </Col> 
    </Row>
    
    <Row>
      <Col span="24"> 
        <Table height="600" :columns="columns" :data="data3"></Table>
      </Col>
       
    </Row>
    
     
  </div> 
</template>
  
<script>
  import scatter from '../basecomponent/baseScatter' 

  export default {
    data (){
      return {
                 formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                },  
        columns: [
          {
            title: '主机名称',
            key: 'name'
          },
          {
            title: '归属群组',
            key: 'group'
          },
          {
            title: '监控项',
            key: 'jkx'
          } ,
          {
            title: '触发器',
            key: 'cfq'
          } ,
          {
            title: '应用模版',
            key: 'yymb'
          } ,
          {
            title: '状态',
            key: 'status'
          } ,
          {
            title: '监控方式',
            key: 'jkfs'
          },
          {
            title: '主机信息',
            key: 'zjxx'
          }
        ],
        data3: [
          {
              name: '192.168.1.23',
              group: '天翼阅读服务器组',
              jkx: '23',
              cfq: '12',
              yymb: '通用模版1',
              status: '启用',
              jkfs: 'SMNP',
              zjxx: ''
          },
          {
              name: '192.168.1.24',
              group: '天翼阅读服务器组',
              jkx: '23',
              cfq: '12',
              yymb: '通用模版1',
              status: '启用',
              jkfs: 'SMNP',
              zjxx: ''
          },
          {
              name: '192.168.1.25',
              group: '天翼阅读服务器组',
              jkx: '23',
              cfq: '12',
              yymb: '通用模版1',
              status: '启用',
              jkfs: 'SMNP',
              zjxx: ''
          },
          {
              name: '192.168.1.56',
              group: '欢GO网厅组',
              jkx: '33',
              cfq: '14',
              yymb: '通用模版2',
              status: '启用',
              jkfs: 'SMNP',
              zjxx: ''
          },
          {
              name: '192.168.1.57',
              group: '欢GO网厅组',
              jkx: '33',
              cfq: '14',
              yymb: '通用模版2',
              status: '启用',
              jkfs: 'SMNP',
              zjxx: ''
          }
          ]
      }
    },
    components: {
      scatter
    }
  }
</script>




