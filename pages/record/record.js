// pages/record/record.js
import api from '../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:"12345689",
    recordsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecords();
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
   * 出题记录
   */
  getRecords: function(){
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: api.getGiverListByUser,
      data: {
        userId: this.data.userId
      },
      success: (res)=>{
        console.log("获取出题记录成功!");
        console.log(res);
        if(res.data.flag){
          this.setData({
            recordsList: res.data.result
          });
        }
      },
      complete: ()=>{
        wx.hideLoading();
      }

    })
  }
})