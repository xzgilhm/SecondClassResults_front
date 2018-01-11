<style>

</style>

<template>
	<div>
		<Row type="flex" justify="center">
			<i-col span="16" v-for="moduleItem in moduleList" :key="moduleItem.id">
				<each-module :moduleId="moduleItem.id" :moduleName="moduleItem.modulename" :isExit="isExit" :ref="'mod'+ moduleItem.id">
                </each-module>
			</i-col> 

            <i-col span="16">
                <i-button type="primary" style="margin-top:15px" @click="editInfo"> 
                    修改 
                </i-button>
            </i-col>
		</Row>


	</div>
	
	
</template>

<script>
	import vHeader from '../common/header';
	import eachModule from '../applicant/baseComponent/each-module';
	export default {
		components:{
            vHeader,
            eachModule 
        },

        data(){
        	return {
        		moduleList: [],
                isExit: true
        	}
        },
        mounted(){
        	var auth = JSON.parse(sessionStorage.getItem('auth'));
            this.axios.get('userSubmit/clearMap');
        	//查询每一个module
        	this.axios({
        		method: "GET",
        		url: "/userSubmit/edit/findModule/" + auth.id
        	}).then((data) => {
        		if(data.code === 200){
        			this.moduleList = (data.data);
                    // console.log(data);
        		}		
        	});
        },

        updated(){
            var auth = JSON.parse(sessionStorage.getItem('auth'));
            this.showUserMsg(auth.id);
        },

        methods: {
            //当用户二次登陆,此时应该为编辑页面
            showUserMsg: function(id){
                // console.log(id);
                this.axios({
                    method: "GET",
                    url: "userSubmit/editUserInfo/" + id
                }).then((data) => {
                    var _data = data.data;
                    console.log(_data);

                    for(var i=0;i<_data.length;i++){
                        var tempStr = _data[i].file.split("/");
                        var mod = 'mod' + _data[i].moduleid;
                        var row = 'row' + _data[i].typeid;
                        if(typeof(this.$refs[mod][0].$refs[row])==="undefined"){
                            this.showUserMsg(id);
                        }
                        //找到每一个有数据的行
                        var _row = this.$refs[mod][0].$refs[row][0];
                        // console.log(_row);
                        //通过返回的数据设置每一行的数据
                        //设置改行是否显示,select的value以及图片 
                        _row.rowShow = true;
                        // _row.imageSrc = 'http://localhost:8081/images/' +　tempStr[(tempStr.length - 1)];
                        _row.imageSrc = tempStr[(tempStr.length - 1)];
                        _row.selectValue = (_data[i].standardid + "+" + _data[i].creditid);
                        
                    }
                })
            },
            //当此时属于编辑信息
            editInfo: function(){
               this.axios.get('userSubmit/edit/update')
                .then((data) => {
                    console.log(data);
                    if(data.code === 200){
                        alert(data.data); 
                        location.reload();
                    } 
                });
                
            }
        }
		
	}
</script>