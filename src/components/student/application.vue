<style>

</style>

<template>
	<div>
		<!-- 顶栏 -->
		<v-header></v-header>
		<!-- 中间主体 -->
		<Row type="flex" justify="center">
			<i-col span="16" v-for="moduleItem in moduleList" :key="moduleItem.id">
				<each-module :moduleId="moduleItem.id" :moduleName="moduleItem.modulename" :ref="'mod'+moduleItem.id">
                </each-module>
			</i-col>
            <i-col span="16">
                <i-button type="primary" style="margin-top:15px" @click="submitAllInfo"> 
                    submit 
                </i-button>
            </i-col>
		</Row>
	</div>
	
	<!--底部-->
	<!-- <div th:include="footer"></div> -->
</template>

<script>
	import vHeader from '../common/header';
	import eachModule from '../student/baseComponent/each-module';
	export default {
		components:{
            vHeader,
            eachModule 
        },

        data(){
        	return {
        		moduleList : []
        	}
        },
        mounted(){
        	var auth = JSON.parse(sessionStorage.getItem('auth'));
        	//查询每一个module
        	this.axios({
        		method: "GET",
        		url: "/node/getAllModuleName"
        	}).then((data) => {
        		console.log(data.data);
        		if(data.code === 200){
        			this.moduleList = (data.data);
        		}		
        	})
        },
        methods: {
            submitAllInfo: function(){
                var mod = this.$refs.mod01;
                console.log(mod[0]);
                console.log(mod[0].$refs);


            }
        }
		
	}
</script>