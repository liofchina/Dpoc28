<template>
  <el-submenu v-if="menu.list && menu.list.length >= 1" :index="menu.menuId + ''"
              :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'">
    <template slot="title">
      <i :class="menu.icon"></i>
      <span>{{ menu.menuName }}</span>
    </template>
    <sub-menu v-for="item in menu.list" :key="item.menuId" :menu="item" :dynamicMenuRoutes="dynamicMenuRoutes">
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.menuId + ''" @click="gotoRouteHandle(menu)" class="el-menu-items">
    <!--<i class="iconfont">&#xe750;</i>-->
    <span>{{ menu.menuName }}</span>
  </el-menu-item>
</template>

<script>
  export default {
    name: 'sub-menu',
    props: {
      menu: {
        type: Object,
        required: true
      },
      dynamicMenuRoutes: {
        type: Array,
        required: true
      }
    },
    computed: {
      sidebarLayoutSkin: {
        get() {
          return this.$store.state.common.sidebarLayoutSkin
        }
      }
    },
    methods: {
      // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
      gotoRouteHandle(menu) {
        var route = this.dynamicMenuRoutes.filter(item => item.meta.menuId === menu.menuId)
        if (route.length >= 1) {
          this.$router.push({name: route[0].name, params: {id: '1'}})
        }
      }
    }
  }
</script>
