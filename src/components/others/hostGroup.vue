<style  scoped>
.chart{
  height:864px;
}
</style>

<template lang="html">
  <div>
    <div>
      <Row>
        <Button type="text" @click="back">
                后退
                <Icon type="chevron-left"></Icon>
        </Button>
      </Row>
    </div>
   <!--  <div v-if="flag">
      <h1>{{msg}}</h1>
      <Row type="flex" justify="end" class="code-row-bg">
        <Col>
          <Button @click="showChart">查看图像</Button>
        </Col>
      </Row>
    </div> -->
    <div class="chart" v-if="flag">
      <Row>
          <Col span="12" class="">
              <host-group-data  :myType="1" ></host-group-data>
          </Col>
          <Col span="12">
              <host-group-data  :myType="2"></host-group-data>
          </Col>  
      </Row>
      <Row>
          <Col span="12">
              <host-group-data  :myType="3"></host-group-data>
          </Col>  
          <Col span="12">4</Col>
      </Row>
      <Row type="flex" justify="end" class="code-row-bg">
        <Col>
          <Button @click="showChart">返回</Button>
        </Col>
      </Row>
    </div> 
  </div>
</template> 

<script>
  import hostGroupData from '../basecomponent/hostGroupData' 

  export default {
    data () {
      return {
        flag: true, 
        hostInfo: {},
        msg: ''
      }
    },
    components: {
      hostGroupData
    },
    mounted (){
      // this.ListenToChild()
      this.hostInfo = JSON.parse(sessionStorage.hostInfo);
      this.msg = (this.hostInfo[this.$route.query.name]).zjxx;
    },
    methods: {
      back(){
        this.$router.push("/hostList");
      }
    }
  }
</script>



