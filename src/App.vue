<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #F0F0F0;
  }

  
  .ivu-table .table-data2-serious{
    background-color: #FD5200;
  }
  .ivu-table td.table-data2-general-serious{
    background-color: #FFCD14;
  }
  .ivu-table  td.table-data2-warn{
    background-color: #EFE42A;
  }
  .ivu-table td.table-data2-info{
    background-color: #7499FF;
  }
  .ivu-table  .table-general-serious{
    background-color: #FFCD14;
  }
  .ivu-table  .table-serious{  
    background-color: #FD5200 ;
  }
  .ivu-table td.table-problem{
    background-color: #FFCD14;
  } 


</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

