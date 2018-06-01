// pages/poster/poster.js
import api from "../../utils/api.js";
import util from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 68,
    codePath:"../../img/icon-code.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    util.login();
    this.getWxCode();
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
  onShareAppMessage: function (res) {
    return {
      title: "请接受组织对你的考验",
      path: "/pages/friendAnswer/friendAnswer?id=" + this.data.id
    };
  },
  /**
   * 获取二维码
   */
  getWxCode: function(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: api.getWxCode,
      data:{
        id: this.data.id
      },
      success: (res)=>{
        if(res.data.path){
          this.setData({
            codePath: "https://qaq.jfy108.net/resources/" + res.data.path
          });

          // 绘制海报
          this.draw();
        }
        console.log("成功获取二维码!");
        console.log(res);
      },
      complete: ()=>{
        // wx.hideLoading();
      }
    })
  },
  /**
  * 画图
  */
  draw: function () {
    this.downLoadImg(this.data.codePath,(headUrl)=>{
      console.log(headUrl);
      const ctx = wx.createCanvasContext("canvas");
      // 填充颜色
      ctx.setFillStyle("white");
      ctx.fillRect(0, 0, 375, 375);

      ctx.drawImage(headUrl, 106, 144, 164, 164);
      ctx.drawImage("../../img/icon-porter.png", 43, 20, 291, 86);

      ctx.drawImage("../../img/finger-tit.png", 128, 337, 117, 16.5);
      ctx.draw();
      wx.hideLoading();
    });

  },
 
  downLoadImg: function (netUrl,fn) {
   
    wx.downloadFile({
      url: netUrl,
      success: (res)=>{
        console.log(" 下载图片成功！");
        console.log(res);
        if(fn){
          fn(res.tempFilePath);
        }
      },
      error: (res)=>{
        console.log("下载图片失败！");
        console.log(res);
       
      }
    },fn)
  },
  /**
   * 保存canvas图片
   */
  saveCanvas: function () {

    console.log("准备保存图片");
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: (res) => {
        console.log("获取临时路径成功！");
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            wx.showToast({
              title: '保存成功',
              icon: "success"
            })
          }
        })
      }
    }, this);
  }
})