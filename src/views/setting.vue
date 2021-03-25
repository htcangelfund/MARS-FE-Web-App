<template>
  <div class="setting">
    <mt-header title="setting">
      <mt-button icon="back" slot="left" @click="back()"></mt-button>
    </mt-header>
    <div class="body">
        <div>
            <span>Accept the notification</span>
            <mt-switch v-model="notification" @change="toggleNotificate"></mt-switch>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'setting',
  data(){
    return {
      notification: false
    }
  },
  components: {
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    toggleNotificate(){
      if(this.notification){
        this.$axios.get(this.server +'/click',{timeout: 6000}).then(function(){})
      }
    }
  },
}
</script>
<style lang="less">
  .mint-switch-input:checked + .mint-switch-core{
    background: #f9a207;
    border-color:transparent
  }
</style>
<style lang="less" scoped>
  @fontSize1: 12px;
  @fontSize2: 14px;
  .setting{
    background: #F4F9FC;
    height: 100vh;
  }
  .mint-header{
    background-color: #2A2828!important;
  }
  .body>div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 5px 10px;
      margin-top:20px;
      height: 30px;
      font-size: 14px;
  }
</style>
