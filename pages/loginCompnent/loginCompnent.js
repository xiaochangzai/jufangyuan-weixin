// pages/loginCompnent/loginCompnent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    _isShow: false,
    userInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 拒绝授权
   */
    cancle: function(){
      // this.setData({
      //   _isShow: false
      // });

      wx.showModal({
        title: '系统提示',
        content: '请授权登陆，您才能继续使用！',
      })
    },
    hide: function(){
      this.setData({
        _isShow: false
      });
    },
    /**
     * 显示
     */
    show: function(){
      console.log("显示...");
      this.setData({
        _isShow: true
      });
      
    },
    /**
     * 点击允许
     */
    getUserInfo: function(userInfo){
     
      this.setData({
        userInfo: userInfo
      });
      this.hide();
      this.triggerEvent("agree",userInfo,{});
    }
  },
})
