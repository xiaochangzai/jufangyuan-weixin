// pages/home/home.js
import api from "../../utils/api.js";
import util from "../../utils/util.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName:"",
      headImg:""
    },
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    if (app.globalData.userInfo == null){
      // this.getUserInfo();
      this.login();
    }
    // debugger;
    var loginCompnent = this.selectComponent("#authorieze");
    // console.log(loginCompnent);
    loginCompnent.show((userInfo)=>{
      console.log("--------------");
      console.log(userInfo);
    });
    console.log("---------------");
    console.log(loginCompnent.userInfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  start: function(){
    // 上传用户信息
    this.uploadUserInfo();
    wx.navigateTo({
      url: '../question/question',
    })
  },
  /**
   * 上传用户信息
   */
  uploadUserInfo: function(){
    debugger;
    wx.request({
      url: api.addUser,
      data:{
        nickName: this.data.userInfo.nickName,
        headImg: this.data.userInfo.avatarUrl,
        userId: app.globalData.openId
      },
      success: function(res){
        debugger;
        console.log("上传用户信息成功！");
        console.log(res);
      }
    })
  },
  /**
   * 登陆
   */
  login(){
    // 登陆
    console.log("---------------登陆------------");
    wx.login({
      success: (res)=>{
        console.log(res);
        app.globalData.code = res.code;
        this.getOpenId();
      }
    })
  },
 /**
  * 获取open Id 
  */
  getOpenId(){
    console.log("-------------- 获取openId-----------");
    wx.request({
      url: api.getUserOpenId,
      data:{
        code: app.globalData.code
      },
      success: (res)=>{
        console.log("获取用户openId成功！");
        console.log(res);
        var tempObj = JSON.parse(res.data.result);
        app.globalData.openId = tempObj.openid;

        // this.uploadUserInfo();
      }
    })
  },
  /**
   * 同意
   */
  agree: function(res){
    var userInfo = res.detail.detail.userInfo;
    console.log("========== 获取用户信息 =========");
    console.log(userInfo);
    this.setData({
      userInfo: userInfo
    });
  }
 
})