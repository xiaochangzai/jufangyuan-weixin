import util from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{
      dealTime:"2018-05-08 10:26:35",
      score:50
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.draw();
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
  pay: function(){
    // util.pay(10);
  },
  /**
   * 画图
   */
  draw: function(){
    this.downLoadImg("https://qaq.jfy108.net/resources/867186032552993code_23.png","tempFilePath");
    var headUrl = wx.getStorageSync("tempFilePath"); //下面用canvas绘制头像 
    console.log(headUrl);
    const ctx = wx.createCanvasContext("canvas");
    // 填充颜色
    ctx.setFillStyle("white");
    ctx.fillRect(0,0,375,375);

    ctx.drawImage(headUrl, 106, 144, 164, 164);
    ctx.drawImage("../../img/icon-porter.png", 43, 20, 291, 86);
    
    ctx.drawImage("../../img/finger-tit.png", 128, 337, 117, 16.5);
    ctx.draw();
   
    // this.saveCanvas();
    
  },
  /**
   * loadImage
   */
  loadImage: function(res){
    console.log("图片加载完成");
    console.log(res);
   
  },
  downLoadImg: function (netUrl, storageKeyUrl){
    wx.getImageInfo({
      src: netUrl,    //请求的网络图片路径
      success: function (res) {
        //请求成功后将会生成一个本地路径即res.path,然后将该路径缓存到storageKeyUrl关键字中
        wx.setStorage({
          key: storageKeyUrl,
          data: res.path,
        });

      }
    })
  },
  /**
   * 保存canvas图片
   */
  saveCanvas: function(){
    // debugger;
    console.log("准备保存图片");
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: (res)=>{
        console.log("获取临时路径成功！");
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res)=>{
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