<template id="header">
<div>

    <div class="header">
        <el-row>
            <el-col :span="24">
                <el-menu default-active="2" class="el-menu-demo" mode="horizontal" @select="">
                    <div style="width: 1195px;margin: 0 auto;" id="style">
                        <el-menu-item index="1" style="width: 13%" id="logo"><img src="../assets/logo.png" style="width: 100%;margin-top: 6%;"></el-menu-item>
                        <el-menu-item index="2" v-if="isHome"><router-link to="/header">保单首页</router-link></el-menu-item>
                        <el-menu-item index="3" v-if="isSet"><router-link to="/settlement">理赔录入</router-link></el-menu-item>
                        <el-menu-item index="4" v-if="isAcu"><router-link to="/accounting">理赔核算</router-link></el-menu-item>
                        <el-menu-item index="5" v-if="isTax"><router-link to="/taxfree">税优查询</router-link></el-menu-item>
                        <el-menu-item index="6" v-if="isShow" style="color: #fff"><router-link to="/admin">管理员</router-link></el-menu-item>
                        <div style="float: right;margin-right: 5%">
                            <el-menu-item index="7" style="color: #fff"><a>{{username}}</a></el-menu-item>
                            <el-menu-item index="8" style="color: #fff" @click="logout"><a>登出</a></el-menu-item>
                        </div>
                    </div>
                </el-menu>
            </el-col>
        </el-row>
    </div>

    <!--开始加载中间视图-->
    <router-view></router-view>

</div>
</template>
<script>
    export default{
        name:'header',
        data(){
            return{
                isHome:true,
                isSet:true,
                isAcu:true,
                isTax:true,
                isShow:true,
                username:''
            }
        },
        mounted(){
            var user=sessionStorage.getItem("user")
            console.log(user)
            if(user=="admin"){
                this.isShow=true;
                this.isHome=false;
                this.isSet=false;
                this.isAcu=false;
                this.isTax=false;
                this.username='管理员，你好'
            }else if(user!="admin"){
                this.isShow=false;
                this.isHome=true;
                this.isSet=true;
                this.isAcu=true;
                this.isTax=true;
                this.username=user
            }
        },
        methods:{
            logout:function(){
               var  _this=this;
                $.ajax({
                    type:"GET",
                    url:"rest/v0/users/logout",
                    async:true,
                    data:"",
                    dataType:'json',
                    success:function() {
                        _this.$router.push("/")
                    },
                    error:function(){
                    }
                });
            }
        }
    }
</script>
<style>
    #style li{
        padding:0;
    }
    #style a{
        display: inline-block;
        padding: 0 20px;
    }
    .el-menu--horizontal .el-menu-item:hover, .el-menu--horizontal .el-submenu__title:hover {
        background-color: rgba(94, 94, 97, 0.26);
    }
    #logo:hover{
        background-color: #0da9eb;
    }
</style>