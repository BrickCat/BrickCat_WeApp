function networkStatus() {
  wx.getNetworkType({
    success: function (res) {
      if (res.errMsg !== 'getNetworkType:ok') {
        wx.showModal({
          content: '获取网络状态失败'
        })
        return false;
      }
      if (res.networkType === 'none') {
        wx.showModal({
          content: '当前网络不可用，请检查网络设置'
        })
        return false;
      }
    }
  })
}
/**
   * 登出
   */
function logout() {
  var that = this;
  wx.removeStorage({
    key: 'cookie',
    success: function (res) {
      that.setData({
        isLogin: false
      })
    }
  })
}
module.exports = {
  networkStatus: networkStatus
}
