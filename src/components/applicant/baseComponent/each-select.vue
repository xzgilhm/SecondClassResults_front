<style scoped>
 	.demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
	.demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>

<template>
<div>
	<Row style="margin-top:15px" v-show="rowShow">
		<i-col span="7">
			{{ typeName }} 
		</i-col>
		<i-col span="5">
			<i-select  placeholder="请选择" style="width:180px" v-model="selectValue" @on-change="clickOn">
				<!-- 注意value的设置,不能选择一样的,如果一样会出现多选 -->
			    <i-option  v-for="item in info" :key="item.index" :value="item.id + '+' + item.creditid">
			    	{{item.title}}
			    </i-option>
			</i-select>
		</i-col>
		<i-col span="2" v-if="show">
			{{ evidenceTitle }}
		</i-col>
		
		<i-col span="3" v-if="show" >
			<Upload
			    ref="upload"
			    :show-upload-list="false"
			    :max-size="2048"
			    :before-upload="handleUpload"
			    multiple
			    :data="allInfo"
			    :action="PORT + 'userSubmit/upload'">
			        <i-button type="ghost" icon="ios-cloud-upload-outline" >上传文件</i-button>
			</Upload>

		</i-col>
		<i-col span="4" >
			<div v-if="fileList !== null" > 
				<p  v-for="fl in fileList">
					{{ fl.name }} <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
					<Progress v-if="fl.showProgress" :percent="fl.percentage"  :loading="loadingStatus" hide-info></Progress>
				</p> 
				
			</div>
		</i-col>
		<i-col v-if="show">
			<div v-show = "isUpload">
			<Button type="text" @click="upload" :loading="loadingStatus">
						{{ loadingStatus ? 'Uploading' : 'Click to upload' }}
			</Button>
			</div>
		</i-col>
	</Row>
	
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
			imgShow: false,
			modalShow: false,
			isUpload: true,
			allInfo: {
				"userId": "",
				"roleId": "",
				"moduleId": "",
				"typeId": "",
				"standardId": "",
				"creditId": "",
				"evidenceId": ""
			},
			info: [],
			creditId: '',
			standardId: '',
			standardName: '',
			selectValue: '',
			imageSrc: '',
			fileList: [],
			loadingStatus: false,
			uploadFlag: false,
			file: {}
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

	},
	methods: {
		handleView () {
                this.modalShow = true;
        },
        handleRemove(){
        	this.uploadShow = true;
        	this.imgShow = false;
        	this.showRowInfo();
			this.allInfo["file"] = "";
			this.axios({
				method: "POST",
				url: "userSubmit/changeSelect",
				data: this.allInfo
			}).then((data) => {
				console.log(data);
			})
        },

        handleUpload (file) {
        		this.file = file;
                this.fileList.push(file);
                console.log(this.fileList);
                return false;
        },
        upload() {
                this.loadingStatus = true;
				var auth = JSON.parse(sessionStorage.getItem('auth'));                
                var formdata = new FormData(); 
                if(this.fileList.length > 0){
                	for(var i=0;i<this.fileList.length;i++){
	                	formdata.append('file',this.fileList[i]);
	                	formdata.append('userId',auth.id);
	                	formdata.append('roleId' , auth.roleId);
			      		formdata.append('moduleId' , this.moduleId);
			      		formdata.append('typeId' , this.typeId);
			      		formdata.append('standardId' , this.standardId);
			      		formdata.append('creditId' , this.creditId);
			      		formdata.append('evidenceId' , this.evidenceId);
                	}
                }
                else {
                	formdata.append('file',"");
	                formdata.append('userId',auth.id);
	                formdata.append('roleId' , auth.roleId);
			      	formdata.append('moduleId' , this.moduleId);
			      	formdata.append('typeId' , this.typeId);
			      	formdata.append('standardId' , this.standardId);
			      	formdata.append('creditId' , this.creditId);
			      	formdata.append('evidenceId' , this.evidenceId);
                }
                console.log(formdata);
               	this.axios({
                    url:'student/submit',
                    method:'post',
                    data:formdata,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then((data) => {
                	console.log(data);
                	this.loadingStatus = false;
                })  
        },
		clickOn: function(value){
			var strs = new Array();
			strs = value.split("+");
			this.standardId = strs[0];
			this.creditId = strs[1];
			this.show = true;
		},
		showRowInfo: function(){
			var auth = JSON.parse(sessionStorage.getItem('auth'));
			var  _allInfo = this.allInfo;
      		_allInfo.userId = auth.id;
      		_allInfo.roleId = auth.roleId;
      		_allInfo.moduleId = this.moduleId;
      		_allInfo.typeId = this.typeId;
      		_allInfo.standardId = this.standardId;
      		_allInfo.creditId = this.creditId;
      		_allInfo.evidenceId = this.evidenceId;
		}
	}
}
</script>