<template id="taxfree">
<div style="width: 1195px;margin: 0 auto;">

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="保单号">
            <el-input size="small" v-model="formInline.policynumber" placeholder="保单号"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
            <el-input size="small" v-model="formInline.iphone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="投保人姓名">
            <el-input size="small" v-model="formInline.policyname" placeholder="投保人姓名"></el-input>
        </el-form-item>
        <el-form-item label="被保人姓名">
            <el-input size="small" v-model="formInline.insurename" placeholder="被保人姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
            <el-input size="small" v-model="formInline.idnumber" placeholder="投保人身份证号"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 9%;">
            <el-button size="small" type="primary" @click="onSubmit" style="padding: 7px 50px;">查询</el-button>
        </el-form-item>
    </el-form>

    <div style="width: 100%">
        <el-table :data="tableData" border >
            <el-table-column prop="policy" label="保单号" width="200"></el-table-column>
            <el-table-column prop="name" label="投保人" width="100"></el-table-column>
            <el-table-column prop="idnumber" label="身份证号" width="200"></el-table-column>
            <el-table-column prop="insurename" label="被保人"></el-table-column>
            <el-table-column prop="state" label="保单状态" width="100"></el-table-column>
            <el-table-column prop="date" label="有效日期"></el-table-column>
            <el-table-column prop="enddate" label="失效日期"></el-table-column>
            <el-table-column prop="iphone" label="手机号" width="150"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>

</div>
</template>
<script>
    export default{
        name:'taxfree',
        data(){
            return{
                formInline:{
                    policynumber:'' ,
                    iphone:'',
                    policyname:'',
                    insurename:'',
                    idnumber:''
                },
                tableData: [
                    {
                     policy: '86310020170230008001',
                     name: '王小虎',
                     idnumber: '410727199311033228',
                     insurename: '普陀区',
                     state: '有效',
                     date: '2017-12-17',
                     enddate:'2017-12-17',
                     iphone:'13298329131'
                     },
                     {
                     policy: '2016-05-03',
                     name: '王小虎',
                     idnumber: '上海',
                     insurename: '普陀区',
                     state: '上海市普陀区金沙江路 1518 弄',
                     date: '200333',
                     enddate:'11',
                     iphone:'11'
                     }
                ]

            }
        },
        methods:{
            onSubmit(){
                this.formInline.policynumber=="";
                this.formInline.iphone=='';
                this.formInline.policyname=='';
                this.formInline.insurename=='';
                this.formInline.idnumber=='';
                if(this.formInline.policynumber=='' && this.formInline.iphone==''&&this.formInline.policyname==''&&this.formInline.insurename==''&&this.formInline.idnumber==''){
                    this.$alert('请输入查询条件', '', {
                        confirmButtonText: '确定'
                    });
                    return false
                }
                var data = [];
                var _this=this;
                var taxData = {
                    "policyNumber":this.formInline.policynumber,
                    "policyHolderName":this.formInline.policyname,
                    "policyHolderIdNumber":this.formInline.idnumber,
                    "policyInsuredName":this.formInline.insurename,
                    "mobile":this.formInline.iphone
                };
                console.log(taxData);
                $.ajax({
                    type:"POST",
                    url:"rest/v0/policies/query/taxfree",
                    async:true,
                    data:JSON.stringify(taxData),
                    dataType:'json',
                    contentType:'application/json;charset=UTF-8',
                    success:function(res){
                        console.log(res)
                        sessionStorage.setItem("res",JSON.stringify(res))
                        for(var i=0;i<res.length;i++){
                            var obj = {}
                            obj.policy =res[i].policyNumber
                            obj.name = res[i].policyHolderName
                            var idnum=res[i].policyHolderIdNumber;
                            var idnumber=idnum.substring(0,6)+"********"+idnum.substring(14,18)
                            obj.idnumber = idnumber
                            obj.insurename =res[i].policyInsuredName
                            if(res[i].contractStatusCode=="EFFECTIVE"){
                                obj.state ="有效"
                            }else{
                                obj.state ="失效"
                            }
                            obj.date = res[i].effectiveDate.split("T")[0];
                            obj.enddate =res[i].expiredDate.split("T")[0];
                            obj.iphone = res[i].mobile
                            data[i] = obj
                        }
                        _this.tableData = data
                    }
                })
            },
            handleEdit(index,row){
                sessionStorage.setItem("index",index)
                this.$router.push('/taxfreeDetail')
            }
        }
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
    .el-input--small {
        width: 100%;
    }
</style>