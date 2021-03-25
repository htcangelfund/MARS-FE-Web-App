<template>
  <div class="welcome">
    <div>
      <h3>Welcome to MARS</h3>
      <img src="../../public/welcome.svg" alt="">
      
      <p>MARS helps find available meeting room easily for temporary use.</p>
      <router-link to="selectLocation">Select building and floor</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data(){
    return{

    }
  },
  beforeCreate(){
    var isNotfirstTime = localStorage.getItem('isNotfirstTime')
    var myBuilding = localStorage.getItem('Mars_myBuilding')
    var myfloor = localStorage.getItem('Mars_myfloor')
    if(isNotfirstTime){
      this.$router.push({path:'/',query:{building:myBuilding,floor: myfloor}})
    }
  }

}
</script>

<style lang="less" scoped>
  .welcome>div{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 10vh 0;
  }
  .welcome>div>*{
    display: block;
    margin: 0 auto;
  }
  .welcome>div>h3{
    margin: 4vw 0;
  }
  .welcome>div>p{
    width: 63%;
    margin: 8vw 0;
  };
  .welcome>div>a{
    height: 8vw;
    background: #23D3B9;
    color:white;
    border-radius: 4vw;
    width: 60%;
    outline: none;
    border: none;
    margin-top:12vw;
    line-height: 8vw;
    text-decoration: none;
  }
</style>