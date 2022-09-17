import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import mysql from 'mysql'

import 'vant/lib/index.css'


import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import { 
    Button,
    Cell, 
    CellGroup,
    NavBar ,
    Stepper,
    Sidebar,
    SidebarItem,
    Field,
    Popup,
    Swipe, 
    SwipeItem,
    Search,
    Tabbar, 
    TabbarItem,
    TreeSelect,
    Image as VanImage,
    Toast,
    DropdownMenu,
    DropdownItem,
    Uploader,
    Dialog ,
    Picker ,
    SwipeCell ,
    Circle ,
    Divider,
    GoodsAction, 
    GoodsActionIcon, 
    GoodsActionButton,
    Card,
    SubmitBar,
    Tab, Tabs,
    


    

   
  
  
} from 'vant'

Vue.use(Tab);
Vue.use(Tabs);

Vue.use(SubmitBar);

Vue.use(Card);

Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);

Vue.use(Divider);

Vue.use(Circle);

Vue.use(SwipeCell);

Vue.use(Picker);

Vue.use(Dialog);

Vue.use(Uploader);

Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.use(Toast);

Vue.use(VanImage);

Vue.use(TreeSelect);

Vue.use(Tabbar);
Vue.use(TabbarItem);

Vue.use(Search);

Vue.use(Swipe);
Vue.use(SwipeItem);

  
  Vue.use(Popup);
  
  Vue.use(Field);
  
  Vue.use(Sidebar);
  Vue.use(SidebarItem);
  
  
  Vue.use(Stepper);
  
  Vue.use(Button);
  
  Vue.use(Cell);
  Vue.use(CellGroup);
  
  Vue.use(NavBar);
  

  // //请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
  // axios.interceptors.request.use(config => {
  //   //为请求头对象，添加token验证的Authorization字段
  //   config.headers.Authorization = window.sessionStorage.getItem("token")
  //   return config
  // })


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
