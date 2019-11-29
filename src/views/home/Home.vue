<template>
  <!--<div class="index" v-loading.fullscreen.lock="loading" element-loading-text="页面加载中">-->
    <!--<div class="index-block">-->
      <!--<div class="list-top">-->
        <!--<h3>资产概况</h3>-->
      <!--</div>-->
      <!--<div class="list-con flex">-->
        <!--<div class="index-num index-num1">-->
          <!--<h4>资产总数</h4>-->
          <!--<p>{{totalCount}}</p>-->
        <!--</div>-->
        <!--<div class="index-num index-num3">-->
          <!--<h4>正常资产数</h4>-->
          <!--<p>{{idleCount}}</p>-->
        <!--</div>-->
        <!--<div class="index-num index-num2">-->
          <!--<h4>维修中资产数</h4>-->
          <!--<p>{{usingCount}}</p>-->
        <!--</div>-->
        <!--<div class="index-num index-num4">-->
          <!--<h4>已报废资产数</h4>-->
          <!--<p>{{scrapCount}}</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->

</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        totalCount: 0,
        usingCount: 0,
        idleCount: 0,
        scrapCount: 0,
      }
    },
    created() {
    },
    methods: {}
  }


</script>
<style scoped>

  .list-top {
    height: 58px;
    padding: 0 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-top h3 {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    letter-spacing: .5px;
    line-height: 58px;

  }

  .list-con {
    padding: 20px;
  }

  .list-con.flex {
    display: flex;
    padding: 20px 30px;
    justify-content: space-around;
  }

</style>
