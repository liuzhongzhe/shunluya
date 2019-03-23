var app = getApp();
Page({
	data: {
		openid: "",
		token: '',
		codeState: '',
		loginShow: false,
    currentdate:'',
		items: [{
				name: '男',
				value: '男',
				checked: 'true'
			},
			{
				name: '女',
				value: '女'
			},
		],
		userLogin: {
			phone: '',
			sex: '男',
			check: '',
			username: ''
		},
		addInfo: {
			date: '',
			time: '',
			busPeoNum: 1,
			addressGoArr: ["石台", "池州", "铜陵", "安庆", "合肥", "贵池火车站"],
			addressArr: [],
			startAddressvalue: '',
			startAddressName: '',
			endAddressvalue: '',
			endAddressName: '',
			isBag: 0,
			isLose: 0,
			respon_class: 1,
			types: [{
				name: 2,
				value: '人找车'
			}, {
				name: 1,
				value: '车找人',
				checked: 'true'
			}]
		},
	},
	onLoad: function() {
    
		setTimeout(() => {
			_this.setData({
				'token': app.globalData.token
			})
		}, 1000)
		let _this = this
    
    //  current time
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var h = date.getHours(); //获取小时   
    var m = date.getMinutes(); //获取分钟 
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    var currentTime = h + seperator2 +m
    _this.setData({
      'addInfo.date': currentdate,
      'addInfo.time': currentTime
    })
		wx.request({
			url: 'http://118.25.63.70:80/shunluya/wechat/getAddress',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function(res) {
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
	onLaunch: function() {},
	bindDateChange: function(e) {
		this.setData({
			'addInfo.date': e.detail.value
		})
	},
	bindTimeChange: function(e) {
		this.setData({
			'addInfo.time': e.detail.value
		})
	},
	radioChange: function(e) {
		this.setData({
			'addInfo.respon_class': e.detail.value
		})
	},
	userLoginSexChange: function(e) {
		this.setData({
			'userLogin.sex': e.detail.value
		})
	},
	closeLogin: function() {
		this.setData({
			'loginShow': false
		})
	},
	toLogin: function() {
		let _data = this.data.userLogin
		let _this = this
		wx.request({
			url: 'http://118.25.63.70/shunluya/wechatUser/userFirst',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			data: {
				phone: _data.phone,
				username: _data.username,
				openid: this.data.openid,
				check: _data.check,
				sex: _data.sex,
				token: this.data.token,
        time: this.data.addInfo.date
			},
			success: function(res) {
				_this.setData({
					"loginShow": false
				})
				wx.setStorage({
					key: 'codeState',
					data: 200,
				})
			}
		})
	},
	getCheck: function(e) {
		let _this = this;
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
		wx.request({
			url: 'http://118.25.63.70/shunluya/wechatUser/SendCheck',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			data: {
				phone: this.data.userLogin.phone,
				token: this.data.token
			},
			success(res) {
				_this.setData({
					'userLogin.check': res.data.data
				})
				_this.setData({
					'codeState': 200
				})
			}
		})
	},
	bindRegionChangeArrive: function(e) {
    if (this.data.addInfo.addressArr[e.detail.value].address == this.data.addInfo.endAddressName) {
      var a = '出发地和目的地\r\n不能相同'
      wx.showToast({
        title: a,
        icon: 'none',
        duration: 2000
      })
      return;
    }		this.setData({
      'addInfo.startAddressvalue': this.data.addInfo.addressArr[e.detail.value].id,
      'addInfo.startAddressName': this.data.addInfo.addressArr[e.detail.value].address
		})
	},
	bindRegionChangeGo: function(e) {
    if (this.data.addInfo.addressArr[e.detail.value].address == this.data.addInfo.startAddressName) {
      var a = '出发地和目的地\r\n不能相同'
      wx.showToast({
        title: a,
        icon: 'none',
        duration: 2000
      })
      return;
    }
		this.setData({
      'addInfo.endAddressvalue': this.data.addInfo.addressArr[e.detail.value].id,
      'addInfo.endAddressName': this.data.addInfo.addressArr[e.detail.value].address
		})
	},
	switch1Change: function(e) {
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
	switch2Change: function(e) {
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
	addItem: function() {
		let _this = this
		if (!this.data.addInfo.startAddressvalue) {
			wx.showToast({
				title: '请填写出发地点',
				image: '../../images/error.png',
				duration: 2000
			});
			return;
		}
		if (!this.data.addInfo.endAddressvalue) {
			wx.showToast({
				title: '请填写到达地点',
				image: '../../images/error.png',
				duration: 2000
			});
			return;
		}
		wx.getStorage({
			key: 'openid',
			success: function(res) {
				_this.setData({
					"openid": res.data
				})
			}
		})
		wx.getStorage({
			key: 'token',
			success: function(res) {
				_this.setData({
					"token": res.data
				})
			}
		})
		wx.getStorage({
			key: 'codeState',
			success: function(res) {
				_this.setData({
					"codeState": res.data
				})
        console.log(res)
        if (res.data == '400' || res.data == '500') {
          _this.setData({
            'loginShow': true
          })
          return;
        }else{

          let _data = _this.data.addInfo
          setTimeout(() => {
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
                respon_class: _data.respon_class,
                token: _this.data.token,
              },
              success: function (res) {
                wx.showToast({
                  title: '发布成功',
                  image: '../../images/success.png',
                  duration: 1500
                });
              }
            }, 200)
          })
        }
			}
		})
	

	}
})
