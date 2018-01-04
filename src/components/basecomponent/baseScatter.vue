<style scoped>
 .chart{
    height:650px;
  }
  .main{
    width:100%; 
    height :550px;
    margin-top: 15px;
  }

</style>
  
<template>
  <div class="chart" style="height:600px;">

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
          return ['磁盘占用率大于80%', '磁盘占用率小于80%'];
        }, 
        type : Array,Object
      },
      titleText : {
        default : '服务器资源利用率',
        type : String
      },
      seriesData : {
        default : function(){
          return [
				    [
					    [93,76,56,'192.168.1.10',81],
					    [43,77.4,65,'192.168.1.12',82],
					    [62,68,55,'192.168.1.13',86],
					    [76,74.7,87,'192.168.1.14',86],
					    [23,75,12,'192.168.1.16',86],
					    [56,77.1,98,'192.168.1.17',86],
					    [64,75.4,56,'192.168.1.18',86],
					    [77,78.1,27,'192.168.1.15',86],
					    [56,57.7,33,'192.168.1.19',86],
					    [75,79.1,77,'192.168.1.20',86],
					    [23,34.9,36,'192.168.1.23',86],
					    [11,12,33,'192.168.1.22',86],
					    [67,75.4,23,'192.168.1.21',86],
					    [98,76.8,76,'192.168.1.24',86],
					    [54,70.8,82,'192.168.1.26',86],
					    [88,69.6,87,'192.168.1.25',86],
					    [98,67.3,19,'192.168.1.27',86],
					    [45,87.7,83,'192.168.1.28',86],
					    [73,75.4,32,'192.168.1.29',86]
				    ],
			    	[
			    		[45,81.8,87,'192.168.1.31',45],
			    		[67,81.7,45,'192.168.1.32',45],
			    		[89,23.9,38,'192.168.1.33',45],
			    		[19,43.5,87,'192.168.1.34',45],
			    		[56,88.8,46,'192.168.1.35',45],
			    		[98,32.9,44,'192.168.1.37',45],
			    		[65,12.1,27,'192.168.1.36',45],
			    		[87,34.8,12,'192.168.1.38',45],
			    		[94,56.8,66,'192.168.1.39',45],
			    		[92,87.5,72,'192.168.1.41',45],
			    		[32,43.4,75,'192.168.1.42',45],
			    		[45,80.7,23,'192.168.1.43',45],
			    		[12,80.6,10,'192.168.1.44',45],
			    		[34,55.6,49,'192.168.1.46',45],
			    		[65,77.3,29,'192.168.1.47',45],
			    		[23,73.13,69,'192.168.1.49',45],
			    		[45,76.5,73,'192.168.1.48',45],
			    		[21,81.4,48,'192.168.1.50',45],
			    		[43,54.1,59,'192.168.1.51',45]
			    	]
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
      // var data =this.legendData;
      this.myChart.setOption({
    backgroundColor: new echarts.graphic.RadialGradient(0, 0, 0, [{
			        offset: 0,
			        color: '#f7f8fa'
			    }, {
			        offset: 1,
			        color: '#cdd0d5'
			    }]),
    title: {
        text: this.titleText
    },
    tooltip: {
    	formatter:function (param) {
                    return '主机：'+param.data[3]+'</br>'
                    	+ '带宽占用率：'+param.data[2]+'%'+'</br>'
                    	+ 'CPU利用率：'+param.data[1]+'%'+'</br>'
                    	+ '内存使用率：'+param.data[0]+'%';
                }
    },
    legend: {
        right: 10,
        data: this.legendData
    },
    xAxis: {
    	name: '内存使用率',
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    yAxis: {
    	name:'CPU利用率',
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        scale: true
    },
    series: [{
        name: '磁盘占用率大于80%',
        data: this.seriesData[0],
        type: 'scatter',
        symbolSize: function (data) {
            return data[2]/2 + 10;
        },
        label: {
            emphasis: {
                show: false,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(251, 118, 123)'
                }, {
                    offset: 1,
                    color: 'rgb(204, 46, 72)'
                }])
            }
        }
    }, {
        name: '磁盘占用率小于80%',
        data: this.seriesData[1],
        type: 'scatter',
        symbolSize: function (data) {
            return data[2]/2 + 10;
        },
        label: {
            emphasis: {
                show: false,
                formatter: function (param) { 
                	console.info(param);
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(129, 227, 238)'
                }, {
                    offset: 1,
                    color: 'rgb(25, 183, 207)'
                }])
            }
        }
    }]
})
    },
    methods: {}
  }
</script>


