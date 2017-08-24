var app = getApp()

Page({
  data: {
    user:wx.getStorageSync('user')
  },

  onLoad: function () {

  },

  onShow: function () {
  },
  logout: function () {
    app.logout(this);
  }
})