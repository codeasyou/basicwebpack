//引入工具函数
import { TimeDown,IsEmpty,CACHE_UTIL,CheckPhone,HTML_UTLS} from "../../../common/CHECKTOOLS.js"
import { BASICAPI,combinedAccount } from "../../../common/API.js"
//获取订单编号
const subscribeId = HTML_UTLS.getParam("subscribeId");

//统一收费提示内容
let COSTHtml = `
<ul id="openItems">
    <li><b>1.</b>选择<b>"与手机号码统一收费"</b>选项后，已选号码将于"收费号码绑定"，每月产生的费用，将合并到收费号码账户一并收取。</li>
    <li><b>2.</b>若收费号码属于集团账户，eSIM号码将遵循中国联通集团客户业务办理规则实施管理。</li>
    <li><b>3.</b>非联通号码（例如收费号码是移动、或电信的号码）不支持统一收费。</li>
    <li><b>4.</b>不支持跨地市合账, 合账号码与办理号码须同一归属地。</li>
    <li><b>5.</b>合账号码必须为本人名下号码。</li>
</ul>`;

$("#opentips").click(function(){
    $.dialog({
        titleText : '开通统一收费功能须知',
        contentHtml : COSTHtml
    });
});

//控制表单显示与隐藏
$("#switchModel").click(()=>{
    //选中true 未选 false
    let checkstatus = $("#switchModel").is(':checked');
    if(checkstatus){//true
        $("#paypanel").fadeIn(500);
        //改变办理按钮
        $("#uniteBtn").text("确认").css({"backgroundColor":"#ff9c12","color":"#fff"});
    }else {
        $("#paypanel").fadeOut(500);
        //关闭后，清空收费号码框、验证码框、accId
        $("#payNumber").val("");
        $("#identifycode").val("");
        CACHE_UTIL.removeLocalItem("accId");
        //改变办理按钮
        $("#uniteBtn").text("跳过").css({"backgroundColor":"#fff","color":"#333"});
        //关闭验证码按钮
        $("#identifyButton").attr({'disabled':'disabled'}).css({"background":"#a1a1a1"});
    }
});

//收费号码失焦事件
$("#payNumber").blur(()=>{
    //获取统一收费号码
    let payNumber = $("#payNumber").val();
    if(IsEmpty(payNumber)||payNumber.length<11){//为空
        $("#identifyButton").attr({'disabled':'disabled'}).css({"background":"#a1a1a1"});
        return;
    }else{
        $("#identifyButton").removeAttr('disabled').css({"background":"#ff9c12"});
    }
});

//获取验证码
$("#identifyButton").click(()=>{
    //判断收费号码和验证码是否为空
    let payNumber = $("#payNumber").val();
    let params = {
        serialNumber:payNumber
    };
    //判断请求参数不为空
    if(IsEmpty(payNumber)){
        $.dialog({type : 'tips',infoText : '请输入统一收费号码！',autoClose:1000});
        return;
    }else if(!CheckPhone(payNumber)){
        $.dialog({type : 'tips',infoText : '请输入正确的手机号码',autoClose:1000});
        return;
    }

    let succ = function(data){
        if(data.respCode == "0000"){
            $.dialog({type : 'tips',infoText : '验证码已发送至您的手机，请注意查收',autoClose:1000});
            TimeDown("identifyButton",60000);
        }else {
            $.dialog({type : 'tips',infoText : data.content,autoClose:1000});
            return;
        }
    };

    let error = function(){
        $.dialog({
            type : 'info',
            infoText : '请求出错，请稍后重试！',
            infoIcon : './../../../common/Dialog/images/icon/loading.gif',
            autoClose : 2500
         });
    };
    $.ajax({
        url:BASICAPI.sendSMSCode,
        type:"get",
        success:succ,
        error:error,
        data:params,
        dataType:"json",
        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
    });
});

//跳过 && 确定
$("#uniteBtn").on("click",()=>{
    //判断有没有开启
    let checkstatus = $("#switchModel").is(':checked');
    if(checkstatus){//true
        //判断收费号码和验证码是否为空
        let payNumber = $("#payNumber").val();
        let smsCode = $("#identifycode").val();
        if(IsEmpty(payNumber)){//为空
            // alert("请输入统一收费号码");
            $.dialog({type : 'tips',infoText : '请输入统一收费号码',autoClose:1000});
            return;
        }else if(!CheckPhone(payNumber)){
            $.dialog({type : 'tips',infoText : '请输入正确的手机号码',autoClose:1000});
            return;
        }else if(IsEmpty(smsCode)){
            $.dialog({type : 'tips',infoText : '请输入验证码',autoClose:1000});
            return;
        }
        let params = {serialNumber:payNumber,verifyCode:smsCode,subscribeId:subscribeId};
        //成功：提示成功开通合账功能，跳转下一个卡数据下载页面，失败：提示合账功能开通失败
        let succ = function(data){
            debugger
            if(data.respCode == "0000"){
                $.dialog({type : 'tips',infoText : '恭喜您，统一收费功能已开通，即将跳转至后续办理页面',autoClose:2500});
                //到卡资源下载提示页 
                location.href = "../../../../mobile/html/esim/RepairChangeCardDetails.html?subscribeId=" + subscribeId;
            }else {
                $.dialog({type : 'tips',infoText : data.content,autoClose:1000});
                return;
            }
        };
    
        let error = function(){
            $.dialog({
                type : 'info',
                infoText : '请求出错，请稍后重试！',
                infoIcon : './../../../common/Dialog/images/icon/loading.gif',
                autoClose : 2500
             });
        };
    
        $.ajax({
            url:combinedAccount.share,
            type:"post",
            success:succ,
            error:error,
            data:params,
            dataType:"json",
            contentType:"application/x-www-form-urlencoded; charset=UTF-8",
            // contentType:"application/json;charset=utf-8",
        });
    }else {
        //跳过 直接到卡资源下载提示页
        location.href = "../../../../mobile/html/esim/RepairChangeCardDetails.html?subscribeId=" + subscribeId;
    }

});

