Page({
  onShareAppMessage() {
    return {
      title: '扫码',
      path: '/pages/scan/scan'
    }
  },

  data: {
    result: []
  },

  scanCode() {
    const that = this
    wx.scanCode({
      success(res) {
        console.log(res);

        let invoice = res.result.split(",")
        that.setData({
          result: invoice
          // [`formData.invDate`]: "123123123"
        })
      },
      fail() {}
    })
  },

  formSubmit:function(e){
    var _this = this;

    wx.request({
      url: 'http://sodolike.vaiwan.com/invoice/save',
      method: 'POST',
      data:{
        'invNumber': this.data.result[3],
        'invType': this.data.result[0],
        'invDate': this.data.result[5],
        'invCode': this.data.result[2],
        'checkCode': this.data.result[6],
        'invAmount': this.data.result[4]
      },
      success:function(data){
        wx.showToast({
          title: '成功',
          success: res => {
            _this.onLoad();
          }
        })
      }
    })
  }

  ,onLoad: function (options) {
      
  }

})
