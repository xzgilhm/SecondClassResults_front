<style scoped>
 .chart{
    height:400px;
  }
  .main{
    width:100%; 
    height :350px;
    margin-top: 15px;
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
      legendData : {
        default :function(){
          return ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        }, 
        type : Array,Object
      },
      titleText : {
        default : '某站点用户访问来源',
        type : String
      },
      seriesData : {
        default : function(){
          return [
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ]
        }, 
        type : Array
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
        color: ['#08CD5A','#FB767B'],
        title : {
                text: this.titleText,
                x:'center',
                top: '1%'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: '10%',
                data: this.legendData
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '75%',
                    center: ['48%', '50%'],
                    data:this.seriesData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
      })
    },
    methods: {}
  }
</script>


