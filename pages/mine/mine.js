// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myPublishState:false,
		userInfo:{},
    myPublishArr:[],
    token:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
 onLoad: function () {
 
    
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    setTimeout(() => {
      _this.setData({
        'token': app.globalData.token
      })
      this.getMyOrder()
    }, 1000)

    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        _this.setData({
          userInfo: res.userInfo
        })
        console.log(_this.data.userInfo)
      }
    })
  },
  goBack:function(){
    this.setData({
      myPublishState: false
    })
  },
  viewMyPub:function(){
    
    this.setData({
      myPublishState: true
    })
    console.log(1)
  },
  getMyOrder: function () {
    let _this = this
    // wx.request({
    //   url: 'http://118.25.63.70:80/shunluya/wechat/getMyOrder',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     if (res.data.code === "200") {
    //       _this.setData({
    //         myOrderArr: res.data.data_carMsg
    //       })
    //       wx.hideNavigationBarLoading()
    //     }
    //   }
    // })
    wx.request({
      url: 'http://118.25.63.70:80/shunluya/wechatUser/getMyMsg',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        'token': this.data.token
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === "200") {
          _this.setData({
            myPublishArr: res.data.data.order
          })
          wx.hideNavigationBarLoading()
        }
      }
    })
    
  },
})