export default {
  install: function (Vue, options) {
    // 添加的内容写在这个函数里面
     Vue.prototype.$formatSeconds = function (s) {
	    var day = Math.floor( s/ (24*3600) ); // Math.floor()向下取整 
		var hour = Math.floor( (s - day*24*3600) / 3600); 
		var minute = Math.floor( (s - day*24*3600 - hour*3600) /60 ); 
		var second = s - day*24*3600 - hour*3600 - minute*60; 
		if(day === 0){
			return hour + "时" + minute + "分" + second +"秒"; 
		}
		else if(day === 0 && hour === 0){
			return  minute + "分" + second +"秒"; 
		}
		else{
			return day +  "天" + hour + "时" + minute + "分" + second +"秒"; 
		}
	}
  }
}; 