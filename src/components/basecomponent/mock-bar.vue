<style scoped>
  .chart{
    height:250px;
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
  import echarts from 'echarts'
  export default {
    props : {
      title:{
        default : '',
        type :String
      },
      wrong:{
        default : 0,
        type: Number
      }
    },
    data() {
      return{
        myChart:{},
        opt:{},
        xdata:[],
        ydata:[]
      }
    },
    mounted() {
      this.myChart = echarts.init(this.$el);
      this.getRandomNum();
    },
    methods: {
      draw: function(){
        this.opt={
          color: ['#FB767B'],
          title: {
            text: this.title,
            subtext: '数据来自zabbix网络'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: 10,
            bottom: '0%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'value',
              max:100,
              min:0
            }
          ],
          yAxis: {
            type: 'category',
            data: this.ydata
          },
          series: [
            {
              name: this.title,
              type: 'bar',
              data: this.xdata
            }
          ]
        };
        this.myChart.setOption(this.opt,{
          notMerge : true
        });
        this.xdata=[];
        this.ydata=[];
      },
      getRandomNum: function(){
        var datas = {};
        for(var i=0;i<5;i++){
          datas[i] = {
            value:parseInt(Math.random()*100),
            name: i
          }
        }
        var temp = Object.values(datas)
        function sortvalue(a,b){
            return a.value-b.value;
        }
        temp.sort(sortvalue);
        for(var i=0;i<temp.length;i++){
          this.xdata.push(temp[i].value);
          this.ydata.push('主机' + temp[i].name); 
        }
        this.ydata[0] = 'zabbix_server.platform snmp';
        this.draw();
        setTimeout(this.getRandomNum,15000);
      }
    }
  }
</script>


