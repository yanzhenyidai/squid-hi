// pages/index_v2/index_v2.js
const base64 = require('../images/base64');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60
  });
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
    app.onLaunch();

    wx.stopPullDownRefresh();
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

  },
  goCard: function(){

    wx.chooseInvoice({
      complete: (res) => {

        wx.request({
          url: app.globalData.url + '/wechat/invoice',
          header:{
            'Authorization': 'Bearer ' + app.globalData.authInfo.access_token
          },
          data: res.invoiceInfo,
          method: 'POST',
          success: res1 => {
            
          }
        })

        console.log(res.invoiceInfo);
      },
    })

  },
  goReport: function(){
    wx.navigateTo({
      url: '/pages/report/report',
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
  goOcr: function(){
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
                  url: app.globalData.url.invoice + '/ocr/glority',
                  method: 'POST',
                  header:{
                    'Authorization': 'Bearer ' + app.globalData.authInfo.access_token
                  },
                  data: {
                    'base64Img': res.data
                  },
                  success: res2 => {

                    wx.navigateTo({
                      url: '/pages/invoice_tab/invoice_tab?id='+res2.data.id,
                    })

                    setTimeout(function(){
                      wx.hideLoading()
                    })
                  }
                })
            }
          });
        }
      })
      
      
    }
  })
 },goCollect:function(){
  wx.navigateTo({
    url: '/pages/collect/index/collect',
  })
}
})