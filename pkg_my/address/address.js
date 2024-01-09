// pkg_my/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ''
  },
  toAadded() {
    wx.navigateTo({
      url: '../added/added',
    })
  },
  getData() {
    wx.request({
      url: 'http://127.0.0.1:9090/alladdress',
      method: 'get',
      success: res => {
        // console.log(res);
        this.setData({
          list: res.data.data
        })
        console.log('this.data.list', this.data.list);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})