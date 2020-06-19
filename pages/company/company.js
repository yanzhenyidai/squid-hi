const app = getApp();

Page({
  onShareAppMessage() {
    return {
      title: '虫子云票',
      path: '/pages/index_v2/index_v2'
    }
  },

  data: {
    company: null
  },

  formSubmit:function(e){    

    if(e.detail.value.companyName == ''){
      wx.showToast({
        title: '公司名称必须输入',
        icon: 'none',
        duration: 1000
      });
      return;
    }

      wx.showLoading({
        title: '保存中',
        success: res1 => {
        wx.request({
          url: app.globalData.url.invoice + '/company/save',
          method: 'POST',
          header:{
            'Authorization': 'Bearer ' + app.globalData.authInfo.access_token
          },
          data:{
            'companyName': e.detail.value.companyName,
            'companyAddress': e.detail.value.companyAddress,
            'companyBank': e.detail.value.companyBank,
            'companyTaxCode': e.detail.value.companyTaxCode
          },
          success: res => {
            
            if(res.statusCode != 200){
              wx.showToast({
                title: '提交失败，请检查公司信息',
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
  }

  ,onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      success: res1 => {
        wx.request({
          url: app.globalData.url.invoice + '/company/findOne',
          method: 'POST',
          data: {},
          header:{
            'Authorization': 'Bearer ' + app.globalData.authInfo.access_token
          },
          success: res => {
            this.setData({
              company: res.data
            });

            wx.hideLoading()
          }
        })  
      }
    });
  }

})
