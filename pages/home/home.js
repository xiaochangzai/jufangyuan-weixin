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
    if (!app.globalData.userInfo){
      this.getUserInfo();
    }
    
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
  /**
   * 获取用户信息
   */
  getUserInfo: function (){
    wx.getUserInfo({
      success: res => {
        console.log("成功获取用户信息！");
        console.log(res);
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: {
            nickName: res.userInfo.nickName,
            headImg: res.userInfo.avatarUrl,
            openId:"1234567890"
          },
          hasUserInfo: true
        })

        this.uploadUserInfo();
      }
    });

  },
  start: function(){
    
    wx.navigateTo({
      url: '../question/question',
    })
  },
  /**
   * 上传用户信息
   */
  uploadUserInfo: function(){
    wx.request({
      url: api.addUser,
      data:{
        nickName: this.data.userInfo.nickName,
        headImg: this.data.userInfo.headImg,
        userId: this.data.userInfo.openId
      },
      success: function(res){
        console.log("上传用户信息成功！");
        console.log(res);
      }
    })
  }
})