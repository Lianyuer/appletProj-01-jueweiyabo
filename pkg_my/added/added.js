// pkg_my/added/added.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      people: '', // 姓名
      sex: 1, // 性别
      phone: '', // 电话
      address: '', // 地址
      doornum: '', // 门牌号
      tips: 0, // 当前是第几个标签
    }
  },
  // 获取姓名
  getName(e) {
    this.setData({
      'form.people': e.detail.value
    })
  },
  // 获取手机号
  getPhone(e) {
    this.setData({
      'form.phone': e.detail.value
    })
  },
  // 获取地址
  getAddr(e) {
    this.setData({
      'form.address': e.detail.value
    })
  },
  // 获取门牌号
  getDoornum(e) {
    this.setData({
      'form.doornum': e.detail.value
    })
  },
  // 选择标签
  tagChoose(e) {
    console.log(e.currentTarget.dataset.tag);
    this.setData({
      'form.tips': e.currentTarget.dataset.tag
    })
  },
  // 新增地址
  add() {
    if (!this.data.form.people | !this.data.form.sex | !this.data.form.phone | !this.data.form.address | !this.data.form.doornum | !this.data.form.tips) {
      wx.showToast({
        title: '表单不能为空',
        icon: 'none'
      })
    } else {
      console.log(this.data.form);
      wx.request({
        url: 'http://127.0.0.1:9090/add_address',
        method: 'POST',
        data: {
          "people": this.data.form.people,
          "sex": this.data.form.sex,
          "phone": this.data.form.phone,
          "address": this.data.form.address,
          "doornum": this.data.form.doornum,
          "tips": this.data.form.tips,
        },
        header: {
          "content-type": 'application/json'
        },
        success: (res) => {
          console.log('add', res);
          wx.showToast({
            title: '新增成功',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      })
    }
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