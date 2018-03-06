<style scoped>

</style>

<template> 
<div>
	<Row style="margin-top:15px">
		<i-col span="8">
			<slot name="typeName"></slot>
		</i-col>
		<!-- 选择栏 -->
		<i-col span="5">
			<i-select  placeholder="请选择" style="width:180px" v-model="selectValue" @on-change="chiceSelect">
			    <i-option  v-for="item in SelectInfo" :key="item.index" :value="item.standardid + '+' + item.creditid">
			    	{{item.title}}
			    </i-option>
			</i-select>
		</i-col>
		<!-- 提示 -->
		<i-col span="3" v-if="show">
			<slot name="evidenceTitle"></slot>
		</i-col>
		<!-- 上传 -->
		<i-col span="3" v-if="show" >
			<Upload
			    ref="upload"
			    :show-upload-list="false"
			    :max-size="2048"
			    :before-upload = "handleUpload"
			    :on-progress = "handleProgress"
			    multiple
			    :data="allInfo"
			    :action="PORT + 'userSubmit/upload'">
			        <i-button type="ghost" icon="ios-cloud-upload-outline" @click="getRowInfo">上传文件</i-button>
			</Upload>
		</i-col>
		<!-- 上传列表 -->
		<i-col span="4" v-if="show" >
			<div  v-for="item in fileList">
			    <template>
			        <div class="demo-upload-list-cover">
			        	{{ item.name }}
			            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
			        </div>
			        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
			    </template>
			</div>
		</i-col>
	</Row>
</div>
</template>


<script>
import * as util from '@/assets/util.js';
export default {
	data(){
		return{
			PORT: _HTTP.PORT,
			show: false,
			allInfo: {
				"userId": "",
				"roleId": "",
				"moduleId": "",
				"typeId": "",
				"standardId": "",
				"creditId": "",
				"evidenceId": ""
			},
			SelectInfo: [],
			creditId: '',
			standardId: '',
			standardName: '',
			selectValue: '',
			fileList: []
		}
	},
	//接收父组件each-row传过来的值
	props: {
		moduleId : {
			type: String,
			default: "0"
		},
		typeId : String,
		evidenceId: Number
	},
	mounted(){
		//通过moduleId和typeId获得standard信息
		// this.axios.get('node/findStardByMuduleIdAndTypeId/'+this.moduleId+"&"+this.typeId)
		// 	.then((data) => {
		// 		this.SelectInfo = data.data;
		// 	});


		this.axios.get('node/getStandard?moduleId='+this.moduleId+"&typeId="+this.typeId)
			.then((data) => {
				console.log("xxxx");
				console.log(data);
				this.SelectInfo = data.data;
			});	
	},
	methods: {
		chiceSelect: function(value){
			var strs = new Array();
			strs = value.split("+");
			this.standardId = strs[0];
			this.creditId = strs[1];
			this.show = true;
		},
		handleUpload: function(file){
			console.log("xxxxx");
			console.log(file);
			console.log(this.fileList);
			for(let i=0; i<this.fileList.length; i++){
				if(file.name === this.fileList[i].name){
					alert("有同名文件");
					return false;
				}
			}
		},
		handleProgress: function(event, file, fileList){
			this.fileList = fileList;
			console.log("handleProgress");
			console.log(this.fileList);
		},
		handleRemove(file){
			//页面上删除
            this.fileList.splice(this.fileList.indexOf(file), 1);
            console.log(file.name);
            const _a = this.allInfo;
            const send = {
            	"mark" : _a.userId + _a.moduleId + _a.typeId,
            	"fileName" : file.name
            }
            console.log(send); 
            this.axios({
            	method: 'POST',
            	url: "userSubmit/removeFileList",
            	data: {
	            	"mark" : _a.userId + _a.moduleId + _a.typeId,
	            	"fileName" : file.name
            	}
            }).then( (data)=> {
            	console.log(data);
            })
		},
		getRowInfo: function(){
			var auth = util.session('token');
			console.log(auth);
      		this.allInfo.userId = auth.id;
      		this.allInfo.roleId = auth.roleId;
      		this.allInfo.moduleId = this.moduleId;
      		this.allInfo.typeId = this.typeId;
      		this.allInfo.standardId = this.standardId;
      		this.allInfo.creditId = this.creditId;
      		this.allInfo.evidenceId = this.evidenceId;
		}
	},
	watch: {
		selectValue: function(val){
			this.getRowInfo();
			console.log(this.allInfo);
			this.axios({
				method: "POST",
				url: "userSubmit/changeSelect",
				data: this.allInfo
			}).then((data) => {
				console.log(data);
			})
		}
	}
}
</script>