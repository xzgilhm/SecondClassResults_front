<style  scoped>
.chart{
    height:1000px;
  }

</style>

<template lang="html">
  <div class="chart">

    <Row>
      <Col span="24"> 
       <scatter ></scatter>
        
      </Col>

    </Row> 
     
  </div> 
</template>
  
<script>
  import scatter from '../basecomponent/baseScatter' 

  export default {
    data (){
      return {  }
    },
    components: {
      scatter
    }
  }
</script>




