// pages/3erweima/3erweima.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 条形码
    barCode: '../imgs/index/txm1.png',
    barCodePath: ['../imgs/index/txm1.png', '../imgs/index/txm2.png'],
    // 前缀码
    prefixCode: '248978941513354315313',
    prefixCodePath: ['248978941513354315313', '986478941513354316354'],
    // 二维码
    qrCode: '../imgs/index/ewm1.png',
    qrCodePath: ['../imgs/index/ewm1.png', '../imgs/index/ewm2.png']
  },
  updateCode() {
    var numIndex = 0
    setInterval(() => {
      // this.data.numIndex++
      var that = this
      numIndex = numIndex === 1 ? 0 : numIndex + 1
      console.log(numIndex);
      this.setData({
        barCode: that.data.barCodePath[numIndex],
        prefixCode: that.data.prefixCodePath[numIndex],
        qrCode: that.data.qrCodePath[numIndex]
      })
    }, 30000)
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
    this.updateCode()
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