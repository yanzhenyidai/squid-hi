// pages/hi/hi.js
Page({
  goTest: function(){
    wx.navigateTo({
      url: '/pages/multipart_invoice/multipart_invoice',
    })
  },
  goInvoice: function(){
    wx.navigateTo({
      url: '/pages/ap_invoice/ap_invoice',
    })
  },
  scanInvoice: function(){
    wx.navigateTo({
      url: '/pages/scan/scan',
    })
  },
 camera: function(){
  const that = this;

  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success (res) {      
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths;
      wx.showLoading({
        title: '识别中',
        success: res1 => {
          wx.getFileSystemManager().readFile({
            filePath: tempFilePaths[0],
            encoding: 'base64',
            success: res => {
                wx.request({
                  url: 'http://sodolike.vaiwan.com/ocr/glority',
                  method: 'POST',
                  data: {
                    'base64Img': res.data
                  },
                  success: res2 => {
      
                    wx.navigateTo({
                      url: '/pages/multipart_invoice/multipart_invoice?id='+res2.data.id,
                    })
                  }
                })
            }
          });
        }
      })
    }
  })
 },

  /**
   * 页面的初始数据
   */
  data: {
    base64Img: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})