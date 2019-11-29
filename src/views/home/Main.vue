<template>
  <div :class="{collapse:isCollapse}" v-if="!loading">
    <main-sidebar :style="{'height': documentClientHeight + 'px'}"></main-sidebar>
    <div class="main-righty">
      <main-navbar/>
      <main-content :style="{'height': documentClientHeight + 'px'}"></main-content>
    </div>
  </div>
</template>

<script>
  import MainNavbar from './components/main-navbar'
  import MainSidebar from './components/main-sidebar'
  import MainContent from './components/main-content'

  export default {
    name: 'Main',
    data() {
      return {
        loading: false,
      }
    },
    components: {
      MainNavbar,
      MainSidebar,
      MainContent
    },
    computed: {
      documentClientHeight: {
        get() {
          return this.$store.state.common.documentClientHeight
        },
        set(val) {
          this.$store.commit('common/updateDocumentClientHeight', val)
        }
      },
      contentHeight: {
        get() {
          return this.$store.state.common.contentHeight
        },
        set(val) {
          this.$store.commit('common/updateContentHeight', val)
        }
      },
      isCollapse: {
        get() {
          return this.$store.state.common.isCollapse
        }
      }
      // userId: {
      //   get() {
      //     return this.$store.state.user.id
      //   },
      //   set(val) {
      //     this.$store.commit('user/updateId', val)
      //   }
      // },
      // userName: {
      //   get() {
      //     return this.$store.state.user.name
      //   },
      //   set(val) {
      //     this.$store.commit('user/updateName', val)
      //   }
      // }
    },
    mounted() {
      this.resetDocumentClientHeight()
    },
    // created() {
    //   this.getUserInfo()
    // },
    methods: {
      // 重置窗口可视高度
      resetDocumentClientHeight() {
        this.documentClientHeight = document.documentElement['clientHeight']
        this.contentHeight = this.documentClientHeight - 80
        //  console.log("###"+this.contentHeight)
        window.onresize = () => {
          this.documentClientHeight = document.documentElement['clientHeight']
          this.contentHeight = this.documentClientHeight - 80
        }
      }
      // 获取当前管理员信息
      // getUserInfo() {
      //   this.$http({
      //     url: this.$http.adornUrl('/sys/user/info'),
      //     method: 'get',
      //     params: this.$http.adornParams()
      //   }).then(({data}) => {
      //     if (data && data.code === 0) {
      //       this.loading = false
      //       this.userId = data.user.userId
      //       this.userName = data.user.username
      //     }
      //   })
      // }

    }
  }
</script>
