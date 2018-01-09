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
		<i-col span="9">
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
		<i-col span="3" v-if="show">
			{{ evidenceTitle }}
		</i-col>
		<i-col span="3" v-if="show" >
			<!-- 把文件和所有信息一起传给后台 -->
			<div v-if="uploadShow">
				<Upload action="http://localhost:8081/userSubmit/upload" :data="allInfo" ref="upload" > 
					<i-button type="ghost" icon="ios-cloud-upload-outline" @click="showRowInfo">上传文件</i-button>
				</Upload>
			</div>
		</i-col>
		<!-- 显示图片 -->
		<i-col span="3" v-if="imgShow">
			<div class="demo-upload-list">
		           <img :src="imageSrc">
		           <div class="demo-upload-list-cover">
		               <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
		               <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
		           </div>
	        </div>
        </i-col>
	</Row>
	<Modal title="View Image" v-model="modalShow">
        <img :src="imageSrc" v-if="modalShow" style="width: 100%">
    </Modal>
</div>
</template>


<script>
export default {
	data(){
		return{
			show: false,
			rowShow: true,
			uploadShow: true,
			imgShow: false,
			modalShow: false,
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
			imageSrc: ''
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
			this.uploadShow = false;
			this.imgShow = true;
		}
	},
	methods: {
		handleView () {
                this.modalShow = true;
        },
        handleRemove(){
        	this.uploadShow = true;
        	this.imgShow = false;
        },
		clickOn: function(value){
			var strs = new Array();
			strs = value.split("+");
			this.standardId = strs[0];
			this.creditId = strs[1];
			//改变选择的标准后,如果没有显示上传则显示上传,否则清空上传列表
			if(this.show){
				this.$refs.upload.clearFiles();
			}
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
      		// console.log(_allInfo);
		}
	}
}
</script>