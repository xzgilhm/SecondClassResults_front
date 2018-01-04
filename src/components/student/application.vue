<style>

</style>

<template>
	<div>
		<!-- 顶栏 -->
		<v-header></v-header>
		<!-- 中间主体 -->
		<Row type="flex" justify="center">
			<i-col span="16">
				<Card v-for="modulelist in moduleList" :key="modulelist.id" style="margin-top:15px">
					<p slot="title" style="text-align:left;font-size:20px">
						{{ modulelist.modulename }}
					</p>
					<i-form :model="formItem" :label-width="80" inline>
					    <Form-item :label="modulelist.id">
					        <i-select :model.sync="formItem.select" placeholder="请选择">
					            <i-option value="1">1</i-option>
					            <i-option value="2">2</i-option>
					            <i-option value="3">3</i-option>
					        </i-select>
					    </Form-item>
					    <Form-item>
						    <Upload action="//jsonplaceholder.typicode.com/posts/">
	        					<i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
	    					</Upload>
    					</Form-item>
					</i-form>
				</Card>
			</i-col>
		</Row>
	</div>
	
	<!--底部-->
	<!-- <div th:include="footer"></div> -->
</template>

<script>
	import vHeader from '../common/header';
	export default {
		components:{
            vHeader
        },
        data(){
        	return {
        		moduleList : [],
        		formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                }
        	}
        },
        beforeMount(){
        	var auth = JSON.parse(sessionStorage.getItem('auth'));
        	//查询每一个module
        	this.axios({
        		method: "GET",
        		url: "/node/getAllModuleName",
        	}).then((data) => {
        		console.log(data);
        		if(data.code === 200){
        			this.moduleList = data.data;
        			console.log(this.modulelist);
        		}		
        	})
        }
		
	}
</script>