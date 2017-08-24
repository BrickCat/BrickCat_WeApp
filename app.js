//app.js
var toast = require('utils/toast.js');
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
  logout:function (i) {
    if (wx.getStorageSync('cookie')){
      wx.showModal({
        title: '提示',
        content: '是否退出？',
        success: function (res) {
          if (res.confirm) {
            wx.removeStorage({
              key: 'cookie',
              success: function (res) {
                toast.showToast({
                  context: i,
                  title: '已退出',
                  duration: 1500
                })
              }
            })
          }
        }
      })
    }else{
      toast.showToast({
        context: i,
        title: '您还没有登录...',
        duration: 1500
      })
    }
  },
  globalData: {
    userInfo: null,
    userId:null
  }
})
