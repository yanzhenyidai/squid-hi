// pages/collect/index/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      coverList: [],
      imgData: [], 
      indicatorDots: true,
      vertical: false,
      autoplay: false,
      circular: false,
      interval: 2000,
      duration: 500,
      previousMargin: 0,
      nextMargin: 0
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

  },
  goCover: function(){   
    const that = this
    
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
      wx.showLoading({
        title: '加载中',
        success: res1 => {    
            const tempFilePaths = that.data.coverList;

            res.tempFilePaths.forEach(item => {
              tempFilePaths.push(item)
            })
            
            that.setData({
              coverList: tempFilePaths
            })

            setTimeout(() => {
              wx.hideLoading()
            });
        }
      })
      }
    })
   },
   goInvoice: function(){
    const that = this;
  
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
      }
    })
   },
   goFile: function(){
    const that = this;
  
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
      }
    })
   },
   submitBill: function(){

    wx.showLoading({
      title: '加载中',
      success: res1 => {
        const imgList = this.data.coverList

        let imgData = imgList.map((item) => {
          return wx.getFileSystemManager().readFileSync(item,'base64');
        });
  
            wx.request({
              url: 'http://fapiaocs.vaiwan.com/invoice/edocTask/saveEdocTask',
              method: 'POST',
              data: JSON.stringify(imgData),
              success: res => {
                  // console.log(res)

                  setTimeout(() => {
                    wx.hideLoading()
                  });
        }
      })

      }
    })
     
   }
})