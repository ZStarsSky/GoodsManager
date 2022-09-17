import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/',
    
    redirect:{
      name:"Home"
    }
  },
  // {
  //   path: '/',
  //   name: 'homeview',
  //   component: () => import( '../views/HomeView.vue')
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
 
 
 
  {
    path: '/goodadd',
    name: 'goodadd',
    component: () => import( '../views/Goodadd.vue')
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: () => import( '../views/Changepassword.vue')
  },
  {
    path: '/mydata',
    name: 'mydata',
    component: () => import( '../views/Mydata.vue')
  },
  {
    path: '/goodout',
    name: 'goodout',
    component: () => import( '../views/Goodout.vue')
  },
  {
    path: '/goodupdate',
    name: 'goodupdate',
    component: () => import( '../views/Goodupdate.vue')
  },
  
  {
    path: '/goodnum',
    name: 'goodnum',
    component: () => import( '../views/Goodnum.vue')
  },
  {
    path: '/goodoutRight',
    name: 'goodoutRight',
    component: () => import( '../views/GoodoutRight.vue')
  },
  {
    path: '/goodInOut',
    name: 'goodInOut',
    component: () => import( '../views/GoodInOut.vue')
  },
  {
    path: '/goodsort',
    name: 'goodsort',
    component: () => import( '../views/Goodsort.vue')
  },
  {
    path: '/allstaff',
    name: 'allstaff',
    component: () => import( '../views/Allstaff.vue')
  },
  

  
  


  // tabbar（标签栏）下面的
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children:[
      {
        path: '/home22',
        name: 'Home',
        component: () => import( '../views/HomeView.vue')
        // component: Home
      },
      {
        path: '/my',
        name: 'My',
        component: () => import( '../views/My.vue')
      },
      {
        path: '/gooddata',
        name: 'Gooddata',
        component: () => import( '../views/Gooddata.vue')
      },
      {
        path: '/goodselect',
        name: 'goodselect',
        component: () => import( '../views/GoodSelect.vue')
      },

    ]
  },

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from代表从哪个路径跳转而来


  // if(to.path === '/my') return next();
  
  // 访问主页放行
  if(to.path === '/home22') return next();

  
  
  // 访问修改密码页面放行
  if(to.path === '/changepassword') return next();
  // 访问登陆直接放行
  if (to.path === '/login') return next();
  
  //获取token，没有token强制跳转到login页面
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
