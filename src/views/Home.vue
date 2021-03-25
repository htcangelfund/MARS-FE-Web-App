<template>
  <div class="home">
    <div class="header">
      <span><img src="../../public/back.svg" alt="" @click="back()"></span>
      <span><span style="font-size:16px">Meeting Room Status</span></span>
      <!-- <router-link to="setting"><img src="../../public/setting.svg" alt=""></router-link> -->
      <span></span>
    </div>
    <span style="position:absolute;bottom:87.5%;right:18px;margin:10px 0px;color:#113136;font-size:12px;display:flex;align-items:center" @click="showPicker">{{building}} {{floor}} <img src="../../public/down.svg" alt="" style="margin-left:5px"></span>
    <div class="label">
      <!-- <span @click="toggleAvailable()" :class="{'active': onlyAvailable}">Only Available</span> -->
      <div>
        <span style="margin:0 5px;font-size:14px;color:#113136">Only Available</span>
        <mt-switch v-model="onlyAvailable"></mt-switch>
      </div>
    </div>
    <!-- <div class="label2">
    </div> -->
    <div class="body">
      
      <div class="content" v-if="onlyAvailable">
        <div v-for="(item,index) in availableRoomList" :key="index" :id="item.floor">
          <div class="floorTitle">
            <h4><i style="width:10px;height:10px;border-radius:50%;background:red;display:inline-block;margin:0 5px 0 2px;border:2px solid white"></i>{{item.floor}}</h4>
          </div>
          <div v-for="(room,index2) in item.roomList" :key="index2" class="room" >
            <!-- <div :style="{'background': room.status == 'AVAILABLE' ? '#84C001' : room.status == 'UNKNOWN' ? '#999999' :'#E12D2D'}" style="width:6px;height:8vh;postion:absolute;left:0px;top:1vh;border-radius:3px"></div> -->
            <div>
              <img src="../../public/available.svg" alt="" v-if="room.status == 'AVAILABLE'">
              <div>
                <p :style="{color: room.status == 'AVAILABLE' ? '#25D0B8' : room.status == 'UNKNOWN' ? '#999999' :'#FF9C8B'}" style="margin-top:4vw">Meeting Room <span :style="{'background': room.status == 'AVAILABLE' ? '#CEFFF8' : room.status == 'UNKNOWN' ? '#e6e6e6' :'#FFDCD7', color: room.status == 'AVAILABLE' ? '#11AD98' : room.status == 'UNKNOWN' ? '#999999' :'#F73F3F'}">{{room.status == 'AVAILABLE' ? 'Available' : room.status == 'UNKNOWN' ? 'Unknow' : room.status == 'OCCUPIED' ? 'Occupied' : ''}}</span></p>
                <p :style="{color: room.status == 'AVAILABLE' ? '#13C8AF' : room.status == 'UNKNOWN' ? '#999999' :'#F98B79'}">{{room.name}}</p>
              </div>
            </div>
            <!-- <span :style="{'background': room.status == 'AVAILABLE' ? '#EDFFC7' : '#FFDEDE', color: room.status == 'AVAILABLE' ? '#84C001' : room.status == 'UNKNOWN' ? '#999999' :'#E12D2D'}">{{room.status == 'AVAILABLE' ? 'Available' : room.status == 'UNKNOWN' ? 'Unknow' : room.status == 'OCCUPIED' ? 'Occupied' : ''}}</span> -->
            <!-- <span @click="toggleRemind(item,room)" v-if="room.remind == false && room.status == 'OCCUPIED'" class="remindMeButton">Remind me</span> -->
            <span @click="toggleRemind(item,room)" v-if="room.remind == true" class="cancelRemindButton">Don't Remind</span>
            <i class="notice" v-if="room.remind == true"><img src="../../public/notice.svg" alt=""></i>
          </div>
        </div>
      </div>
      <div class="content" v-if="!onlyAvailable">
        <div v-for="(item,index) in meetingRomeList" :key="index" :id="item.floor">
          <div class="floorTitle">
            <h4><i style="width:10px;height:10px;border-radius:50%;background:red;display:inline-block;margin:0 5px 0 2px;border:2px solid white"></i>{{item.floor}}</h4>
            <span v-show="item.roomList.every(function(room){ return room.status == 'OCCUPIED'})">Remind Me<mt-switch v-model="allRemindObj[item.floor]" @change="toggleAllRemind(item)" ></mt-switch></span>
          </div>
          
          <div v-for="(room,index2) in item.roomList" :key="index2" class="room">
            <!-- <div :style="{'background': room.status == 'AVAILABLE' ? '#84C001' : room.status == 'UNKNOWN' ? '#999999' :'#E12D2D'}" style="width:6px;height:8vh;postion:absolute;left:0px;top:1vh;border-radius:3px"></div> -->
            <div>
              <img src="../../public/available.svg" alt="" v-if="room.status == 'AVAILABLE'">
              <img src="../../public/occupied.svg" alt="" v-if="room.status != 'AVAILABLE'">
              <div>
                <p :style="{color: room.status == 'AVAILABLE' ? '#25D0B8' : room.status == 'UNKNOWN' ? '#999999' :'#FF9C8B'}" style="margin-top:2.5vh">Meeting Room <span :style="{'background': room.status == 'AVAILABLE' ? '#CEFFF8' : room.status == 'UNKNOWN' ? '#e6e6e6' :'#FFDCD7', color: room.status == 'AVAILABLE' ? '#11AD98' : room.status == 'UNKNOWN' ? '#999999' :'#F73F3F'}">{{room.status == 'AVAILABLE' ? 'Available' : room.status == 'UNKNOWN' ? 'Unknow' : room.status == 'OCCUPIED' ? 'Occupied' : ''}}</span></p>
                <p :style="{color: room.status == 'AVAILABLE' ? '#13C8AF' : room.status == 'UNKNOWN' ? '#999999' :'#F98B79'}">{{room.name}}</p>
              </div>
            </div>
            
            <span @click="toggleRemind(item,room)" v-show="room.remind == false && room.status == 'OCCUPIED'" class="remindMeButton" style="z-index:1">Remind me</span>
            <span @click="toggleRemind(item,room)" v-show="room.remind == true" class="cancelRemindButton" style="z-index:1">Don't Remind</span>
            <i class="notice" v-if="room.remind == true"><img src="../../public/notice.svg" alt=""></i>
            <img src="../../public/AvailableBg.svg" alt="" v-if="room.status == 'AVAILABLE'" style="position:absolute;right:20px;z-index:0">
          </div>
        </div>
      </div>
    </div>
    <Remind ref="remind"/>
    <CancelReminder ref="cancelReminder"/>
    <MyToast ref="myToast"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Remind from '../components/remind.vue'
