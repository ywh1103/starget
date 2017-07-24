<template id="admin">
    <div class="controller" style="width: 1195px;margin: 0 auto;">

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input size="small" v-model="formInline.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="工号">
                <el-input size="small" v-model="formInline.worknumber" placeholder="工号"></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 9%;">
                <el-button size="small" type="primary" @click="onSearch" style="padding: 7px 50px;">搜索</el-button>
            </el-form-item>
        </el-form>

        <div class="usersList">
            <div class="listAdd">
                <h2 style="line-height: 56px; float: left;">用户列表</h2>
                <!--<el-button  style="float: right;margin-top: 1%" @click="addUser" >添加用户</el-button>-->

                <el-button style="float: right;margin-top: 1%" @click="addUser" id="add">添加用户</el-button>
                <el-dialog title="添加" :visible.sync="dialogFormVisible1" class="dialog">
                    <el-form :model="formadd" style="box-shadow: none">
                        <el-form-item label="姓名" :label-width="formLabelWidth">
                            <el-input style="width: 45%;margin-left: 0;" v-model="formadd.nickname" auto-complete="off" placeholder="请输入要添加的姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="工号" :label-width="formLabelWidth">
                            <el-input style="width: 45%;margin-left: 0;" v-model="formadd.username" auto-complete="off" placeholder="请输入要添加的工号"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" :label-width="formLabelWidth">
                            <el-input style="width: 45%;margin-left: 0;" v-model="formadd.pwd" auto-complete="off" placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                        <el-button type="primary" @click="insureadd">确 定</el-button>
                    </div>
                </el-dialog>

            </div>

            <div style="width: 100%;margin-top: 50px;">
                <el-table :data="tableData" border >
                    <el-table-column prop="worknumber" label="工号"></el-table-column>
                    <el-table-column prop="name" label="姓名" ></el-table-column>
                    <el-table-column label="编辑" id="edit">
                        <template scope="scope">

                            <el-button @click="Modify(scope.$index, scope.row)" icon="edit" ></el-button>

                            <el-dialog title="修改" :visible.sync="dialogFormVisible" class="dialog">
                                <el-form :model="form" style="box-shadow: none">
                                    <el-form-item label="姓名" :label-width="formLabelWidth">
                                        <el-input style="width: 45%;margin-left: -53%;" v-model="form.nickname" auto-complete="off" placeholder="请输入姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="工号" :label-width="formLabelWidth">
                                        <el-input style="width: 45%;margin-left: -53%;" v-model="form.username" auto-complete="off" placeholder="请输入工号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" :label-width="formLabelWidth">
                                        <el-input style="width: 45%;margin-left: -53%;" v-model="form.pwd" auto-complete="off" placeholder="请输入要修改的密码"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="insure">确 定</el-button>
                                </div>
                            </el-dialog>

                        </template>
                    </el-table-column>

                </el-table>
            </div>



        </div>
    </div>
</template>

