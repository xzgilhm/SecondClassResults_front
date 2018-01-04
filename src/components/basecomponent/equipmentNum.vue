<style  scoped>
 h3{
   margin-top: -25px;
   color : red;
 }  
</style>

<template lang="html">
  <div>
   <h3>{{msg}}</h3>
  </div>
</template>
  
<script>
  export default {
    data (){
      return {
        msg: ""
       }
    },
    props: {
      'ename': [String],
    },
    mounted() {
      var id = "";
      if(this.ename === "服务器"){
        id = "22";
      }
      else if(this.ename === "交换机" ){
        id = "16";
      }
      else if(this.ename === "路由器"){
        id = "25";
      }
      else if(this.ename === "防火墙"){
        id = "26"
      }
      else{
        id = "0"
      }
      this.getHostName(id); 
    },
    methods: {
      getHostName: function(id){
          var req = {
              "jsonrpc": "2.0",
              "method": "host.get",
              "params": {
                "output": "extend",
                "groupids":id
              },
              "auth": sessionStorage.auth,
              "id": 1
          };
          this.axios({
            method: "POST",
            url: "",
            data: req
          }).then((response)=>{
            console.log(response);
            this.msg = this.ename + "(" + response.result.length + ")";
          })
      }
    }
  }
</script>




