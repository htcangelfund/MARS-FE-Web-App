<template>
  <div class="myToast" v-if="bool_show" >
		<span>You can shut down the reminder by toggle "Remind Me <i></i>"</span>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'remind',
  data(){
    return {
			bool_show:false,
    }
  },
  components: {
  },
  computed:{
  },
  methods:{
		show() {
			this.bool_show = true
			var that = this
			setTimeout(function(){
				that.bool_show = false
			},2000)
		}

  },
  created(){
  },
  mounted(){
  },
  updated(){
  },
  beforeDestroy(){
  }
}
</script>
<style lang="less">


</style>
<style lang="less" scoped>
	@keyframes show
	{
		from {opacity: 0;}
		to {opacity:1;}
	}
  .myToast{
    position: fixed;
    width: 90%;
    height: 15vw;
    margin: 0 5%;
		top:40%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0,0,0,0.8);
		border-radius: 5px;
		z-index: 200;
		animation: show 0.3s linear;
		color:white;
		font-size: 12px;
	}
	// @keyframes hiden
	// {
	// 	from {opacity: 1;}
	// 	to {display: none;}
	// }
	// .myToast.hide{
	// 	animation: hiden 0.3s linear;
	// 	animation-fill-mode: forwards;
	// 	// display: none;
	// }
</style>
