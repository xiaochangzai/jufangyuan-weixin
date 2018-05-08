// pages/question/question.js
import api from '../../utils/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionsList:[],
    currentIndex:0,
    currentQuestion:{
      title:"",
      answers:"",
      answerList:[]

    },
    answerList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQuestionsAll();
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
   * 获取题目列表
   */
   getQuestionsAll () {
    var that = this;
      wx.showLoading({
        title:"加载中..."
      });
      wx.request({
        url: api.getQuestionsAll,
        data:{},
        method:"POST",
        success:function (res) {
          console.log(" 请求成功！ -------");
          console.log(res);
          if (res.data.state){
            res.data.result.forEach(function (item) {
              var tempArr = [];
              item.answers.split("-").forEach(function(item1){
                tempArr.push({
                  name: item1,
                  checked: false
                });
              });
              item.answerArr = tempArr;
            });
            that.setData({
              questionsList: res.data.result,
              currentQuestion:res.data.result[0]
            });
          } 
        },
        fail:function (res) {
          console.log("请求失败！ -------");
          console.log(res);
        },
        complete:function (res) {
          wx.hideLoading();
          console.log("请求已完成");
        }
      })
   },
   onAnswerChange: function (e){
      console.log("选择发生了变化");
      console.log(e);
      this.data.answerList.push({
        vrId: this.data.currentQuestion.vrId,
        answer: e.detail.value
      });
      // ------------------------------
     if (this.data.currentIndex >= 9) {
       // 完成答题，上传答案
       this.uploadAnswer();
       return;
     }
      this.setData({
        answerList: this.data.answerList,
        currentIndex: this.data.currentIndex + 1,
        currentQuestion: this.data.questionsList[this.data.currentIndex + 1]
      });

      

    },
    anothor: function (){
      var len = this.data.questionsList.length;
      var anothorIndex = parseInt(Math.random()*(len - 10) + 10);
      this.setData({
        currentQuestion: this.data.questionsList[anothorIndex]
      });
    },
    uploadAnswer: function (){
      var that = this;
      console.log('上传答案');
      // 构建答案
      var answerStr = "";
      this.data.answerList.forEach(function(item){
        answerStr += (item.vrId + ":" + item.answer + ',');
      });
      answerStr = answerStr.slice(0,-1);
      wx.request({
        url: api.addQuegiver,
        data:{
          answers: answerStr,
          giverId: "12345689"
        },
        success:function(res){
          console.log("提交答案结束");
          console.log(res);
        }
      })
    }
})