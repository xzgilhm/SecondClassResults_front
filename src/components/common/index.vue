<style scoped>
    .layout{
        background: #f5f7f9; 
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
    .layout-breadcrumb{
        text-align: left;
        padding: 10px 15px 0; 
        overflow: hidden; 
    }
    .layout-content{
        padding: 10px 15px; 
        min-height: 300px; 
        height:-moz-calc( 100% - 31px );
        height:-webkit-calc( 100% - 31px ); 
        height: calc( 100% - 31px ); 
        background: #fff; 
        overflow-y:auto; 
    }
    .layout-content-main{ 
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
      /*  height:-moz-calc(100% - (10px + 50px)); 
        height:-webkit-calc(100% - (10px + 50px)); 
        height: calc(100% - (10px + 50px)); */
    }
    .layout-header{
        text-align: left;
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        height: 30px;
        background: #000;
        border-radius: 3px;
        padding-top: 5px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .routerview{ 
    }
    .ivu-row-flex{
        width: 100%;
        height:-moz-calc(100% - (10px + 50px)); 
        height:-webkit-calc(100% - (10px + 50px)); 
        height: calc(100% - (10px + 50px)); 
    }
</style>

<template>
    <div id="maxLayout" class="layout" >
        <v-header></v-header>
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto" @on-select="routeTo">
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
                        <Menu-item name="test">业务拨测</Menu-item>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            平台硬件
                        </template>
                        <Menu-item name="equipmentAlarm">设备告警</Menu-item> 
                        <Menu-item name="serverGrp">平台设备</Menu-item> 
                        <Menu-item name="netGrp">网络设备</Menu-item>
                        <Menu-item name="serversList">全部监控对象</Menu-item>
                        <!-- <Menu-item name="switchList">交换机列表</Menu-item> -->
                        <keep-alive>
                        <Menu-item name="hostList">主机群组列表</Menu-item>
                        </keep-alive>
                        <!-- <Menu-item name="zabbixPage">zabbix主页</Menu-item> -->
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="grid"></Icon>
                            系统管理
                        </template>
                        <Menu-item name="userConfig">用户设置</Menu-item>
                        <Menu-item name="userGroupConfig">用户群组设置</Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Icon type="home" size="16"></Icon>
                        <Breadcrumb-item href="about">首页</Breadcrumb-item>
                        <Breadcrumb-item href="#">{{this.menuitem}}</Breadcrumb-item>
                        <Breadcrumb-item>{{this.Submenu}}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div id="layoutContent" class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>

            </i-col>
        </Row>
    </div>
</template>

<script>
    import vHeader from './header';
    export default {
        components:{
            vHeader
        },
        data () {
            return {
                spanLeft: 3,
                spanRight: 21,
                iconSize: 6,
                menuitem: '',
                Submenu: ''
            }
        },
        methods: {
            routeTo (e) {
                if(e=='show')
                {
                  this.menuitem = '硬件监控';
                  this.Submenu = 'TOP概览';
                }
                else if(e=='zabbixPage'){
                  this.menuitem = '硬件监控';
                  this.Submenu = 'zabbix主页';
                }
                else if(e=='host')
                {
                  this.menuitem = '硬件监控';
                  this.Submenu = '主机列表';
                }
                else if(e=='monitorView')
                {
                  this.menuitem = '服务监控';
                  this.Submenu = '监控概览';
                }
                else if(e=='servicePlat')
                {
                  this.menuitem = '服务监控';
                  this.Submenu = '业务平台列表';
                }
                else{
                  this.menuitem = '';
                  this.Submenu = '';
                }
                this.$router.push(e);
            }

        },

        mounted() {
            window.addEventListener('resize',function(argument) { 
                let maxheight = window.document.getElementById('maxLayout').offsetHeight; 
                document.getElementById('layoutContent').style.height =( maxheight - 90 ) + 'px';
            });
        },
        computed :{

            /*routeTo(e){
                if(e=='show'){
                  this.menuitem = '硬件监控';
                  this.Submenu = 'TOP图';
                }
            }*/
        }
    }
</script>
