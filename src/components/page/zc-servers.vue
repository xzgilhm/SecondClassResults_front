<style  scoped>
.chart{ 
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
        <Table   :columns="columns" :data="data3"></Table>
      </Col>
       
    </Row>
     
  </div> 
</template>
  
<script>
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
                }
    },
   
  }
</script>




