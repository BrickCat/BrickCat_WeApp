var calcMD5 = require('../../js/md5.js');
var url = require('../../../utils/baseurl.js');
var Util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    needCaptcha: false,
    captchaURL: '',
    disabled: false
  },
  /**
   * 初始化加载
   * options url 参数
   */
  onLoad: function (options) {
    var that = this;
    if (wx.getStorageSync('cookie')) {
      that.setData({
        disabled: true
      })
   }
  },
  /**
   * 跳转到注册页面
   */
  goRegister: function () {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  /**
   * 刷新验证码 
   */
  refreshCaptcha: function () {
    this.setData({
      captchaURL: url.url+'/login?needCaptcha=' + this.data.needCaptcha + '&t=' + (new Date()).getTime()
    });
  },
  /**
   * 登录
   */
  login: function (e) {
    Util.networkStatus()
    var that = this;
    wx.request({
      url: url.url+'/login',
      data: {
        nameOrEmail: e.detail.value.userName,
        userPassword: calcMD5(e.detail.value.password),
        rememberLogin: true,
        captcha: e.detail.value.captcha
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.errMsg !== 'request:ok') {
          wx.showToast({
            title: res.errMsg,
            icon: 'loading',
            mask: true
          })
          return false;
        }
        if (!res.data.sc) {
          if (res.data.needCaptcha) {
            that.setData({
              needCaptcha: res.data.needCaptcha,
              captchaURL: url.url+'/captcha/login?needCaptcha=' + res.data.needCaptcha + '&t=0.6956869461435669'
            });
          }
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            mask: true
          })
          return false;
        }

        wx.setStorage({
          key: "cookie",
          data: res.data.token
        })
        wx.redirectTo({
          url: '../article/index'
        })
      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'loading',
          mask: true
        })
      }
    })
  },
  logout: function(){
    app.logout();
  }
})