<script>
    export default {
        name:'admin',
        data() {
            return {
                formInline:{
                    name:'' ,
                    worknumber:''
                },
                tableData: [
                    /*{
                    worknumber: '111111',
                    name: '王小虎',
                     },
                    {
                        worknumber: '2222222222',
                        name: 'yang小虎',
                    },
                    {
                        worknumber: '333333333333',
                        name: 'cao小虎',
                    },*/

            ],
                dialogFormVisible: false,
                form:{
                    nickname:'',
                    username:'',
                    pwd:''
                },
                formLabelWidth: '100px',
                dialogFormVisible1: false,
                formadd:{
                    nickname:'',
                    username:'',
                    pwd:''
                },
            }
        },
        methods: {
            onSearch() {
                var data = [];
                    var searchData={
                        "userName":this.formInline.worknumber,
                        "nickName":this.formInline.name
                    }
                    var _this=this;
                _this.formInline.worknumber="";
                _this.formInline.name="";
                    $.ajax({
                        type:"POST",
                        url:"rest/v0/users/query",
                        async:true,
                        data:JSON.stringify(searchData),
                        dataType:'json',
                        contentType:'application/json;charset=UTF-8',
                        success:function(res) {
                                for(var i=0;i<res.length;i++){
                                    var obj = {};
                                    obj.worknumber =res[i].userName;
                                    obj.name = res[i].nickName;
                                    data[i] = obj
                                }
                            _this.tableData = data
                        },
                        error:function(res) {
                            console.log(res);
                            _this.$alert("无查询结果", '', {
                                confirmButtonText: '确定'
                            })
                        }
                    });
                },
            Modify(index, row){
                this.dialogFormVisible = true;
                console.log(index)
                console.log(row)
                this.form.username=row.worknumber;
                this.form.nickname=row.name;
            },
            insure(){
                this.dialogFormVisible = false;
                var modifyData={
                    "userName":this.form.username,
                    "nickName":this.form.nickname,
                    "password":this.form.pwd
                }
                var _this=this;
                $.ajax({
                    type:"POST",
                    url:"rest/v0/users/adminModify",
                    async:true,
                    data:JSON.stringify(modifyData),
                    dataType:'json',
                    contentType:'application/json;charset=UTF-8',
                    success:function(res){
                        console.log(res)
                        if(res.returnCode="SUCCESS"){
                            _this.$alert("修改成功", '', {
                                confirmButtonText: '确定'
                            })
                        }
                    },
                    error:function(res){
                        if(JSON.parse(res.responseText).ErrorCode =="70002"){
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
            },
            addUser(){
                this.dialogFormVisible1 = true;
            },
            insureadd(){
                this.dialogFormVisible1 = false;
                var addData={
                    "userName":this.formadd.username,
                    "nickName":this.formadd.nickname,
                    "password":this.formadd.pwd
                }
                var _this=this
                $.ajax({
                    type:"POST",
                    url:"rest/v0/users/registration",
                    async:true,
                    data:JSON.stringify(addData),
                    dataType:'json',
                    contentType:'application/json;charset=UTF-8',
                    success:function(res){
                        if(res.returnCode=="SUCCESS"){
                            _this.formadd.username="";
                            _this.formadd.nickname="";
                            _this.formadd.pwd="";
                            _this.$alert("添加成功", '', {
                                confirmButtonText: '确定'
                            })
                        }
                    },
                    error:function(res){
                        if(JSON.parse(res.responseText).ErrorCode =="70001"){
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
            },
        }
</script>
<style>
    .el-menu{
        background-color: #0da9eb;
    }
    .el-menu-item.is-active {
        color: #fbfdff;
    }
    .el-menu--horizontal .el-menu-item:hover, .el-menu--horizontal .el-submenu__title:hover {
        background-color: rgba(94, 94, 97, 0.26);
    }
    .el-form{
        box-shadow: 1px 1px 5px #ccc;    margin-bottom: 10px;
        margin-top: 10px;
    }
    .el-form--inline .el-form-item__label {
        width: 116px;    font-size: 12px;
    }
    .el-form--inline .el-form-item {
        display: inline-block;
        margin-right: 8%;
        vertical-align: top;
        margin-top: 2px;
        margin-bottom: 5px;
    }
    .el-form-item {
        margin-bottom: 0px;
    }
    .el-table th>.cell {
        text-align: center;
    }
    .el-table__body-wrapper {
        text-align: center;
    }
    .dialog .el-form-item {
        margin-bottom: 15px;
    }
    .el-dialog--small {
        width: 45%;
    }
    .el-table {
        font-size: 12px;
    }
    .el-table th {
        text-align: center;
    }
    .el-table__row td{
        text-align: center;
    }
    .el-input--small {
        font-size: 11px;
    }
    .el-form--inline .el-form-item__label {
        width: 116px;
        font-size: 12px;
    }
    #add:hover{
        color: #fff;
    }
</style>