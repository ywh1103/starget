<template id="detail">
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/header' }">保单首页</el-breadcrumb-item>
            <el-breadcrumb-item>首页_详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
        <div class="indexDetail">保单详情</div>

        <div class="wrap">
            <div class="title">e生无忧医疗险</div>
            <div class="totleDetail">
                <ul>
                    <li>保单号：<span>{{proposalNumber}}</span></li>
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
                    <li>投保人常住地：<span>{{place}}</span></li>
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
                    <li>与投保人关系：<span>{{relation}}</span></li>
                    <li>证件类型：<span>身份证</span></li>
                    <li>证件号码：<span>{{insureidNumber}}</span></li>
                    <li>性别：<span>{{insureSex}}</span></li>
                    <li>出生日期：<span>{{birthday}}</span></li>
                </ul>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'detail',
        data(){
          return{
              proposalNumber:'',
              coverage:'',
              effectiveDate:'',
              expiredDate:'',
              money:'',
              policyHolderName:'',
              place:'',
              holderidNumber:'',
              holderSex:'',
              holderMobile:'',
              policyinsureName:'',
              relation:'',
              insureidNumber:'',
              insureSex:'',
              birthday:''
          }
        },
        mounted(){
            /*var i=this.$route.params.id
            console.log(i)*/
            console.log(JSON.parse(sessionStorage.getItem("res")));
            var i=sessionStorage.getItem("index")
            var policyNumber=JSON.parse(sessionStorage.getItem("res"))[i].policyNumber;
            var policiesUrl="rest/v0/policies/"+policyNumber;
            var _this=this;
            $.ajax({
                type:"GET",
                url:policiesUrl,
                async:true,
                data:"",
                dataType:'json',
                contentType:'application/json;charset=UTF-8',
                success:function(res){
                    console.log(res)
                    _this.proposalNumber=res.policyNumber;
                    _this.coverage=res.aopamount/10000;
                    _this.effectiveDate=res.effectiveDate.split("T")[0]+" 00:00:00";
                    _this.expiredDate=res.expiredDate.split("T")[0]+" 23:59:59";
                    for(var i=0;i<res.subComponents.length;i++){
                        if(res.subComponents[i].domainName=="insurance.pa.model.Fee"){
                            if(res.subComponents[i].code="APP"){
                                _this.money=res.subComponents[i].value+".00元";
                            }
                        }
                    }
                    _this.policyHolderName=res.policyHolder.name;
                    _this.place=res.policyHolder.dynamicFields.RESIDENT_AREA;
                    var idNumber = res.policyHolder.idNumber;
                    _this.holderidNumber=idNumber;
                    var sexName=idNumber[idNumber.length-2];
                    if(sexName %2 !=0){
                        _this.holderSex="男"
                    }else{
                        _this.holderSex="女"
                    }
                    _this.holderMobile=res.policyHolder.mobile;
                    _this.policyinsureName=res.insureds[0].name;
                    if(res.insureds[0].relationWithPH == "SELF"){
                        _this.relation="本人"
                    }else if(res.insureds[0].relationWithPH == "PARENTS"){
                        _this.relation="父母"
                    }else if(res.insureds[0].relationWithPH == "CHILD"){
                        _this.relation="子女"
                    }else if(res.insureds[0].relationWithPH == "SPOUSE"){
                        _this.relation="配偶"
                    }
                    var insureidNumber=res.insureds[0].idNumber
                    _this.insureidNumber=insureidNumber;
                    var sexName1=insureidNumber[insureidNumber.length-2];
                    if(sexName1 %2 !=0){
                        _this.insureSex="男"
                    }else{
                        _this.insureSex="女"
                    }
                    var birth = insureidNumber.substring(6, 10) + "-" + insureidNumber.substring(10, 12) + "-" + insureidNumber.substring(12, 14);
                    _this.birthday=birth
                },
                error:function(res){
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
</style>