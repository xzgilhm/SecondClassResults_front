<style scoped>
.dash-board{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}
.breadcrumb{
  margin: 12px 0px;
  text-align: left;
}
</style>
<template>
<div>
  <v-header></v-header>

   <Layout class="dash-board">
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu  theme="light" width="auto">
            <template v-for="(route,index) in menus">
              <template v-if="route.children">
                <Submenu :key="index" :name="index">
                  <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    {{route.name || route.meta.name}} 
                  </template>
                  <MenuItem v-for="(cRoute,cIndex) in route.children" :key="cIndex" :name="cRoute.name" >
                    <p @click="routeMsg(cRoute)">{{ cRoute.name }}</p>
                  </MenuItem>
                </Submenu>
              </template>
              <template v-else>
                           <!--  <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem> -->
              </template>
            </template>
        </Menu>
      </Sider>

      <Layout :style="{padding: '0  12px'}">
                  <Row>
                    <Col :span="4">
                      <Breadcrumb  class="breadcrumb">
                        <BreadcrumbItem v-for="(item,index) in breadcrumbs" :key="index" :to="item"  >
                          {{ item.meta.name || item.name }}
                        </BreadcrumbItem>
                      </Breadcrumb>
                    </Col>
                  </Row>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view></router-view> 
                    </Content>
      </Layout>
    </Layout>
</div>

</template>
<script>
import instance from "../axios.js";
// import { changePw } from "../api/account";

export default {
  components: {
    vHeader: () => import("../components/common/header.vue")
  },
  data() {
    return {
      user: {},
      menus: []
    };
  },
  computed: {
    activeMenu: function(){
      return this.$route.name
    },
    breadcrumbs: function(){
      return (this.$route && this.$route.matched) || []
    }
  },
  methods: {
    logout: function() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.$emit("logout");
        })
        .catch(() => {});
    },
    routeMsg: function(val){
      console.log(val.path);
      // console.log(this);
      this.$router.push(val.path);
      // this.$router.push("/" + val.path);
    }
  },
  created: function() {
    // console.log("created");
    let user = this.$parent.userData;
    if (user) {
      this.user = user;
    } 
    else {
      this.$router.push({ path: "/login" });
    }
    let menus = this.$parent.menuData;
    if (menus) {
      this.menus = menus;
    }
  }
};
</script>
