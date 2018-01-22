<style>

</style>

<template>
	<div>
		<Row type="flex" justify="center">
			<i-col span="24" v-for="moduleItem in moduleList" :key="moduleItem.id">
				<each-module :moduleId="moduleItem.id" :moduleName="moduleItem.modulename" :isExit="isExit" :ref="'mod'+ moduleItem.id">
                </each-module>
			</i-col>  
            <i-col span="24">
                <i-button type="primary" style="margin-top:15px" @click="submitAllInfo"> 
                    submit 
                </i-button>
            </i-col>
		</Row>
	</div>
</template>

<script>
	import vHeader from '../common/header';
	import eachModule from './baseComponent/each-module';
	export default {
		components:{
            vHeader,
            eachModule 
        },

        data(){
        	return {
        		moduleList: [],
                isExit: false
        	}
        },
        mounted(){
        	var auth = JSON.parse(sessionStorage.getItem('auth'));
            this.axios.get('userSubmit/clearMap');
        	//查询每一个module
        	this.axios({
        		method: "GET",
        		url: "/node/getAllModuleName"
        	}).then((data) => {
        		console.log(data.data);
        		if(data.code === 200){
        			this.moduleList = (data.data);
                    console.log(this.moduleList);
        		}		
        	})
        },
        methods: {
            //点击提交后事件
            submitAllInfo: function(){
               this.axios.get('userSubmit/submit')
                .then((data) => {
                    console.log(data);
                    if(data.code === 200){
                        alert(data.data);
                        this.$router.push('/editApplication');
                    } 
                });
            },
        }
		
	}
</script>