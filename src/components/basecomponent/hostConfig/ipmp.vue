
<template>
	<Form :model="ipmp" :label-width="80" style="width:600px">
		<div style="display：inline-block">
            <label style="width: 180;height:32px;margin-left:20px;padding-right:9px">认证算法</label>
            <Select v-model="ipmp.authtype" placeholder="请选择" style="width:500px">
                <Option value="-1">默认</Option>
                <Option value="0">无</Option>
                <Option value="1">MD2</Option>
                <Option value="2">MD5</Option>
                <Option value="4">Straight</Option>
                <Option value="5">OEM</Option>
                <Option value="6">RMCP+</Option>
            </Select>
        </div>
        <div style="display：inline-block;padding-top:20px;padding-bottom:20px;">
            <label style="width: 80px;height:32px;margin-left:10px;padding-right:9px">优先权层级</label>
            <Select v-model="ipmp.privilege" placeholder="请选择" style="width:500px">
                <Option value="1">回调</Option>
                <Option value="2">用户</Option>
                <Option value="3">操作者</Option>
                <Option value="4">管理者</Option>
                <Option value="5">OEM</Option>
            </Select>
        </div>
        <!-- <Form-item label="认证算法">
            
        </Form-item> -->
       <!--  <Form-item label="优先权层级">
            <Select v-model="ipmp.privilege" placeholder="请选择">
                <Option value="1">回调</Option>
                <Option value="2">用户</Option>
                <Option value="3">操作者</Option>
                <Option value="4">管理者</Option>
                <Option value="5">OEM</Option>
            </Select>
        </Form-item> -->
        <Form-item label="用户名">
            <Input v-model="ipmp.userName" ></Input>
        </Form-item>
        <Form-item label="密码">
            <Input v-model="ipmp.password" ></Input>
        </Form-item>
	</Form>
	
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
				ipmp:{
					userName:'',
					password:'',
					authtype:'-1',
					privilege:'2'
				}
			}
		}
	}
</script>