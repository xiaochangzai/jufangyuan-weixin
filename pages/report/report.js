// pages/report/report.js
import api from "../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curWater:0,
    giveId:1,
    coresList:[],
    giverNickName:"",
    giverHeadImg:"",
    myscore:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      giveId: options.id
    });
    setTimeout(function(){

    },2000);
    this.setData({
      curWater: 31.8*0.7
    });

    this.getCoresByGivId();

    this.getQueGiverInfo();
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
   * 根据此出题记录获取所有答题记录
   */
  getCoresByGivId:function(){
    var that = this;
    wx.showLoading({
      title: '正在加载...'
    });
    wx.request({
      url: api.getQuedealByGivId,
      data: {
        giveId:this.data.giveId
      },
      success: function(res){
        console.log("数据加载完成！");
        console.log(res);
        if(res.data.flag){
          // 处理提示
          res.data.result.forEach(function(item){
            item.title = that.getStrByScore(item.score);
          });
          that.setData({
            coresList: res.data.result
          });
        }
      },
      complete: function(){
        wx.hideLoading();
      }
    })
  },
  /**
   * =====================================
   */
  getStrByScore: function(score){
    if(score <= 40) return "走点心，我们还能抢救下！";
    else if(score <= 60) return "让我们吧革命友谊再升华下！";
    else return "默契度再高一点点，我就跟你走！";
  },
  /**
   * 获取出题人信息
   */
  getQueGiverInfo(){
    var that = this;
    wx.request({
      url: api.getGiverInfo,
      data:{
        userId:"123",
        giveId:this.data.giveId
      },
      success: function(res){
       console.log("获取出题人信息成功！");
       console.log(res);
       if(res.data.flag){
        that.setData({
          giverNickName: res.data.result.nickName,
          giverHeadImg: res.data.result.headImg,
          myscore: res.data.result.myscore,
          curWater: 0.318*res.data.result.myscore
        });
       }
      },
      complete: function(){

      }
    })
  }
})