// pages/invoice_tab/invoice_tab.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    item: '',
    activeTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const tabs = [];
    wx.showLoading({
      title: '加载中',
      success: res1 => {
        wx.request({
          url: app.globalData.url.invoice + '/invoice/findById/' + options.id,
          method: 'POST',
          header:{
            'Authorization': 'Bearer ' + app.globalData.authInfo.access_token
          },
          success: res => {
            
            this.setData({
              tabs: res.data
            })

            setTimeout(function(){
              wx.hideLoading()
            })
          }
        })
      }
    });
  },

  onTabClick(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },
  handleClick(e) {
    wx.navigateTo({
      url: './webview',
    })
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