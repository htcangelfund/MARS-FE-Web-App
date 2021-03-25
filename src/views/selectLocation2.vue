<template>
  <div class="selectLocation">
    <img src="../../public/welcomeBg1.svg" alt="" style="position:absolute;right:0;top:0;z-index:0;width:30%">
    <img src="../../public/welcomeBg2.svg" alt="" style="position:absolute;left:0;bottom:0;z-index:0">
    <mt-header style="background:transparent;padding:0px" class="myHeader">
      <img src="../../public/back2.svg" alt="" slot="left" @click="back()" >
      <!-- <mt-button icon="back" slot="left" @click="back()" style="color:gray"></mt-button> -->
    </mt-header>
    <h2>Select Building and Floor</h2>
    <p>We will remember you select</p>
    <div class="mySelect">
      <i><img src="../../public/building.svg" alt=""></i>
      <el-select v-model="building" placeholder="Please select building">
        <el-option v-for="(item,index) in buildingList" :key="index" :label="item.label" :value="item.value">

        </el-option>
      </el-select>
    </div>
    <div class="mySelect" v-show="building != null">
      <i><img src="../../public/floor.svg" alt=""></i>
      <el-select v-model="floor" placeholder="Please select floor" ref="floorSelect">
        <el-option v-for="(item,index) in floorList[building]" :key="index" :label="item.label" :value="item.value">

        </el-option>
      </el-select>
    </div>

    <button @click="confirm" v-show="!!building && !!floor">Confirm</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { Select,Option } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
export default {
  name: 'selectLocation',
  data(){
    return {
      city:null,
      building:null,
      floor:null,
      
      buildingList:[
        {
          value:'TaiKooHui T2',
          label:'TaiKooHui T2'
        }
      ],
      floorList:{
        'TaiKooHui T2':[
          {
            value:'24F',
            label:'24F'
          },
          {
            value:'25F',
            label:'25F'
          },
          
        ],
      }
    }
  },
  components: {
    ElSelect:Select,
    ElOption:Option,
  },
  watch:{
    // building:function(val){
    //   console.log(val)
    //   var that = this
    //   if(val){
    //     console.log(this.$refs.floorSelect)
    //     setTimeout(function(){
    //       that.$refs.floorSelect.click()
    //     },0)
        
    //   }
      
    // }
  },
  methods:{
    back(){

    },
    confirm(){
      if(!this.building){
        return 
      }
      if(!this.floor){
        return 
      }
      localStorage.setItem('Mars_myBuilding', this.building)
      localStorage.setItem('Mars_myfloor',this.floor)
      this.$router.push({path:'/guidance'})
    }
  },
  created(){
  }
}
</script>
<style lang="less">
  .el-input--suffix .el-input__inner{
    padding: 0 50px;
    border-radius: 15px;
    height: 49px;
  }
  .el-input__suffix{
    display: none;
  }
  .el-select>.el-input{
    border-radius: 15px;
  }
  input:-webkit-input-placeholder{
    width: 100%!important;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background: #23D3B9;
    color:white
  }
  .el-select .el-input__inner:focus,.el-select .el-input.is-focus .el-input__inner{
    border-color: #23D3B9;
  }
  .el-select-dropdown{
    box-shadow: 0 2px 6px rgba(39,169,150,0.2);
    border: none;
  }
  .el-select-dropdown__wrap{
    max-height: 210px;
  }
  .myHeader>.mint-header-button.is-left{
    margin-left:calc(7.5% + 16px)
  }
</style>
<style lang="less" scoped>
  .selectLocation{
    position: relative;
    height: 100%;
  }
  .selectLocation>p,.selectLocation>h2{
    text-align: left;
    margin: calc(7.5% + 16px);
  }
  .selectLocation>h2{
    position: relative;
    margin:40px calc(7.5% + 16px) 5px;
    z-index: 1;
    font-size: 1.2rem;
  }
  .selectLocation>p{
    color:#9AA09F;
    margin-bottom: 40px;
    margin-top:2%;
    font-size: 0.9rem;
  }
  .selectLocation>.mySelect{
    width: 85%;
    margin: 30px auto;
    position: relative;
    box-shadow: 0 2px 6px rgba(39,169,150,0.2);
    border-radius: 15px;
  }
  .selectLocation>.mySelect>i{
    position: absolute;
    width: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 100;
    top:0;
    left:16px;
  }
  .selectLocation>.mySelect>.el-select{
    width: 100%;
    border-radius: 15px;
  }
  .selectLocation>button{
    width: 60%;
    margin: 15vw auto;
    height: 8vw;
    background: #23D3B9;
    border-radius: 4vw;
    border: none;
    color:white
  }
</style>
