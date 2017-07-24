<template id="login">
<div>

    <header class="he">
        <div class="layout">
				<div class="logo-pic">
					<img src="src/assets/login-bg.png"/>
				</div>
				<div class="login-box">
					<em>登录</em>
					<div class="inputbox">

						<el-input type="text" size="small" v-model="inptext" class="input-phone" placeholder="请输入账号"></el-input>
						<el-input type="password" v-model="iptpwd" class="input-pwd" placeholder="请输入密码"></el-input>
						<el-button type="primary" @click="login"><router-link to="/header">登录</router-link></el-button>
						<!--<div id="login-btn" @click="login"><span>登录</span></div>-->

					</div>
				</div>
			</div>
    </header>


</div>
</template>
<script>
    export default{
        name:'login',
		data(){
            return{
                inptext:'',
                iptpwd:''
			}
		},
		methods:{
            login:function(){
                if(this.inptext=="" || this.iptpwd==""){
                    this.$alert('账号，密码不能为空', '', {
                        confirmButtonText: '确定'
                    });
				}else{
                    var loginData={
                        "passWord":this.iptpwd,
                        "userName":this.inptext
					}
                    var _this=this;
                   /* if(this.inptext=="admin"){
					 _this.$router.push("/admin")
					 }else{
					 _this.$router.push("/header")
					 }*/
						sessionStorage.setItem("user",this.inptext)
                    $.ajax({
                        type:"POST",
                        url:"rest/v0/users/login",
                        async:true,
                        data:JSON.stringify(loginData),
                        dataType:'json',
                        contentType:'application/json;charset=UTF-8',
						success:function(res){
                            _this.$message({
                                message: '登陆成功！',
                                type: 'success'
                            });
                            if(_this.inptext=="admin"){
                                _this.$router.push("/admin")
                            }else{
                                _this.$router.push("/header")
                            }
//                            _this.$router.push("/header")
							sessionStorage.setItem("user",_this.inptext)
						},
						error:function(res){
                            console.log(res)
                            if(JSON.parse(res.responseText).ErrorCode =="70008"){
                                var error=JSON.parse(res.responseText).ErrorMsg;

                                _this.$alert(error, '', {
                                    confirmButtonText: '确定'
                                })
                            }else{
                                _this.$alert("系统错误，请联系客服", '', {
                                    confirmButtonText: '确定'
                                })
                            }

						}
					})
				}

			}
		}
    }
</script>
<style>
	.el-button {
		display: inline-block;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		background: #20a0ff;
		color: #4b6f98;
		margin: 0;
		padding: 10px 45px;
		border-radius: 4px;
		margin-left: 33%;
		margin-top: 6%;
	}
</style>
