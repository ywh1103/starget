<template id="taxfreeDetail">
<div>

    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/taxfree' }">税优查询</el-breadcrumb-item>
        <el-breadcrumb-item>税优_详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
        <div class="indexDetail">保单详情</div>

        <div class="wrap">
            <div class="title">e生无忧医疗险</div>
            <div class="totleDetail">
                <ul>
                    <li>保单号：<span>{{policyNumber}}</span></li>
                    <li>保额：<span>{{coverage}}万元</span></li>
                    <li>生效日期：<span>{{effectiveDate}}</span></li>
                    <li>保单止期：<span>{{expiredDate}}</span></li>
                    <li>保费总额：<span>{{money}}</span></li>
                </ul>
            </div>
        </div>

        <div class="wrap">
            <div class="title">投保人</div>
            <div class="totleDetail">
                <ul>
                    <li>姓名：<span>{{policyHolderName}}</span></li>
                    <!--<li>投保人常住地：<span>{{place}}</span></li>-->
                    <li>证件类型：<span>身份证</span></li>
                    <li>证件号码：<span>{{holderidNumber}}</span></li>
                    <li>性别：<span>{{holderSex}}</span></li>
                    <li>手机号：<span>{{holderMobile}}</span></li>
                </ul>
            </div>
        </div>

        <div class="wrap">
            <div class="title">被保人</div>
            <div class="totleDetail">
                <ul>
                    <li>姓名：<span>{{policyinsureName}}</span></li>
                    <!--<li>与投保人关系：<span>{{relation}}</span></li>-->
                    <li>证件类型：<span>身份证</span></li>
                    <li>证件号码：<span>{{insureidNumber}}</span></li>
                    <li>性别：<span>{{insureSex}}</span></li>
                    <li>出生日期：<span>{{birthday}}</span></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="issue">
        <div class="indexDetail">生成保单</div>
        <div>
            <label>保单号：</label>
            <el-input style="width: 18%;" v-model="issue" placeholder="请输入内容"></el-input>
            <el-button type="primary" @click="produce">生成保单</el-button>
        </div>
    </div>

</div>
</template>
<script>
    export default{
        name:'taxfreeDetail',
        data(){
            return{
                policyNumber:'',
                coverage:'',
                effectiveDate:'',
                expiredDate:'',
                money:'',
                policyHolderName:'',
//                place:'',
                holderidNumber:'',
                holderSex:'',
                holderMobile:'',
                policyinsureName:'',
//                relation:'',
                insureidNumber:'',
                insureSex:'',
                birthday:'',
                issue:'',
            }
        },
        mounted(){
            console.log(res);
            var res=JSON.parse(sessionStorage.getItem("res"));
            var i=sessionStorage.getItem("index");
            this.policyNumber=res[i].policyNumber;
            console.log(res[i].limitAmount);
            this.coverage=(res[i].limitAmount)/10000;
            this.effectiveDate=res[i].effectiveDate.split("T")[0]+" 00:00:00";
            this.expiredDate=res[i].expiredDate.split("T")[0]+" 00:00:00";
            this.money=res[i].app+".00元";
            this.policyHolderName=res[i].policyHolderName;
//            this.place=

            var holderidNumber = res[i].policyHolderIdNumber;
            this.holderidNumber=holderidNumber;
            var sexName=holderidNumber[holderidNumber.length-2];
            if(sexName %2 !=0){
                this.holderSex="男"
            }else{
                this.holderSex="女"
            }
            this.holderMobile=res[i].mobile;
            this.policyinsureName=res[i].policyInsuredName;
//            this.relation

            var insureidNumber=res[i].policyInsuredIdNumber
            this.insureidNumber=insureidNumber;
            var sexName1=insureidNumber[insureidNumber.length-2];
            if(sexName1 %2 !=0){
                this.insureSex="男"
            }else{
                this.insureSex="女"
            }
            var birth = insureidNumber.substring(6, 10) + "-" + insureidNumber.substring(10, 12) + "-" + insureidNumber.substring(12, 14);
            this.birthday=birth;
        },
        methods:{
            produce(){
                this.issue="";
                var _this=this;
                var res=JSON.parse(sessionStorage.getItem("res"));
                var i=sessionStorage.getItem("index");
                var proposalNumber=res[i].proposalNumber;
                var issueUrl="rest/v0/policies/issue/taxfree/"+proposalNumber+this.issue;
                console.log(issueUrl)
                var issueData={
                    "proposalNumber":proposalNumber,
                    "policyNumber":this.issue
                }
                $.ajax({
                    type:"POST",
                    url:issueUrl,
                    async:true,
                    data:JSON.stringify(issueData),
                    dataType:'json',
                    contentType:'application/json;charset=UTF-8',
                    success:function(res){
                        console.log(res);
                        _this.$alert("生产保单成功！", '', {
                            confirmButtonText: '确定'
                        })
                    },
                    error:function(res){
                        console.log(res)
                        if(JSON.parse(res.responseText).ErrorCode =="31001"){
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
</script>
<style>
    .content{
        width: 90%;
        margin: 50px auto;
        box-shadow: 1px 1px 10px #ccc;
        height: 398px;
        overflow: hidden;
    }
    .indexDetail{
        width: 100%;
        /*border-bottom: 1px solid #ccc;*/
        height: 48px;
        font-size: 18px;
        line-height: 48px;
        text-indent: 10px;
    }
    .wrap{
        float: left;
        width: 30%;
        margin-top: 2%;
        margin-left: 2.4%;
        height: 60%;
        border:1px solid #ccc
    }
    .title{
        /*float: left;*/
        width: 100%;
        font-size: 14px;
        text-indent: 10px;
        height: 30px;
        background-color: #ededed;
        border-bottom: 1px solid #ccc;
        line-height: 30px;
        text-align: center;
    }
    .totleDetail{
        float: left;
        /*border-bottom: 1px solid #ccc;*/
        padding-bottom: 20px;
        width: 80%;
        margin: 20px;
    }
    .content ul li{
        width: 255px;
        margin-right: 7px;
        float: left;
        line-height: 28px;
        height: 28px;
        color: #676666;
    }
    .content ul li span{
        color: #000;
    }
    .el-breadcrumb {
        font-size: 13px;
        line-height: 1;
        margin-top: 10px;
        margin-left: 5%;
    }
    .issue{
        width: 90%;
        margin: 50px auto;
        box-shadow: 1px 1px 10px #ccc;
        height: 150px;
        overflow: hidden;
    }

</style>