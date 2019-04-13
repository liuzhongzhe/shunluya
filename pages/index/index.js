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
		findPeopleArr: [],
		findCarArr: [],
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		token: '',
		scrollTop: 0,
		scrollHeight: 0
	},
	onPullDownRefresh:function() {
		wx.showNavigationBarLoading() //在标题栏中显示加载
		this.getPeoFindCar();
		this.getCarFindPeo();
	},
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	scroll: function(event) {
		this.setData({
			scrollTop: event.detail.scrollTop
		});
	},
  inviteCar:function(it){
    let _data = it.currentTarget.dataset.it
    wx.request({
      url: 'http://118.25.63.70:80/shunluya/UpDownCarwechat/UpCar',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'get',
      data: {
        MsgId: _data.id,
        time: _data.time.slice(4),
        startAddress: _data.startId,
        endAddress: _data.endId,
        token: app.globalData.token,
        msg_class:1
      },
      success: function (res) {
          console.log(res)    
      }
    })
  },
  wantCar:function(it){
    console.log(it)
    let _data = it.currentTarget.dataset.it
    wx.request({
      url: 'http://118.25.63.70:80/shunluya/UpDownCarwechat/UpCar',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'get',
      data: {
        MsgId: _data.id,
        time: _data.time.slice(4),
        startAddress: _data.startId,
        endAddress: _data.endId,
        token: app.globalData.token,
        msg_class: 0
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
	topLoad: function(event) {
		loadMore(this);
	},
	onLoad: function() {
		let _this = this
		this.getPeoFindCar();
		this.getCarFindPeo();
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {

		}
	},
	tabClick: function(e) {
		this.setData({
			sliderOffset: e.currentTarget.offsetLeft,
			activeIndex: e.currentTarget.id
		});
	},
	getCarFindPeo: function() {
		let _this = this
		wx.request({
			url: 'http://118.25.63.70:80/shunluya/wechat/findPeople',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function(res) {
				if (res.data.code === "200") {
					_this.setData({
						findPeopleArr: res.data.data_peoMsg
					})
					wx.hideNavigationBarLoading()
				}
			}
		})
	},
	getPeoFindCar: function() {
		let _this = this
		wx.request({
			url: 'http://118.25.63.70:80/shunluya/wechat/findCar',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function(res) {
				if (res.data.code === "200") {
					_this.setData({
						findCarArr: res.data.data_carMsg
					})
					wx.hideNavigationBarLoading()
				}
			}
		})
	},
	wantCar:function(e){
		let _data = e.currentTarget.dataset.variable
		wx.request({
			url: 'http://118.25.63.70:80/shunluya/UpDownCarwechat/upCar',
			header: {
				'content-type': 'application/json' // 默认值
			},
			method: 'POST',
			data: {
				MsgId: _data.id,
				time: _data.time.slice(4),
				startAddress: _data.startId,
				endAddress: _data.endId
			},
			success: function(res) {
				if (res.data.code === "200") {
					_this.setData({
						findCarArr: res.data.data_carMsg
					})
					wx.hideNavigationBarLoading()
				}
			}
		})
	},
	getUserInfo: function(e) {
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	}
})
