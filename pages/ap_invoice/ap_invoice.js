// pages/ap_invoice/ap_invoice.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: []
  },

  details:function(e){
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '加载中',
      success: res1 => {
        wx.request({
          url: app.globalData.url + '/invoice/findAll',
          method: 'POST',
          success: res => {
            console.log(res.data.length);

            this.setData({
              result: res.data
            });

            setTimeout(function(){
              wx.hideLoading()
            },100)
    
            // this.setData.result = res.data;
            // _this.data.result = res.data;
            // that.data.result = res.data;
          }
        })
      }
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
    this.onLoad();

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

  }
})