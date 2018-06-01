// pages/myquestion/myqiestion.js
import api from "../../utils/api.js";
import util from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    giverId:10,
    questions:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.login(()=>{
      this.getQuestions();
    });
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
   * 获取题目
   */
  getQuestions: function(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: api.getQuestionsByGiverId,
      data:{
        giverId: this.data.giverId
      },
      success: (res)=>{
        console.log("获取题目成功！");
        console.log(res);
        var tempArr = res.data.answers.split(",");
        if(res.data.state){
          res.data.questions.forEach(function(item,index){
           
            item.ansArr = item.answers.split("-");
            item.ansIndex = tempArr[index].split(":")[1] - 0;
          });
        }
        this.setData({
          questions: res.data.questions
        });
      },
      complete: ()=>{
        wx.hideLoading();
      }
    })
  }
})