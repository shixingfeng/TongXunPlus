//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    data:{
      "share_ad_view_hidden":false,
      "room_king_ids":["MAGICCRYSTAL"],
      "room_top_ids":["MAGICCRYSTAL"],
      "room_default_ids":["MAGICCRYSTAL1"],
      "room_ids":["MAGICCRYSTAL","MAGICCRYSTAL1"],
      "room_info":{
        "MAGICCRYSTAL":{
          "room_title":"麒麟Plus粉丝团",
          "room_description":"麒麟Plus粉丝团，关注《创业时代》，为主创打Call！",
          "room_updatetime":"1539666746",
          "room_notification":false,
          "room_line_content_count":1000,
          "room_line_img_url":"http://image.hotpoor.org/2dd2c53e7c654c66b398e574848d4c34_bf31e4a8228408536fceb70a49495865?imageView2/2/w/200"
        },
        "MAGICCRYSTAL1":{
          "room_title":"麒麟Plus粉丝团002",
          "room_description":"麒麟Plus粉丝团，关注《创业时代》，为主创打Call！",
          "room_updatetime":"1539666746",
          "room_notification":true,
          "room_line_content_count":10,
          "room_line_img_url":"http://image.hotpoor.org/2dd2c53e7c654c66b398e574848d4c34_bf31e4a8228408536fceb70a49495865?imageView2/2/w/200"
        }
      },
      "user_ids":[],
      "user_info":{}
    },
    motto: 'Coming soon...\r\n即将上线',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindLineViewTap: function(e){
    console.log(e.currentTarget.dataset["tag"]);
    console.log(e);
    wx.navigateTo({
      url: '../room/index?aim_id=' + e.currentTarget.dataset["tag"]
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log("获取用户信息4")
      this.data.data.share_ad_view_hidden = true
      this.setData({
        data:this.data.data
      })
    } else if (this.data.canIUse){
      console.log("获取用户信息2")
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log("获取用户信息3")
        this.data.data.share_ad_view_hidden = true
        this.setData({
          data:this.data.data
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log("获取用户信息1")
          console.log(res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.data.data.share_ad_view_hidden = true
          this.setData({
            data:this.data.data
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.data.data.share_ad_view_hidden = true
    this.setData({
      data:this.data.data
    })
  },
  getUserInfoMore:function(e) {
    console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    this.data.userInfo = app.globalData.userInfo
    console.log(this.data.userInfo)
    this.setData({
      userInfo: this.data.userInfo,
      hasUserInfo: true
    })
    this.data.data.share_ad_view_hidden = true
    this.setData({
      data:this.data.data
    })
  },
  previewImage: function(e) {    
      var current=e.target.dataset.src;  
      wx.previewImage({  
          current: current, // 当前显示图片的http链接  
          urls: [current]// 需要预览的图片http链接列表  
      })  
  },
  takePhoto: function(e) {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  onShareAppMessage:function (res) {
    return {
      title: "魔晶小程序粉丝团，邀您一起追剧《创业时代》！",
      path: "/pages/index/index?user_id=001",
      imageUrl:"../../images/haibao.jpg",
      success: function(res){
        console.log(res)
        wx.showShareMenu({
          withShareTicket: true
        })
      },
      fail:function(res){
        console.log(res)
      },
      complete:function(res){
        console.log(res)
      }
    }
  },
  enterRoom:function(e){
    console.log(app.globalData)
    var room_id = e.currentTarget.id
    var room_title = this.data.data.room_info[room_id].room_title
    wx.navigateTo({
      url:"/pages/room/index?room_id="+room_id+"&room_title="+room_title
    })
  }

})