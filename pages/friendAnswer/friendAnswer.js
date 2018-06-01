// pages/friendAnswer/friendAnswer.js
import api from '../../utils/api.js';
import util from '../../utils/util.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queGiverVrId: 12,
    questions: [],
    answers:"",
    answersArr:[],
    currentIndex:0,
    currentQuestion:{},
    friendAnswer:[],
    scrollTop: 10000,
    score: 0,
    friendAnswerStr:"",
    tempHide: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.login(()=>{
      console.log("进入好友回答");
      console.log(options.id);
      if (options.id) {
        this.setData({
          queGiverVrId: options.id
        });
      }
      var scene = decodeURIComponent(options.scene);
      if (scene != "undefined" && scene) {
        this.setData({
          queGiverVrId: scene
        });
      }
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
  getQuestions: function (){
    var that = this;
    // 显示加载中...
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: api.getQuestionsByGiverId,
      data:{
        giverId: that.data.queGiverVrId
        // giverId: 40
      },
      success: function(res){
        console.log("请求数据完成！");
        console.log(res);
        res.data.questions.forEach(function(item){
          item.answerArr = item.answers.split("-");
        });
        // 加载第一个问题
        that.data.friendAnswer.push({
          vrId: res.data.questions[0].vrId,
          title: res.data.questions[0].title,
          index: 0,
          type: "question"
        });

        that.setData({
          questions: res.data.questions,
          answers: res.data.answers,
          currentQuestion: res.data.questions[0],
          friendAnswer: that.data.friendAnswer
        });

        /** 
         * 处理出题人的答案记录
         */
        var tempAnswers = [];
        that.data.answers.split(",").forEach(function(item){
          var tempArr = item.split(":");
          tempAnswers.push({
            vrId: tempArr[0],
            answer: tempArr[1]
          });
        });

        that.setData({
          answersArr: tempAnswers
        });
       
      },
      error: function(res){

      },
      complete: function(res){
        wx.hideLoading();
      }
    })
  },
  /**
   * 选择答案
   */
  slectAnswer: function(e){
    // debugger;
    var that = this;
    this.setData({
      tempHide: true
    });

    setTimeout(()=>{
      this.setData({
        currentIndex: this.data.currentIndex + 1,
        currentQuestion: this.data.questions[this.data.currentIndex + 1]
      });
      this.setData({
        tempHide: false
      });
    },700);
    var index = e.target.dataset.index;
    var title = this.data.currentQuestion.answerArr[index];
    this.data.friendAnswer.push({
      title: title,
      index: index,
      type: "answer"
    });
    // 记录答案
    this.data.friendAnswerStr += (this.data.answersArr[this.data.currentIndex].vrId + ":" + index + ",");
    // 判断是否默契，默契加分
    if (index == this.data.answersArr[this.data.currentIndex].answer){
      this.setData({
        score: this.data.score + 10
      });
    }
    console.log("当前得分：" + this.data.score);
    this.setData({
      friendAnswer: this.data.friendAnswer
    });

    if(this.data.currentIndex == 9){
      this.uploadScore();
      return;
    }
    this.data.friendAnswer.push({
      vrId: this.data.questions[this.data.currentIndex + 1].vrId,
      title: this.data.questions[this.data.currentIndex + 1].title,
      index: this.data.currentIndex + 1,
      type: "question"
    });
    setTimeout(()=>{
      this.setData({
        friendAnswer: this.data.friendAnswer
      });

      // 滚动到最底部
      wx.createSelectorQuery().select('.messages-box').boundingClientRect(function (rect) {
        // 使页面滚动到底部
        console.log(rect);
        that.setData({
          scrollTop: 10000
        });
      }).exec()
    },100);
    

    
  },
  /**
   * 上传分数
   */
  uploadScore: function(){
    var that = this;
    wx.request({
      url: api.addQuedealer,
      data: {
        giveId: that.data.queGiverVrId,
        userId: app.globalData.openId,
        answers: that.data.friendAnswerStr,
        score: that.data.score
      },
      success: function(res){
        console.log("上传分数成功！");
        console.log(res);
        wx.navigateTo({
          url: '../report/report?id=' + that.data.queGiverVrId,
        })
      }
    })
  }
})