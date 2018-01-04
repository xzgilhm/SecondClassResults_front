<style scoped>
  .chart{
    min-height:250px;
  }
</style>

<template>
  <div class="chart">
    <div class="main">
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    props : {
      right:{
        default : 0,
        type :Number,String
      },
      wrong:{
        default : 0,
        type: Number,String
      },
      color:{
        default: function(){
          return ['#FB767B','#19B7CF'];
        },
        type: Array
      },
      color2:{
        default: function(){
          return ['#FF715E','#FFAF51','#FFEE51','#19B7CF'];
        },
        type:Array
      },
      warn:{
        default: function(){
          return [1,1,1,1];
        },
        type: Array
      }
    },
    data() {
      return{
        myChart:{}
      }
    },
    mounted() {
      this.myChart = echarts.init(this.$el);
      this.myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)"
        },
        series: [
          {
            color:this.color,
            name:'详情',
            type:'pie',
            center: ['50%','45%'],
            radius: ['0%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
              }
            },
            data:[
              {value:this.wrong, name:'异常数量'},
              {value:this.right, name:'正常数量'}
            ]
          },
          {
            color: this.color2,
            name: '异常级别',
            type: 'pie',
            radius: ['60%','80%'],
            center: ['50%','45%'],
            data:[
              {value:this.warn[0],name:'一级异常'},
              {value:this.warn[1],name:'二级异常'},
              {value:this.warn[2],name:'三级异常'},
              {value:this.warn[3],name:'正常'}
            ],
            label: {
              normal: {
                show: false,
              }
            },
          }
        ]
      })
    }
  }
</script>


