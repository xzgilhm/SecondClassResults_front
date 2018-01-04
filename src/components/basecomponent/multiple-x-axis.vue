<style scoped>
  .chart{
    height:250px;
    margin-top: 8px;
  }
  .main{
    width:100%;
    height :200px;
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
        type :Number
      },
      wrong:{
        default : 0,
        type: Number
      }
    },
    data() {
      return{
        myChart:{},
        cpudata: [42, 50, 53, 64, 71],
        iodata: [4, 4, 2, 4, 2]
      }
    },
    mounted() {
      this.myChart = echarts.init(this.$el);
      this.myChart.setOption({
        color:['#FB767B','#6772B9'],
        title: {
          text: 'cpu使用率',
          subtext: '数据来自zabbix网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['cpu利用率', 'IO等待'],
          top: '10%'
        },
        grid: {
          left: '3%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            name:'cpu',
            min:0,
            max:100,
            axisLine: {
              lineStyle: {
                color: '#FD5200'
              }
            },
            position: 'top',
            offset: '5'
          },
          {
            type: 'value',
            name:'IO等待',  
            max:10,
            min:0,
            axisLine: {
              lineStyle: {
                color: '#6772B9'
              }
            }
          }
        ],
        yAxis: {
          type: 'category',
          data: ['主机5','主机4','主机3','主机2','主机1']
        },
        series: [
          {
            name: 'cpu利用率',
            type: 'bar',
            data: this.cpudata,
            barGap: '0%',
          },
          {
            name: 'IO等待',
            type: 'bar',
            xAxisIndex: 1,
            data: this.iodata,
          }
        ]
      });
    }
  }
</script>


