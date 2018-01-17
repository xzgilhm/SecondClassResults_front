<style scoped>
 	
</style>

<template>
<div>
	<Row style="margin-top:15px" v-if="show">
		<i-col span="5">
			{{ typeName }} 
		</i-col>
		<!-- 选择栏 -->
		<i-col span="5">
			<i-select  placeholder="请选择" style="width:180px" v-model="selectValue" @on-change="chiceSelect">
			    <i-option  v-for="item in info" :key="item.index" :value="item.id + '+' + item.creditid">
			    	{{item.title}}
			    </i-option>
			</i-select>
		</i-col>
		<!-- 提示 -->
		<i-col span="2">
			{{ evidenceTitle }}
		</i-col>
		<!-- 上传 -->
		<i-col span="3">
			<Upload
			    ref="upload"
			    :show-upload-list="false"
			    :max-size="2048"
			    :before-upload="handleUpload"
			    :on-progress = "handleProgress"
			    multiple
			    :data="allInfo"
			    :action="PORT + 'studentEdit/upload'">
			        <i-button type="ghost" icon="ios-cloud-upload-outline" @click="getRowInfo">上传文件</i-button>
			</Upload>
		</i-col>
		<!-- 显示文件列表 -->
        <i-col span="5">
        	<li v-for="file in readFileList">
        		{{ file }}
        		 <Icon type="ios-trash-outline" @click.native="handleRemove(file)"></Icon>
        	</li>
        	<div  v-for="item in fileList">
			    <template>
			        <div class="demo-upload-list-cover">
			        	{{ item.name }}
			            <Icon type="ios-trash-outline" @click.native="handleRemove(item.name)"></Icon>
			        </div>
			        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
			    </template>
			</div>
        </i-col>
        <i-col span="1">
        	<i-button @click="deleteRow"> 删除 </i-button>
        </i-col>
		
	</Row>

	<Modal title="View Image" v-model="modalShow">
        <img :src="PORT + 'images/' + imageSrc" v-if="modalShow" style="width: 100%">
    </Modal>
</div>
</template>


<script>
export default {
	data(){
		return{
			PORT: _HTTP.PORT,
			show: false,
			rowShow: true,
			uploadShow: true,
			modalShow: false,
			allInfo: {
				"id": "",
				"userId": "",
				"roleId": "",
				"moduleId": "",
				"typeId": "",
				"standardId": "",
				"creditId": "",
				"evidenceId": "",
				"file" : "" 
			},
			info: [],
			creditId: '',
			standardId: '',
			standardName: '',
			selectValue: '',
			imageSrc: '',
			readFile: '',
			fileList: [],
			readFileList: []
		}
	},
	//接收父组件each-row传过来的值
	props: {
		moduleId : {
			type: String,
			default: "0"
		},
		moduleName: String,
		typeId : String,
		typeName: String,
		evidenceTitle: String,
		evidenceId: Number,
		isExit: Boolean
	},
	mounted(){
		//通过moduleId和typeId获得standard信息
		this.axios.get('node/findStardByMuduleIdAndTypeId/'+this.moduleId+"&"+this.typeId)
			.then((data) => {
				this.info = data.data;
				// console.log(this.info); 
			})
		if(this.isExit){
			this.rowShow = false;
		}
		console.log(this.allInfo);
	},
	methods: {
		handleView () {
                this.modalShow = true;
        },
        handleUpload(file) {
        	if(this.readFileList.indexOf(file.name) > -1){
        		alert("同名文件");
        		return false;   
        	}
        	else{
        		return true;
        	}
        },
        handleProgress: function(event, file, fileList){
			this.fileList = fileList;
			console.log("handleProgress");
			console.log(this.fileList);
		},
        handleRemove(file){
        	//页面上删除
        	console.log(file);
        	this.readFileList.splice(this.readFileList.indexOf(file), 1);
        	this.allInfo.file = this.allInfo.file.replace(file + "####","");
        	this.axios({
        		method : "POST",
        		url : "studentEdit/deleteFile/",
        		data: {
        			"data" : this.allInfo,
        			"fileName" : file
        		}
        	}).then((data) => {
        		console.log(data);
        	});
        },
      
		chiceSelect: function(value){
			var strs = new Array();
			strs = value.split("+");
			this.standardId = strs[0];
			this.creditId = strs[1];
			
		},
		getRowInfo: function(){
			var auth = JSON.parse(sessionStorage.getItem('auth'));
			var strs = new Array();
			strs = this.selectValue.split("+");
			this.standardId = strs[0];
			this.creditId = strs[1];
      		this.allInfo.userId = auth.id;
      		this.allInfo.roleId = auth.roleId;
      		this.allInfo.moduleId = this.moduleId;
      		this.allInfo.typeId = this.typeId;
      		this.allInfo.standardId = strs[0];
      		this.allInfo.creditId = strs[1];
      		this.allInfo.evidenceId = this.evidenceId;
      		console.log(this.allInfo);
		},
		//删除一行
		deleteRow: function(){
			console.log(this.allInfo);
			// alert
			this.axios({
				method : "POST",
				url : "studentEdit/deleteRow",
				data : this.allInfo
			}).then((response) => {
				console.log(response);
			})			
		}
	},
	
	watch: {
		selectValue: function(val){
			this.getRowInfo();
			console.log(this.allInfo);
			this.axios({
				method: "POST",
				url: "studentEdit/changeSelect",
				data: this.allInfo
			}).then((data) => {
				console.log(data);
			})
		}
	}
}
</script>