<template>
  <div class="selectLocation">
    <mt-header title="Select Building and Floor">
      <mt-button icon="back" slot="left" @click="back()"></mt-button>
    </mt-header>
    <div class="location">
      <span :class="index == 'city' ? 'active' : ''" @click="index = 'city'">{{city}}</span>
      <span :class="index == 'building' ? 'active' : ''" v-if="city !=='Please select'" @click="index = 'building'">{{building}}</span>
      <span :class="index == 'floor' ? 'active' : ''" v-if="building !=='Please select'" @click="index = 'floor'">{{floor}}</span>
    </div>
    <mt-tab-container v-model="index" :swipeable="true">
      <mt-tab-container-item  id="city">
        <p>Select City</p>
        <div @click="clickCity($event)">
          <div v-for="(item,index) in indexList" :key="item.index+index">
            <p v-for="(itemcity,index2) in item.citylist" :key='index2' :data-value="JSON.stringify(itemcity)" :class="{'selected': itemcity.name == city}">
              <i v-if="index2 == 0">{{item.index}}</i>
              {{itemcity.name}}
            </p>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item  id="building">
        <p>Select Building</p>
        <div @click="clickBuilding($event)">
          <div v-for="(item,index) in buildingIndexList" :key="item.index+index"> 
            <p v-for="(itembuilding,index2) in item.buildingList" :key='index2' :data-value="JSON.stringify(itembuilding)" :class="{'selected': itembuilding.name == building}">
              <i v-if="index2 == 0">{{item.index}}</i>
              {{itembuilding.name}}
            </p>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item  id="floor" >
        <p>Select Floor</p>
        <div @click="clickFloor($event)" >
          <p v-for="(item,index) in floorList" :title="item" :key="index" :data-value="item" :class="{'selected': item.replace(/\s/g,'') == floor}">
            {{item}}
          </p>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'selectLocation',
  data(){
    return {
      index: 'city',
      city:'Please select',
      building:'Please select',
      floor:'Please select',
      indexList:[
        {
          index:'G',
          citylist:[
            {
              name: 'Guangzhou',
              buildingIndexList:[
                {
                  index:"T",
                  buildingList:[
                    {
                      name:'TaiKooHui T2',
                      floorList:[
                        '24F',
                        '25F',
                      ],
                    },
                    
                  ]
                },
              ]
            },
          ]
        },
      ],
      buildingIndexList:[],
      floorList:[]
    }
  },
  components: {
  },
  methods:{
    back(){
      this.$router.push({path:'/',query:{city:this.city,building:this.building,floor:this.floor}})
    },
    clickCity(e){
      this.buildingIndexList = JSON.parse(e.target.dataset.value).buildingIndexList
      this.city = JSON.parse(e.target.dataset.value).name
      this.index = 'building'
    },
    clickBuilding(e){
      this.floorList = JSON.parse(e.target.dataset.value).floorList
      this.building = JSON.parse(e.target.dataset.value).name
      this.index = 'floor'
    },
    clickFloor(e){
      this.floor = e.target.dataset.value
      var floor = this.floor.replace(/\s/g,'')
      this.$router.push({path:'/',query:{city:this.city,building:this.building,floor:floor}})
    }
  },
  created(){
    var city = this.$route.query.city
    var building = this.$route.query.building
    var floor = this.$route.query.floor
    if(city){
      this.city = city
    }
    if(building){
      this.building = building
    }
    if(floor){
      this.floor = floor
    }
    if(city && building && floor){
      this.index = 'floor'
      for(var i=0;i<this.indexList.length;i++){
        if(this.indexList[i].index == city.slice(0,1)){
          var citylist = this.indexList[i].citylist
          for(var j=0;j<citylist.length;j++){
            if(citylist[j].name == city){
              this.buildingIndexList = citylist[j].buildingIndexList
              for(var k=0; k<this.buildingIndexList.length;k++){
                if(this.buildingIndexList[k].index == building.slice(0,1)){
                  var buildinglist = this.buildingIndexList[k].buildingList
                  for(var l=0;l<buildinglist.length;l++){
                    if(buildinglist[l].name == building){
                      this.floorList = buildinglist[l].floorList
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

}
</script>
<style lang="less">
  .mint-header{
    height: 12vw;
  }
  .mint-header-title{
    overflow: visible;
  }
  .mint-header-title{
    font-size: 16px;
    font-weight: bold;
  }
</style>
<style lang="less" scoped>
  @fontSize1: 12px;
  @fontSize2: 14px;
  .selectLocation{
    background: white;
    height: 100vh;
  }
  .mint-header{
    background-color: #2A2828!important;
  }
  .location{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 13vw;
    background: white ;
    padding: 0 10px;
    box-shadow: 0 2px 4px rgba(166,166,166,0.5);
    position: relative;
    z-index: 100;
  }
  .location>span{
    min-width: 25%;
    height: 100%;
    line-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:0 10px;
    font-size: @fontSize2;
    }
  .location>.active{
    border-bottom: 2px solid #f9a207;
    color:#f9a207
  }
  .selectLocation>div{
    padding:0 0px
  }
  .selectLocation>div>div>div>p{
    text-align: left;
    color:#666666;
    font-size: @fontSize1;
    height: 13vw;
    line-height: 13vw;
    padding-left:15px;
    background: #f8f9fa;
  }
  .selectLocation>div>div>div>div p{
    text-align: left;
    font-size: @fontSize2;
    height: 13vw;
    line-height: 13vw;
    padding-left: 15px;
    position: relative;
    border-bottom: 1px solid #d8d8d8;
  }
  .selectLocation>div>div>div>div p>i{
    font-style: normal;
    position: absolute;
    left:-15px;
    color:#666666;
  }
  p.selected{
    color:#f9a207
  }
</style>
