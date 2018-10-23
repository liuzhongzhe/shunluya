//app.js
App({
	onLaunch: function() {
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		//登陆
		wx.login({
			success: res => {
				if (res.code) {
					wx.request({
						url: 'https://api.weixin.qq.com/sns/jscode2session',
						data: {
							js_code: res.code,
							appid: 'wx10efdd909880ed5a',
							secret: '30da574f457f38cae763d380e5ca448c',
							grant_type: 'authorization_code'
						},
						success: resp => {
							wx.setStorage({
								key: 'openid',
								data: resp.data.openid,
							})
							wx.request({
								url: 'http://118.25.63.70:80/shunluya/wechatUser/userLogin?openid=' + resp.data.openid,
								method: 'POST',
								success: response => {
									this.globalData.token = response.data.data
									wx.setStorage({
										key: 'token',
										data: response.data.data,
									})
									wx.setStorage({
										key: 'codeState',
										data: response.data.code,
									})
								}
							})
						}
					})
				} else {
					console.log('登录失败！' + res.errMsg)
				}
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
		token: '',
		openid: ''
	}
})