import CancelReminder from '../components/cancelReminder.vue'
import MyToast from '../components/myToast'
import IosSelect from '../../node_modules/iosselect/src/iosSelect'
import '../../node_modules/iosselect/src/iosSelect.css'
import _ from 'lodash'
export default {
  name: 'Home',
  data(){
    return {
      city: '',
      building: '',
      floor: '',
      onlyAvailable: false,
      meetingRomeList:[],
      timer:null,
      allRemindObj:{
        
      },
      buildingList:[
        {
          id: '1',
          value:'TaiKooHui T2',
          label:'TaiKooHui T2'
        },
      ],
      floorList:[
        {
          parentId: '1',
          id:'a',
          value:'24F'
        },
        {
          parentId: '1',
          id:'b',
          value:'25F'
        },
      ],
      flag:1,
      flag2:1,
    }
  },
  components: {
    Remind,
    CancelReminder,
    MyToast,
  },
  computed:{
    availableRoomList(){
      return this.meetingRomeList.map(function(item){
        var availableRoom = item.roomList.filter(function(room){
          return room.status == 'AVAILABLE'
        })
        if(availableRoom.length > 0){
          return {
            floor: item.floor,
            roomList: availableRoom,
          }
        }
      })
    }
  },
  methods:{
    showPicker(){
      var that = this
      this.picker = new IosSelect(2,
          [that.buildingList,that.floorList],
          {
            title: 'Select building and floor',
            relation: [1],
            itemHeight: 50,
            itemShowCount: 5,
            sureText:'Done',
            closeText:'Cancel',
            showAnimate: true,
            callback: function (building,floor) {
              that.building = building.value
              that.floor = floor.value
              localStorage.setItem('Mars_myBuilding', that.building)
              localStorage.setItem('Mars_myfloor',that.floor)
            }
      });
    },
    toggleRemind(item,room){
      console.log(room.remind)
      if(room.remind == false){
        room.remind = !room.remind
        this.$axios.get(this.server +'/click',{timeout: 6000})
        this.reminderObj = JSON.parse(localStorage.getItem('reminderObj'))
        if(this.reminderObj && this.reminderObj[item.floor]){
          this.reminderObj[item.floor][room.name] = room.remind
          localStorage.setItem('reminderObj',JSON.stringify(this.reminderObj))
        }else if(!this.reminderObj){
          this.reminderObj = {}
          this.reminderObj[item.floor] = {}
          this.reminderObj[item.floor][room.name] = room.remind
          localStorage.setItem('reminderObj',JSON.stringify(this.reminderObj))
        }else if(this.reminderObj && !this.reminderObj[item.floor]){
          this.reminderObj[item.floor] = {}
          this.reminderObj[item.floor][room.name] = room.remind
          localStorage.setItem('reminderObj',JSON.stringify(this.reminderObj))
        }
        this.allRemindObj[item.floor] = item.roomList.every(function(room){
          return room.remind == true
        })
        console.log(item.roomList)
        console.log(this.allRemindObj[item.floor])
      }else{
        var that = this
        var content = 'Are you sure to cancel the reminder?'
        var confirmHandler = function(){


          room.remind = !room.remind
          this.reminderObj = JSON.parse(localStorage.getItem('reminderObj'))
          if(this.reminderObj && this.reminderObj[item.floor]){
            this.reminderObj[item.floor][room.name] = room.remind
            localStorage.setItem('reminderObj',JSON.stringify(this.reminderObj))
          }else if(!this.reminderObj){
            this.reminderObj = {}
            this.reminderObj[item.floor] = {}
            this.reminderObj[item.floor][room.name] = room.remind
            localStorage.setItem('reminderObj',JSON.stringify(this.reminderObj))
          }else if(this.reminderObj && !this.reminderObj[item.floor]){
            this.reminderObj[item.floor] = {}
            this.reminderObj[item.floor][room.name] = room.remind
            localStorage.setItem('reminderObj',JSON.stringify(this.reminderObj))
          }
          this.allRemindObj[item.floor] = item.roomList.every(function(room){
            return room.remind == true
          })
        }
        that.$refs.cancelReminder.show(content,confirmHandler)
      }
    },
    toggleAllRemind(item){
      var that = this
      that.reminderObj = JSON.parse(localStorage.getItem('reminderObj'))
      item.roomList.forEach(function(room){
        room.remind = that.allRemindObj[item.floor]
        that.reminderObj[item.floor][room.name] = room.remind
      })
      localStorage.setItem('reminderObj',JSON.stringify(that.reminderObj))
    },
    back(){
      // this.$router.push('/selectLocation')
    },
    toggleAvailable(){
      this.onlyAvailable = !this.onlyAvailable
      console.log(this.onlyAvailable)
    },
    loadRoomAndStatus(){
      var that = this
      that.Indicator.open()
      this.reminderObj = JSON.parse(localStorage.getItem('reminderObj'))
      this.$axios.get(this.server +'/rooms/status',{timeout: 6000}).then(function(res){
        that.Indicator.close()
        var obj = {}
        res.data.forEach(function(item,index){
          if(item.currentStatus.status == "UNKNOWN"){
            return
          }
          // console.log(that.reminderObj)
          if(index == 0 || !obj[item.room.floor] ){
            obj[item.room.floor] = [
              {
                name: item.room.name,
                status: item.currentStatus.status,
                remind: that.reminderObj ? (that.reminderObj[item.room.floor] ? that.reminderObj[item.room.floor][item.room.name] : false) || false : false
              }
            ]
          }else{
            obj[item.room.floor].push({
              name: item.room.name,
              status: item.currentStatus.status,
              remind: that.reminderObj ? (that.reminderObj[item.room.floor] ? that.reminderObj[item.room.floor][item.room.name] : false) || false : false
            })
          }
        })
        res.data.forEach(function(item){
          if(!that.reminderObj){
            that.reminderObj = {}
            if(!that.reminderObj[item.room.floor]){
              that.reminderObj[item.room.floor] = {}
              if(!that.reminderObj[item.room.floor][item.room.name])
              that.reminderObj[item.room.floor][item.room.name] = false
            }
          }else{
            if(!that.reminderObj[item.room.floor]){
              that.reminderObj[item.room.floor] = {}
              that.reminderObj[item.room.floor][item.room.name] = false
            }else{
              if(!that.reminderObj[item.room.floor][item.room.name])
              that.reminderObj[item.room.floor][item.room.name] = false
            }
          }
        })
        localStorage.setItem('reminderObj',JSON.stringify(that.reminderObj))
        var list = Object.keys(obj).map(function(key){
          return {
            floor:key,
            roomList: _.sortBy(obj[key],function(item){
              return item.status
            }),
            allRemind: obj[key].every(function(room){ return room.remind == true})
          }
        })
        Object.keys(obj).forEach(function(key){
          that.allRemindObj[key] = obj[key].every(function(room){
            return room.remind == true
          })
        })
        that.meetingRomeList = list
        // console.log(that.meetingRomeList)
      }).catch(function(err){
        that.Indicator.close()
        that.Toast('errReason:'+err)
      })
    }
  },
  created(){
    this.city = this.$route.query.city
    this.building = localStorage.getItem('Mars_myBuilding') || this.$route.query.building
    this.floor = localStorage.getItem('Mars_myfloor') || this.$route.query.floor
    this.loadRoomAndStatus()
    var that = this
    this.timer = setInterval(function(){
      that.loadRoomAndStatus()
    },60000)
    this.reminderObj = JSON.parse(localStorage.getItem('reminderObj'))
  },
  mounted(){
    
    // this.$refs.remind.show()
    // this.$refs.cancelReminder.show('Are you sure to cancel this reminder?')
    // this.$refs.myToast.show()
  },  
  updated(){
      var floor = localStorage.getItem('Mars_myfloor') || this.$route.query.floor
      var that = this
      if(document.getElementById(floor) && this.flag ==1) {
        document.getElementById(floor).scrollIntoView({
          behavior: 'smooth'
        });

        this.flag ++
      }
      if(this.flag2 == 1){
        console.log(this.meetingRomeList)
        this.meetingRomeList.forEach(function(item){
          if(item.floor == floor){
            var allIsOccupied = item.roomList.every(function(room){
              return room.status == "OCCUPIED"
            })
            if(allIsOccupied){
              var confirmHandler = function(){
                that.reminderObj = JSON.parse(localStorage.getItem('reminderObj'))
                item.roomList.forEach(function(room){
                  room.remind = true
                  that.allRemindObj[item.floor] = true
                  that.reminderObj[item.floor][room.name] = room.remind
                })
                localStorage.setItem('reminderObj',JSON.stringify(that.reminderObj))
              }
              var content = 'Sorry that all the meeting rooms on '+item.floor+' floor are all in use. Would you like to get the reminder while one meeting room of 12 floor is available?'
              that.$refs.remind.show(content,confirmHandler)
              that.flag2++
            }
          }else{
            return
          }
          
        })
      }
  },
  beforeDestroy(){
    clearTimeout(this.timer)
  }
}
</script>
<style lang="less">
  .mint-msgbox{
    border-radius: 20px!important;
  }
  .mint-msgbox-message{
    font-size: 12px;
    line-height: 20px!important;
  }
  .mint-switch-input:checked + .mint-switch-core{
    background: #23D3B9!important;
    border-color:transparent!important
  }
  .mint-switch-core{
    width: 46px!important;
    height: 24px!important;
    background-color:#979797!important
  }
  .mint-switch-core::before{
    width: 44px!important;
    height: 22px!important;
    background-color:#979797!important
  }
  .mint-switch-core::after{
    width: 22px!important;
    height: 22px!important;
  }
  .ios-select-widget-box header.iosselect-header{
    background: #13C8AF;
  }
  .ios-select-widget-box header.iosselect-header a{
    color:white
  }
  .ios-select-widget-box #iosSelectTitle{
    color:white
  }
