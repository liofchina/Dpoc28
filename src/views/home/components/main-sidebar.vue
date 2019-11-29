<template>
  <div class="main-sidebar">
    <h2></h2>
    <div class="menu" :style="siteSidemenuHeight">
      <i class="iconfont control" @click="toggleCollapse()">&#xe742;</i>
      <!--<EasyScrollbar :barOption="myBarOption">-->
      <el-scrollbar>
        <div id="wrapper" :style="siteSidemenuHeight">
          <el-menu :default-active="menuActiveName || 'home'" class="el-menu-vertical-demo"
                   background-color="#263238" text-color="#8B8B8B" active-text-color="#fff"
                   :collapse="isCollapse" :collapseTransition="false" :unique-opened="true">
            <el-menu-item index="home" @click="$router.push({ name: 'home' })">
              <i class="iconfont home">&#xe693;</i>
              <span slot="title">Index</span>
            </el-menu-item>
            <sub-menu v-for="menu in menuList" :key="menu.menuId"
                      :menu="menu" :dynamicMenuRoutes="dynamicMenuRoutes">
            </sub-menu>
          </el-menu>
        </div>
      </el-scrollbar>
      <!--</EasyScrollbar>-->
    </div>
  </div>
</template>

<script>
  import SubMenu from './main-sidebar-sub-menu'
  import {isURL} from '@/utils/validate'

  export default {
    data() {
      return {
        dynamicMenuRoutes: [],
        // myBarOption:{
        //   barColor:"rgba(0,0,0,0.5)",
        //   barWidth:0
        // }
      }
    },
    components: {
      SubMenu
    },
    created() {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
    },
    activated() {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
    },
    watch: {
      $route: 'routeHandle',

    },
    computed: {
      isCollapse: {
        get() {
          return this.$store.state.common.isCollapse
        },
        // set(val) {this.$store.commit('common/updateIsCollapse', val)}
      },
      menuList: {
        get() {
          return this.$store.state.common.menuList
        },
        set(val) {
          this.$store.commit('common/updateMenuList', val)
        }
      },
      menuActiveName: {
        get() {
          return this.$store.state.common.menuActiveName
        },
        set(val) {
          this.$store.commit('common/updateMenuActiveName', val)
        }
      },
      mainTabs: {
        get() {
          return this.$store.state.common.mainTabs
        },
        set(val) {
          this.$store.commit('common/updateMainTabs', val)
        }
      },
      mainTabsActiveName: {
        get() {
          return this.$store.state.common.mainTabsActiveName
        },
        set(val) {
          this.$store.commit('common/updateMainTabsActiveName', val)
        }
      },
      documentClientHeight: {
        get() {
          return this.$store.state.common.documentClientHeight
        }
      },
      siteSidemenuHeight() {
        var mHeight = this.documentClientHeight - 70
        return {height: mHeight + 'px'}
      }
    },
    methods: {
      // 路由操作
      routeHandle(route) {
        if (route.meta.isTab) {
          // tab选中, 不存在先添加
          var tab = this.mainTabs.filter(item => item.name === route.name)[0]
          if (!tab) {
            if (route.meta.isDynamic) {
              route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
              if (!route) {
                return console.error('未能找到可用标签页!')
              }
            }
            tab = {
              menuId: route.meta.menuId,
              name: route.name,
              title: route.meta.title,
              type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
              iframeUrl: route.meta.iframeUrl || ''
            }
            this.mainTabs = this.mainTabs.concat(tab)
          }
          this.menuActiveName = tab.menuId + ''
          this.mainTabsActiveName = tab.name
        }
      },
      toggleCollapse() {
        this.Collapse = !this.Collapse
        this.$store.commit('common/updateIsCollapse', this.Collapse)
      },
    }
  }
</script>
