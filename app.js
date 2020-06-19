//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.showLoading({
      title: '加载中',
      success: res2 => {
        wx.login({
          success: res => {

            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              url: this.globalData.url.auth + '/oauth/token' ,
              method: 'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic d2ViQXBwOjEyMzQ1Ng'
              },
              data:{
                'grant_type': 'password',
                'username': res.code,
                'password': '123456',
                'scope': 'app'
              },
              success: res1 => {
                this.globalData.authInfo = res1.data;

                setTimeout(function(){
                  wx.hideLoading()
                })
              }
            })
          }
        })
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {

              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    authInfo: null,
    url: {
      invoice: 'http://sodolike.vaiwan.com',
      auth: 'http://sodoauth.vaiwan.com',
      // fapiao: 'https://fapiao.yanzhenyidai.com'
      // invoice: 'https://fapiao.yanzhenyidai.com',
      // auth: 'https://fapiao.yanzhenyidai.com',
      fapiao: 'https://fapiao.yanzhenyidai.com'
    }
    }
    // url: 'http://sodolike.vaiwan.com'
    // url: 'https://fapiao.yanzhenyidai.com'
 
})