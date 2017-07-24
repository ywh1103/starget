<template id="accounting">
<div style="width: 1195px;margin: 0 auto;">

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="保单号">
            <el-input size="small" v-model="formInline.policynumber" placeholder="保单号"></el-input>
        </el-form-item>
        <el-form-item label="理赔号">
            <el-input size="small" v-model="formInline.claimnumber" placeholder="理赔号"></el-input>
        </el-form-item>
        <el-form-item label="产品代码">
            <el-input size="small" v-model="formInline.productcode" placeholder="产品代码"></el-input>
        </el-form-item>
        <el-form-item label="理赔申请人">
            <el-input size="small" v-model="formInline.claimantname" placeholder="理赔申请人"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 9%;">
            <el-button size="small" type="primary" @click="onSubmit" style="padding: 7px 50px;">查询</el-button>
        </el-form-item>
    </el-form>

    <div style="width: 100%">
        <el-table :data="tableData" border >
            <el-table-column prop="policynumber" label="保单号" width="200"></el-table-column>
            <el-table-column prop="claimnumber" label="理赔号" width="300"></el-table-column>
            <el-table-column prop="productcode" label="产品代码"></el-table-column>
            <el-table-column prop="claimantname" label="理赔申请人"></el-table-column>
            <el-table-column prop="claimtime" label="时间"></el-table-column>
            <el-table-column prop="state" label="理赔状态" ></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">核算</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>

</div>
</template>
<script>
    export default{
        name:'accounting',
        data(){
            return{
                formInline:{
                    policynumber:'' ,
                    claimnumber:'',
                    productcode:'',
                    claimantname:''
                },
                tableData: [
                    {
                     policynumber: '86310020170230008001',
                     claimnumber:'C86310090000100WX17000000002102',
                     productcode: '900001',
                     claimantname: '哈哈哈',
                     state: '有效饿呢',
                        claimtime:'2017-12-12'
                     },
                     {
                         policynumber: '86310020170230008001',
                         claimnumber:'C86310090000100WX17000000002102',
                         productcode: '900001',
                         claimantname: '哈哈哈',
                         state: '有效饿呢',
                         claimtime:'2017-12-12'
                     }
                ]
            }
        },
        methods: {
            onSubmit() {
                this.formInline.policynumber=='';
                this.formInline.claimnumber=='';
                this.formInline.productcode=='';
                this.formInline.claimantname=='';
                if(this.formInline.policynumber=='' && this.formInline.claimnumber==''&&this.formInline.productcode==''&&this.formInline.claimantname==''){
                    this.$alert('请输入查询条件', '', {
                        confirmButtonText: '确定'
                    });
                    return false
                }
                console.log(this.formInline.policynumber)
                var data = [];
                var _this=this;
                var claimtasksData = {
                    "policyNumber":this.formInline.policynumber,
                    "claimNumber":this.formInline.claimnumber,
                    "productCode":this.formInline.productcode,
                    "claimantName":this.formInline.claimantname
                };
                console.log(claimtasksData);
                $.ajax({
                    type:"POST",
                    url:"rest/v0/claims/claimtasks",
                    async:true,
                    data:JSON.stringify(claimtasksData),
                    dataType:'json',
                    contentType:'application/json;charset=UTF-8',
                    success:function(res){
                        console.log(res);
                        sessionStorage.setItem("res",JSON.stringify(res))
                        for (var i = 0; i <res.length; i++) {
                            var obj = {};
                            obj.policynumber =res[i].policyNumber;
                            obj.claimnumber = res[i].claimNumber;
                            obj.productcode = res[i].productCode;
                            obj.claimantname =res[i].claimant;
                            obj.claimtime=res[i].claimTime.split("T")[0];
                            obj.state=res[i].status;
                            data[i] = obj
                        }
                        _this.tableData = data
                    },
                    error:function (res) {
                        console.log(res)
                        if(JSON.parse(res.responseText).ErrorCode !=undefined){
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
            handleEdit(index,row){
                console.log(row);
                sessionStorage.setItem("policy",row.policynumber);
                sessionStorage.setItem("claimnumber",row.claimnumber);
                sessionStorage.setItem("index",index);
                this.$router.push('/accountDetail');
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
        margin-bottom: 0;
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
</style>