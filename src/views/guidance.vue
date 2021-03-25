<template>
  <div class="guidance">
		<swiper ref="mySwiper" :options="swiperOptions" class="mySwiper">
			<swiper-slide><img src="../../public/guide1.png" alt=""><img src="../../public/guideButton.svg" class="button" alt="" @click="slideNext"></swiper-slide>
			<swiper-slide><img src="../../public/guide2.png" alt=""><img src="../../public/guideButton.svg" class="button" alt="" @click="slideNext" style="bottom:100vw"></swiper-slide>
			<swiper-slide><img src="../../public/guide3.png" alt=""><img src="../../public/guideButton.svg" class="button" alt="" @click="slideNext"></swiper-slide>
		</swiper>
  </div>
</template>

<script>
// @ is an alias to /src
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: 'guidance',
  data(){
    return {
      swiperOptions:{
				
			}
    }
	},
	computed:{
		
	},
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  methods:{
		slideNext(){
			console.log(this.$refs.mySwiper.$swiper.activeIndex)
			if(this.$refs.mySwiper.$swiper.activeIndex == 2){
				var building = localStorage.getItem('Mars_myBuilding')
				var floor = localStorage.getItem('Mars_myfloor')
				localStorage.setItem('isNotfirstTime', true)
				this.$router.push({path:'/',query:{building:building,floor:floor}})
			}
			this.$refs.mySwiper.$swiper.slideNext();
		}
  },
}
</script>
<style lang="less">

</style>
<style lang="less" scoped>
	.guidance{
		height: 100%;
	}
	.guidance>.mySwiper{
		height: 100%;
	}
	.guidance>.mySwiper>div>.swiper-slide>img:not(.button){
		// height: 100%;
		width: 100%;
		position: relative;
		z-index: 0;
	}
	.guidance>.mySwiper>div>.swiper-slide>img.button{
		position: absolute;
		bottom:20vw;
		left:50%;
		width: 128px;
		margin-left: -64px;
		display: block;
		z-index: 100;
	}
</style>