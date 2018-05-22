import api from 'api.js';
var app = getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//生成从date+minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  var today = new Date();
  var day = today.getDate(); //获取当前日(1-31)      
  var month = today.getMonth() + 1; //显示月份比实际月份小1,所以要加1  
  var year = today.getYear();  //获取完整的年份(4位,1970-????)  getFullYear()
  var years = today.getFullYear();
  years = years < 99 ? "20" + years : years;
  month = month < 10 ? "0" + month : month;  //数字<10，实际显示为，如5，要改成05  
  day = day < 10 ? "0" + day : day;
  var hh = today.getHours();
  hh = hh < 10 ? "0" + hh : hh;
  var ii = today.getMinutes();
  ii = ii < 10 ? "0" + ii : ii;
  var ss = today.getSeconds();
  ss = ss < 10 ? "0" + ss : ss;
  var dada = years + month + day + hh + ii + ss;//时间不能直接相加，要这样相加！！！14位

  switch (arguments.length) {
    case 1:
      return dada + parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return dada + parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}
const getOrderId = ()=>{
  return randomNum(1000, 99999999999);
}

const pay = (obj) =>{
  debugger;
  wx.request({
    url: api.xiadan,
    data: {
      'openId': app.globalData.openId,
      'title': "最佳死党大比拼偷看答案",
      'price': obj.price
    },
    success: (res)=>{

      var prepay_id = res.data.prepay_id;
      obj.outTradeNo = res.data.outTradeNo;
      sign(prepay_id,obj);
    }
  })
}


function sign (prepay_id,obj) {

  wx.request({
    url: api.sign,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: { 'repay_id': prepay_id },
    success: function (res) {
      requestPayment(res.data,obj);
    }
  })
}
//申请支付
function requestPayment (obj,afterObj) {

  wx.requestPayment({
    'timeStamp': obj.timeStamp,
    'nonceStr': obj.nonceStr,
    'package': obj.package,
    'signType': obj.signType,
    'paySign': obj.paySign,
    'success': function (res) {
      debugger;
        afterObj.success({
          message: "ok",
          state: 1,
          outTradeNo: afterObj.outTradeNo
        });
    },
    'fail': function (res) {
      debugger;
      if(afterObj.fail){
        afterObj.fail({
          message: "fail",
          state: -1
        });
      }
    }
  })
}
module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  pay: pay,
  getOrderId: getOrderId
}
