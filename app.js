//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        console.log("发送 res.code 到后台换取 openId, sessionKey, unionId")
        var code = res.code
        wx.request({
          url: "https://www.hotpoor.com/api/wechat/wxapp/code_to_openid",
          data:{
            code: code,
            app_id: 'wxacfc4f361ba2e4c5',
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          dataType: "json",
          success:res =>{
            console.log(res.data)
            console.log("成功获取openid")
            this.globalData.openId = res.data.openid
            this.globalData.login = "weixin:"+res.data.gh_id+"_@@_"+res.data.openid
          },
          fail:res =>{
            console.log(res)
          }

        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              console.log("=== 获取用户信息 ===")
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              console.log("=== 获取用户信息 ===")
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
    openId:null,
    login:null,
    wss:false,
  }
})