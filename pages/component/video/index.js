var url = require('../../../utils/baseurl.js');
var Util = require('../../../utils/util.js');
var app = getApp()

Page({
    data: {
      video:{
        autoplay:false
      }
    },

    onLoad: function () {
      var that = this;
      var video = this.data.video;
       wx.getNetworkType({
         success: function (res) {
           // 返回网络类型, 有效值：
           // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
           var networkType = res.networkType
           if ('wifi' == networkType){
             video.autoplay = true;
             that.setData({
               video: video
             });
           }
         }
       })
    },

    onShow: function() {
    },
})
