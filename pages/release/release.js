// pages/release/release.js
Page({
  data: {
    date: '2016-09-01',
    time: '12:01',
	regionArrive: ['广东省', '广州市', '海珠区'],
	regionGo: ['广东省', '广州市', '海珠区'],
	customItem: '全部',
	busPeoNum:1,
	types: [
      {name: '1', value: '人找车'},
      {name: '2', value: '车找人', checked: 'true'},
    ]
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChangeArrive: function (e) {
    this.setData({
      regionArrive: e.detail.value
    })
  },
  bindRegionChangeGo: function (e) {
    this.setData({
      regionGo: e.detail.value
    })
  },
  switch1Change: function (e){
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  switch2Change: function (e){
  console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  }
})
