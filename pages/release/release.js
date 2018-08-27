var app = getApp();

Page({
	data: {
		token: '',
		loginShow: true,
		userLogin: {
			phone: '',
			sex: '男',
			check: '',
			firstName: ""
		},
		addInfo: {
			date: '2018-08-26',
			time: '12:01',
			busPeoNum: 1,
			types: [{
					name: 2,
					value: '人找车'
				},
				{
					name: 1,
					value: '车找人',
					checked: 'true'
				},
			],
			addressGoArr: ["石台", "池州", "铜陵", "安庆", "合肥", "贵池火车站"],
			addressArr: [],
			startAddressvalue: '',
			startAddressName: '',
			endAddressvalue: '',
			endAddressName: '',
			isBag: 0,
			isLose: 0,
			respon_class: 1
		},
	},
	onLoad: function () {
		setTimeout(() => {
			_this.setData({
				'token': app.globalData.token
			})
		}, 1000)
		let _this = this
		wx.request({
			url: 'http://118.25.63.70:80/shunluya/wechat/getAddress',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function (res) {
				if (res.data.code === "200") {
					_this.setData({
						'addInfo.addressArr': res.data.data_address
					})
				}
			}
		})
	},
	userLoginPhoneInput(e) {
		this.setData({
			'userLogin.phone': e.detail.value
		})
	},
	onLaunch: function () {},
	bindDateChange: function (e) {
		let _this = this
		this.setData({
			'addInfo.date': e.detail.value
		})
	},
	bindTimeChange: function (e) {
		let _this = this
		this.setData({
			'addInfo.time': e.detail.value
		})
		console.log(_this.data.addInfo.time)
	},
	radioChange: function (e) {

		this.setData({
			'addInfo.respon_class': e.detail.value
		})
	},
	userLoginSexChange: function (e) {
		this.setData({
			'userLogin.sex': e.detail.value
		})
	},
	getCheck() {
		if (!this.data.userLogin.phone) {
			wx.showToast({
				title: '请填写手机号码',
				image: '../../images/error.png',
				duration: 2000
			});
			return;
		} else if (this.data.userLogin.phone) {
			let re = /^1\d{10}$/
			if (!re.test(this.data.userLogin.phone)) {
				wx.showToast({
					title: '手机格式错误',
					image: '../../images/error.png',
					duration: 2000
				});
				return;
			}
		}
// 		wx.request({
// 			url: 'http://118.25.63.70/shunluya/wechatUser/SendCheck?phone='+this.data.userLogin.phone,
// 			method: 'POST',
// 			header: {
// 				'content-type': 'application/x-www-form-urlencoded',
// 			},
// 			success: function (res) {
// 				console.log(res)
// 			}
// 		})
		wx.request({
			url: 'http://118.25.63.70/shunluya/wechatUser/SendCheck',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			data:{
				phone:this.data.userLogin.phone
			},
			success: function (res) {
				console.log(res)
			}
		})
	},
	bindRegionChangeArrive: function (e) {
		let _this = this
		this.setData({
			'addInfo.startAddressvalue': _this.data.addInfo.addressArr[e.detail.value].id,
			'addInfo.startAddressName': _this.data.addInfo.addressArr[e.detail.value].address
		})
	},
	bindRegionChangeGo: function (e) {
		let _this = this
		this.setData({
			'addInfo.endAddressvalue': _this.data.addInfo.addressArr[e.detail.value].id,
			'addInfo.endAddressName': _this.data.addInfo.addressArr[e.detail.value].address
		})
	},
	switch1Change: function (e) {
		if (e.detail.value) {
			this.setData({
				'addInfo.isBag': 1
			})
		} else {
			this.setData({
				'addInfo.isBag': 0
			})
		}
	},
	switch2Change: function (e) {
		if (e.detail.value) {
			this.setData({
				'addInfo.isLose': 1
			})
		} else {
			this.setData({
				'addInfo.isLose': 0
			})
		}
	},
	addItem: function () {
		let _this = this
		if (_this.data.token === '第一次登陆，需绑定手机号码！') {
			this.setData({
				'loginShow': true
			})
			return
		}
		let _data = _this.data.addInfo
		wx.request({
			url: 'http://118.25.63.70/shunluya/wechat/addMsg',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			data: {
				date: _data.date,
				hstime: _data.time,
				peopleNumber: _data.busPeoNum,
				startAddressvalue: _data.startAddressvalue,
				endAddressvalue: _data.endAddressvalue,
				bag: _data.isBag,
				lose: _data.isLose,
				respon_class: 2,
				token: this.data.token
			},
			success: function (res) {
				console.log(res)
			}
		})
	}
})
