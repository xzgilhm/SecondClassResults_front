<style>

</style>

<template>
	<div>
		<!-- 顶栏 -->
		<v-header></v-header>
		<!-- 中间主体 -->
		<Row type="flex" justify="start">
			<i-col :span="3" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto" >
                    <div class="layout-logo-left">导航菜单</div>
                    <Menu-item name="about">
                        <Icon type="android-home"></Icon>
                        首页
                    </Menu-item>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="grid"></Icon>
                            业务系统
                        </template>
                        <Menu-item name="test">xxx</Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col :span="20"> 
            	<Row>xxxx</Row>
        		<router-view></router-view>
        	</i-col>
    	</Row>
        <!--底部-->
        <!-- <div th:include="footer"></div> -->
	</div>
	
	
</template>

<script>
	import vHeader from '../common/header';
	export default {
		components:{
            vHeader
        }
	}
</script>