<style>

</style>

<template>
	<div>
		<!-- 顶栏 -->
		<v-header></v-header>
		<!-- 中间主体 -->
        <router-view></router-view>
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