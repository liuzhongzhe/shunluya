// pages/release/release.js
Page({
	data: {
		addInfo: {
			date: '2018-08-23',
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
			endAddressvalue: '',
			isBag: 0,
			isLose: 0,
			respon_class: 0

		},
	},
	onLoad: function () {
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
	onLaunch: function () {
	
	},
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
	bindRegionChangeArrive: function (e) {
		let _this = this
		this.setData({
			'addInfo.startAddressvalue': _this.data.addInfo.addressArr[e.detail.value].id
		})
	},
	bindRegionChangeGo: function (e) {
		let _this = this
		this.setData({
			'addInfo.endAddressvalue': _this.data.addInfo.addressArr[e.detail.value].id
		})
		console.log(_this.data.addInfo)
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
		let _data = _this.data.addInfo
		wx.request({
			url: 'http://118.25.63.70:80/shunluya/wechat/addMsg',
			method: 'POST',
			header: {
				'content-type': 'application/json' // 默认值
			},
			data: {
				date: _data.date,
				hstime: _data.time,
				peopleNumber: _data.busPeoNum,
				startAddressvalue: _data.startAddressvalue,
				endAddressvalue: _data.endAddressvalue,
				bag: _data.isBag,
				lose: _data.isLose,
				respon_class: _data.respon_class,
			},
			success: function (res) {
				console.log(res)
			}
		})
	}
})
