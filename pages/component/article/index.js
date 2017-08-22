var url = require('../../../utils/baseurl.js');
var app = getApp()

Page({
    data: {
      rec: {
        idx: 0, loading: false,
      },
      message:url.url,
      tabidx: 0
    },

    onLoad: function () {

    },

    onShow: function() {
      // if (!wx.getStorageSync('user')) {
      //   wx.redirectTo({
      //     //url: '../login/index'
      //   });
      //   return;
      // }
      this.init();
    },
    init:function(){
      console.info("init");
    }
})

