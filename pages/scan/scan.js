Page({
  onShareAppMessage() {
    return {
      title: '扫码',
      path: '/pages/scan/scan'
    }
  },

  data: {
    result: [],
    formData: {}
  },

  scanCode() {
    const that = this
    wx.scanCode({
      success(res) {
        let invoice = res.result.split(",")
        that.setData({
          result: invoice
        })
      },
      fail() {}
    })
  },
  saveInvoice:function(e){
     console.log(e);
  },
  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value,
        [`formData.date`]: e.detail.value
    })
  }
})
