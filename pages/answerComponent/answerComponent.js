// pages/myanswer/myanswer.js
import util from '../../utils/util.js';
import api from "../../utils/api.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _isShow: false,
    _isLoaded: false,
    _seeAnswer: false,
    questionArr: [],
    isBuy: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 获取我做的题
     */
    getMyAnswer: function () {
      debugger;
      console.log(this.data.item.vrId);
      wx.showLoading({
        title: '加载中...'
      });
      wx.request({
        url: api.getDealById,
        data: {
          id: this.data.item.vrId
        },
        success: (res) => {

          console.log("获得答题信息成功！");
          console.log(res);
          if (res.data.state) {

            // 出题者的答案
            var giverAnswerArr = [];
            res.data.result.givAnswers.split(",").forEach(function (item, index) {
              giverAnswerArr.push(item.split(":")[0]);
            });
            // 我的答案
            var myAnswerArr = [];
            res.data.result.answers.split(",").forEach(function (item, index) {
              myAnswerArr.push(item.split(":")[0]);
            });
            res.data.questions.forEach(function (item, index) {

              if (giverAnswerArr[index] != myAnswerArr[index]) {
                item.state = false;
              } else {
                item.state = true;
              }

              item.ansArr = item.answers.split("-");
              item.ansStr = item.ansArr[myAnswerArr[index]];
              item.trueAnsStr = item.ansArr[giverAnswerArr[index]];
            });
          }
          this.setData({
            isBuy: res.data.result.isBuy,
            _isLoaded: true,
            questionArr: res.data.questions
          });
          console.log("数据处理完毕！");
          console.log(this.data.questionArr);

        },
        complete: () => {
          wx.hideLoading();
        }
      })
    },
    /**
     * 显示
     */
    show: function () {
      debugger;
      if (!this.data._isLoaded) {
        this.getMyAnswer();
      }
      this.setData({
        _isShow: true
      });
    },
    /**
     * 隐藏
     */
    hide: function () {
      this.setData({
        _isShow: false
      });
    },
    /**
     * 偷看答案
     */
    seeAnswer: function () {
      if (this.data.isBuy == 0) {
        util.pay(100, () => {
          console.log("修改记录..............");
          wx.request({
            url: api.updateDeal,
            data: {
              vrId: this.data.item.vrId,
              isBuy: 1
            }
          })
        });
      }
      this.setData({
        _seeAnswer: !this.data._seeAnswer
      });
    }
  }

})
