//index.js
//获取应用实例
const app = getApp()
Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
    tabs: ["人找车", "车找人", "筛选"],
		activeIndex: 0,
		sliderOffset: 0,
		sliderLeft: 0,
		findCarArr:[],
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},

	onLoad: function () {
		let _this = this
    wx.request({
      url: 'http://118.25.63.70:80/shunluya/wechat/findPeople',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code === "200"){
					_this.setData({
						findCarArr:res.data.data_peoMsg
					})
				} 
      }
    }) 
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
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
			
		}
	},
	tabClick: function (e) {
		this.setData({
			sliderOffset: e.currentTarget.offsetLeft,
			activeIndex: e.currentTarget.id
		});
	}, 
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	}
})
