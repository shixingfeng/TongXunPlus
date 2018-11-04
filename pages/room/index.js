//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    the_room_info:{
      room_id:null,
      room_title:null,
    },
    motto: 'Coming soon...\r\n即将上线',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputMarBot:false,
    room_data:[
      ["a0","COMMENT","你好","用户名","http://www.hotpoor.com/static/img/default_user.jpg","2018年11月3日 10:00"],
      ["a1","COMMENT","你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好v","用户名","http://www.hotpoor.com/static/img/default_user.jpg","2018年11月3日 10:00"],
      ["a2","COMMENT","1","用户名","http://www.hotpoor.com/static/img/default_user.jpg","2018年11月3日 10:00"],
      ["a3","COMMENT","你好","用户名","http://www.hotpoor.com/static/img/default_user.jpg","2018年11月3日 10:00"],
      ["a4","COMMENT","你好","用户名","http://www.hotpoor.com/static/img/default_user.jpg","2018年11月3日 10:00"],
      ["a5","COMMENT","你好","用户名","http://www.hotpoor.com/static/img/default_user.jpg","2018年11月3日 10:00"],
      ["a6","COMMENT","你好","用户名","http://www.hotpoor.com/static/img/default_user.jpg","2018年11月3日 10:00"],
      ["a7","COMMENT","你好","用户名","http://www.hotpoor.com/static/img/default_user.jpg","2018年11月3日 10:00"],
      ["a8","COMMENT","你好","用户名","http://www.hotpoor.com/static/img/default_user.jpg","2018年11月3日 10:00"],
      ["a9","COMMENT","你好","用户名","http://www.hotpoor.com/static/img/default_user.jpg","2018年11月3日 10:00"],
      ["a10","COMMENT","你好","用户名","http://www.hotpoor.com/static/img/default_user.jpg","2018年11月3日 10:00"],
    ],
    cate:"a10",
    scrollTop:0,
    DeviceHeight:"0rpx",
  },
  //事件处理函数
  onLoad: function (option) {
    var DeviceHeight_now = wx.getSystemInfoSync().windowHeight
    var DeviceWidth_now = wx.getSystemInfoSync().windowWidth
    var pixelRatio = wx.getSystemInfoSync().pixelRatio
    DeviceHeight_now = DeviceHeight_now * (750 / DeviceWidth_now) - 120
    this.setData({
      DeviceHeight: DeviceHeight_now+"rpx",
    })
    console.log(DeviceHeight_now)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var room_id = option.room_id
    var room_title = option.room_title
    this.data.the_room_info = {
      room_id:room_id,
      room_title:room_title
    }
    this.setData({
      the_room_info:this.data.the_room_info
    })
    wx.setNavigationBarTitle({
      title:room_title
    })
    console.log(app.globalData.wss)
    if (app.globalData.wss==true){

    }else{
      wx.closeSocket({
        success:res=>{
          console.log("success closeSocket")
        },
        fail:res=>{
          console.log("fail closeSocket")
        }
      })
    }
    wx.connectSocket({
      url: 'wss://www.hotpoor.com/api/data/ws?aim_id=0cd8429c1da249b6935d7eef72d7fc0b',
      data:{
        aim_id:'0cd8429c1da249b6935d7eef72d7fc0b'
      }
    })
    wx.onSocketOpen(function (res){
      app.globalData.wss = true
      console.log("ws onSocketOpen")
      console.log(res)
      var msg_now = ["JOINMOREROOMS", {}, "0cd8429c1da249b6935d7eef72d7fc0b", ["HACKATHON"]]
      msg_now = JSON.stringify(msg_now)
      wx.sendSocketMessage({
        data:msg_now
      })
    })
    wx.onSocketMessage(function(data){
      console.log(data)
    })
    
    wx.onSocketError(function() {
      console.log('websocket连接失败！');
    })
    wx.onSocketClose(function(res) {
      console.log('WebSocket 已关闭！')
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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

   // 评论输入框聚焦时，设置与底部的距离
  settingMbShow: function () {
    this.setData({
      inputMarBot: true
    })
  },
  //  评论输入框失去聚焦时，设置与底部的距离（默认状态）
  settingMbNoShow: function () {
    this.setData({
      inputMarBot: false
    })

    const query = wx.createSelectorQuery()
    query.select('#room').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      res[0].top       // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      console.log()
    })

  },
  onShareAppMessage:function (res) {
    return {
      title: this.data.the_room_info.room_title,
      path: "/pages/room/index?room_id="+this.data.the_room_info.room_id+"&room_title="+this.data.the_room_info.room_title,
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
  scrollTouchAction:function(e){
    // var scrollTopNow = this.data.scrollTop
    // if(this.data.scrollTop<=0){
    //   console.log("scrollnow:"+e.detail.scrollTop)
    //   scrollTopNow = scrollTopNow + 1
    //   this.setData({
    //     scrollTop:scrollTopNow
    //   })
    // }
  },
  scroll: function(e){
    console.log("scroll:"+e.detail.scrollTop)
    this.setData({
      scrollTop:e.detail.scrollTop
    })
    console.log(e)
  }
})