</style>
<style lang="less" scoped>
  .home .mint-msgbox-message{
    font-size: 12px;
  }
  .home{
    background: white;
    height: 100%;
    position: relative;
  }
  .home>.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    background: white;
    padding: 0 10px 0 5px;
    color:#1D3834;
  }
  .home>.header>a,.home>.header>span{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 18px;
    text-decoration: none;
    color: #113136;
    font-weight: 600;
  }
  .home>.header>span>img{
    // width: 100%;
    width: 16px;
    height: 16px;

  }
  .home>.body{
    width: 100%;
    height: 80%;
    position: absolute;
    bottom: 0;
    // border-radius: 20px 20px 0 0;
    background: #ECEFF1;
    overflow-y: auto;
    
  }
  .home>.label{
    width: 100%;
    height: 7.5%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1vh 12px;
    position: absolute;
    bottom:80%;
    background: white;
    border-radius: 16px 16px 0 0;
    box-sizing: border-box;
    box-shadow: 0px 2px 6px rgba(166,166,166,0.8);
    z-index: 100;
  }
  // .home>.body>.label2{
  //   width: 100%;
  //   height: 7.5%;
  //   display: flex;
  //   justify-content: flex-start;
  //   align-items: center;
  //   padding: 1vh;
  //   background: white;
  //   border-radius: 20px 20px 0 0;
  //   box-shadow: 0 2px 4px rgba(166,166,166,0.2);
  //   box-sizing: border-box;
  // }
  .home>.label>div{
    width: 50%;
    height: 8vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .home>.body>.content{
    min-height: 92.5%;
    background: #EEF4F4;
    padding: 10px 16px 0;
    // overflow: auto;
  }
  .home>.body>.content>div>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .home>.body>.content>div>div>h4{
    text-align: left;
    font-size: 11px;
    display: flex;
    align-items: center;
  }
  .home>.body>.content>div>div>span{
    display: flex;
    align-items: center;
    font-size: 11px;
    color:#666666
  }
  .home>.body>.content>div>div>span>label{
    margin:0 0 0 5px
  }
  .home>.body>.content>div>.room{
    width: 100%;
    background: white;
    height: 11vh;
    border-radius: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 12px 0;
    // padding: 10px 10px 10px 0px;
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 2px 10px rgba(93,194,108,0.2);
  }
  .home>.body>.content>div>.room>div:nth-of-type(2){
    // margin-right: 10vw;
  }
  .home>.body>.content>div>.room>span{
    height: 28px;
    line-height: 28px;
    width: 30vw;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
  }
  .home>.body>.content>div>.room>div{
    display: flex;
    height: 100%;
  }
  .home>.body>.content>div>.room>div>img{
    height: 100%;
    width: auto;
  }
  .home>.body>.content>div>.room>div>div>p{
    text-align: left;
    font-size: 12px;
    margin-left: 5px;
  }
  .home>.body>.content>div>.room>div>div>p:nth-of-type(2){
    font-size: 18px;
    font-weight: 600;
    margin-top: 5px;
    font-family: 'Din Alternate';
  }
  .home>.body>.content>div>.room>div>div>p>span{
    padding: 2px 5px;
    border-radius: 5px;
    margin:0 5px;
    font-size: 10px;
  }
  .home>.body>.content .remindMeButton{
    color:#FFCCC3;
    background:white ;
    border:1px solid #FFCCC3;
    width: 20vw!important;
    height: 6vw!important;
    border-radius: 3vw!important;
    font-size: 12px!important;
    text-align: center;
    line-height: 6vw!important;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:0.6rem
  }
  .home>.body>.content .cancelRemindButton{
    color:#E12D2D;
    background:#FFDEDE ;
    border:1px solid #E12D2D;
    width: 24vw!important;
    height: 6vw!important;
    border-radius: 3vw!important;
    font-size: 12px!important;
    text-align: center;
    line-height: 6vw!important;
    display: flex;
    justify-content: center;
    align-items: center;  
    margin-left:0rem
  }
  .home>.body>.content .notice{
    position: absolute;
    top:5px;
    right:5px;
  }
</style>

