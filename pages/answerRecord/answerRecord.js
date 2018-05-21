// pages/answerRecord/answerRecord.js
import api from "../../utils/api.js"
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:"123",
    recordsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: app.data.userId
    });
    this.getQuestions();
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
  getQuestions: function(){
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: api.getDealByUser,
      data:{
        userId: this.data.userId
      },
      success: (res)=>{
        console.log("获得我做过的题目成功！");
        console.log(res);
        res.data.result.forEach(function(item){
          item.dealTime = item.dealTime.slice(0,-2);
        }); 
        if(res.data.state){
          this.setData({
            recordsList: res.data.result
          });
        }
      },
      complete: ()=>{
        wx.hideLoading()
      }
    })
  }
})