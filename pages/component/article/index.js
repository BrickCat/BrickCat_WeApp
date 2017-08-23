var url = require('../../../utils/baseurl.js');
var Util = require('../../../utils/util.js');
var app = getApp()

Page({
    data: {
      rec: {
        idx: 0, 
        loading: false,
      },
      articles: [],
      currentPage: 0,
      isFinished: false,
      tabidx: 0
    },

    onLoad: function () {

    },

    onShow: function() {
      this.init(1);
    },
    /**
     * 初始化文章列表
     */
    init:function(p){
      Util.networkStatus();
      let that = this;
      var rec = this.data.rec;
     
      wx.request({
        url: url.url +'/wx/recent',
        method: 'POST',
        data: {
          p: p
        },
        header: {
          'content-type': 'application/json',
          'Cookie': 'b3log-latke=' + wx.getStorageSync('cookie')
        },
        success: function (res) {
          if (res.errMsg == 'request:ok') {
            console.info(res.data.articles)
            rec.idx = 0;
            rec.loading = true;
            that.setData({
              articles: that.data.articles.concat(res.data.articles),
              rec:rec
            })
          }
        },
        fail: function (res) {
          rec.idx = 0;
          rec.loading = false;
          that.setData({
            articles: [],
            rec: rec
          })
        }
      })

      console.info("init");
    },
    switchtab:function(e){
      var that = this;
      var t = e.currentTarget.dataset.t;
      this.setData({ tabidx: t });
    }
})

