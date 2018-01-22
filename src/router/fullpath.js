
export default [{
	path: '/',
	name: '首页',
	component: (resolve) => require(['../views/index.vue'], resolve),
	children: [
		    {
          path: '/application',
          name: '编辑',
          meta: {
          	name: '学生管理'
          },
          component: resolve => require(['../components/student/application.vue'], resolve)
        },
        {
          path: '/editApplication', 
          name: '修改',
          meta: {
          	name: '学生管理'
          },
          component: resolve => require(['../components/student/editApplication.vue'], resolve)
        }
	]
}];