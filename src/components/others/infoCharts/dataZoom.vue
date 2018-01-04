<style scoped>
.chart{
    height:50px;
    margin-top: 15px;
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
  import Bus from '../../common/js/bus.js'
  import echarts from 'echarts'
  export default {
    data() {
      return{
        myChart:{},
        timeMap: [],
        time: []
      }
    },
    mounted() {
      this.myChart = echarts.init(this.$el);
      this.time = [];
      this.timeMap = [];
      for(let i=24;i>=0;i--){
        let t = Math.round((new Date().getTime()-(i*3600*1000))/1000);
        let d =new Date(parseInt(t) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ") 
        this.time.push(d);
        this.timeMap.push(t);
      }
      console.log(this.time);
      console.log(this.timeMap);
      this.draw();
      this.myChart.on("dataZoom", (params) => {
                  console.log(params);
                  var opt = this.myChart.getOption();
                  var dz = opt.dataZoom[0];
                  var temp = {};
                  temp['startTime'] = this.timeMap[dz.startValue];
                  temp['endTime'] = this.timeMap[dz.endValue];
                  temp['timeMap'] = this.timeMap;
                  temp['end'] = params.end;
                  temp['start'] = params.start;
                  // console.log(tstart); 
                  // console.log(tend);
                  // console.log(temp);
                  Bus.$emit('time',temp);
                });
    },
    methods: {
      draw(){
        this.myChart.setOption({
        color: ['#3398DB'],
        tooltip : {
            show: false,
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis : [
            {
                show: false,
                type : 'category',
                data : this.time,  
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {   
                show: false,
                type : 'value'
            }
        ],
        dataZoom: [
         {
          type: 'slider',
          show: true,
          start: 94,
          end: 100,
          handleSize: 8
          }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                // data:[0, 0, 0, 0, 0, 0, 0]
            }
        ]
      })
      }
    }
  }
</script>


