const app = getApp();

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
    console.log(e);
    if(e.detail.value.invNumber == ''){
      wx.showToast({
        title: '发票号码必须输入',
        icon: 'none',
        duration: 1000
      });
      return;
    }

    if(e.detail.value.invCode == '' ){
      wx.showToast({
          title: '发票代码必须输入',
          icon: 'none',
          duration: 1000
      });
      return;
    }
   
    if(e.detail.value.invAmount == ''){
      wx.showToast({
        title: '发票金额必须输入',
        icon: 'none',
        duration: 1000
      });
      return;
    }
    if(e.detail.value.invDate == ''){
      wx.showToast({
        title: '发票日期必须输入',
        icon: 'none',
        duration: 1000
      });
      return;
    }

    wx.request({
      url: app.globalData.url.invoice + '/invoice/save',
      method: 'POST',
      header:{
        'Authorization': 'Bearer ' + app.globalData.authInfo.access_token
      },
      data:{
        'invNumber': e.detail.value.invNumber,
        // 'invType': e.detail.value.invType,
        'invDate': e.detail.value.invDate,
        'invCode': e.detail.value.invCode,
        'invCheckCode': e.detail.value.invCheckCode,
        'invAmount': e.detail.value.invAmount
      },
      success: res => {
        
        if(res.statusCode != 200){
          wx.showToast({
            title: '提交失败，请检查发票数据',
            icon: 'none',
            duration: 3000
          });
          return;
        }

        wx.showLoading({
          title: '保存中',
          success: res1 => {
            wx.navigateTo({
              url: '/pages/detail/detail?id=' + res.data.id,
            })

            setTimeout(() => {
              wx.hideLoading()
            });
          }
        })
        // wx.showToast({
        //   title: '成功',
        //   success: res => {
        //     _this.onLoad();
        //   }
        // })
      }
    })
  }

  ,onLoad: function (options) {
      
  }

})
