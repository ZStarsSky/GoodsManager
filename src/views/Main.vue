<template>
<!-- 这是下面tabbar，具体跳转路径是下面的replace to 和index.js文件中增加路径 -->
    <div>
        <router-view /> 
        <van-tabbar v-model="active" active-color="#127b62" inactive-color="grey">
            <van-tabbar-item replace to="/home22" icon="wap-home">主页</van-tabbar-item>
            

            <van-tabbar-item  to="/goodselect">
            <span>商品</span>
            <template #icon="props">
                <img :src="props.active ? icon.active : icon.inactive" />
            </template>
            </van-tabbar-item>

            <van-tabbar-item  replace to="/gooddata">
            <span>报表</span>
            <template #icon="props">
                <img :src="props.active ? icon2.active : icon2.inactive" />
            </template>
            </van-tabbar-item>

            <van-tabbar-item icon="manager" replace to="/my">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
  
  data() {
    return {
        active:0,
        // 图标用require来获取文件中的图片
        icon: {
            active: require("@/assets/icon/商品管理1.png"),
            inactive: require("@/assets/icon/商品管理.png"),
        },
        icon2: {
            active: require("@/assets/icon/报表_crm.png"),
            inactive: require("@/assets/icon/报表_crm (1).png"),
        },


    };
  }
}
</script>