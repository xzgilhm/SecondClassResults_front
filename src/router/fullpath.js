import Abstract from '../views/common/abstract.vue';
export default [{
	path: '/',
	name: '首页',
	component: (resolve) => require(['../views/index.vue'], resolve),
	children: [
    {
      path: '/secondClass',
      name: '第二课堂',
      meta: {
        name: "第二课堂"
      },
      component: Abstract,
      children: [
        {
          path: 'application',
          name: '提交',
          meta: {
            name: '学生提交'
          },
          component: resolve => require(['../components/student/application.vue'], resolve)
        },
        {
          path: 'editApplication', 
          name: '修改',
          meta: {
            name: '学生修改'
          },
          component: resolve => require(['../components/student/editApplication.vue'], resolve)
        }
      ]
    }
		    
	]
}];