// pages/email/email.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null
  },

  formSubmit: function(e){
    if(e.detail.value.email == ''){
      wx.showToast({
        title: '邮箱必须输入',
        icon: 'none',
        duration: 1000
      });
      return;
    }

      wx.showLoading({
        title: '保存中',
        success: res1 => {
        wx.request({
          url: app.globalData.url.invoice + '/user/save',
          method: 'POST',
          header:{
            'Authorization': 'Bearer ' + app.globalData.authInfo.access_token
          },
          data:{
            'email': e.detail.value.email
          },
          success: res => {
            
            if(res.statusCode != 200){
              wx.showToast({
                title: '提交失败，请检查邮箱信息',
                icon: 'none',
                duration: 3000
              });
              return;
            }

            wx.hideLoading()

            wx.showToast({
              title: '成功',
              success: res2 => {
                
                setTimeout(() => {
                  this.onLoad();
                },1000);
              }
            })
          }
        })        
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
wx.showLoading({
      title: '加载中',
      success: res1 => {
        wx.request({
          url: app.globalData.url.invoice + '/user/findOne',
          method: 'POST',
          data: {},
          header:{
            'Authorization': 'Bearer ' + app.globalData.authInfo.access_token
          },
          success: res => {
            this.setData({
              user: res.data
            });

            wx.hideLoading()
          }
        })  
      }
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