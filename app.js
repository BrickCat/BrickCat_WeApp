//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  /**
     * 登出
     */
  logout:function () {
    var that = this;
    wx.removeStorage({
      key: 'cookie',
      success: function (res) {
        that.globalData.isLogin=false;
      }
    })
  },
  globalData: {
    userInfo: null,
    isLogin:false
  }
})
