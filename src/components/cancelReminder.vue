<template>
  <div class="cancelRemind" v-if="bool_show">
    <div class="holder">
			<div class="header"><img src="../../public/bell.svg" alt=""></div>
			<div class="body" v-html="content"></div>
			<div class="bottom">
				<div class="confirm" @click="confirm">{{confirmButton}}</div>
				<div class="cancel" @click="cancel">{{cancelButton}}</div>
			</div>
		</div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'cancelRemind',
  data(){
    return {
			bool_show:false,
			confirmButton:'Yes',
			cancelButton: "No",
			content:'',
			cancelBack:undefined,
			confirmBack:undefined,
    }
  },
  components: {
  },
  computed:{
  },
  methods:{
		show(content,confirm,cancel) {
			if(confirm){
				this.confirmBack = confirm;
			}
			if(cancel){
				this.cancelBack = cancel;
			}
			this.content = content;
			this.bool_show = true;
		},
		cancel() {
			this.bool_show = false;
			if(this.cancelBack){
			this.cancelBack();	
			}
			
		},
		confirm() {
			this.bool_show = false;
			if(this.confirmBack){
				this.confirmBack();
			}
			
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
  .cancelRemind{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
		top:0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0,0,0,0.3);
		z-index: 200;
	}
	@keyframes show
	{
		from {opacity: 0;}
		to {opacity:1;}
	}
	.holder{
		width:60%;
		height: 40%;
		border-radius: 10px;
		background: white;
		animation: show 0.2s linear;
	}
	
	.header{
		height: 20%;
	}
	.header>img{
		position: relative;
		top:-40%;
	}
	.body{
		height: 50%;
		width: 80%;
		padding: 0 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bottom{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		height: 30%;
	}
	.bottom>.bottom{
		margin-top:10px;
	}
	.cancel{
		background: #23D3B9;
		width: 80%;
		height: 8vw;
		line-height: 8vw;
		border-radius: 4vw;
		margin: 0 20%;
		color:white
	}
	.confirm{
    width: 80%;
		height: 8vw;
		line-height: 8vw;
		border-radius: 4vw;
		margin: 0 20%;
		color:#23D3B9;
		border:1px solid #23D3B9;    
	}
</style>
