// pkg_my/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    form: {
      people: '', // 姓名
      sex: 1, // 性别
      phone: '', // 电话
      address: '', // 地址
      doornum: '', // 门牌号
      tips: 0, // 当前是第几个标签
    },
    query: '', // 路由跳转传参
  },
  // 用于数据回显
  getData() {
    var relId = this.data.query.id
    // console.log('relId', relId);
    wx.request({
      url: `http://127.0.0.1:9090/getidaddress?id=${relId}`,
      method: 'GET',
      success: res => {
        // console.log('put', res);
        var userAddrById = res.data.data[0]
        this.setData({
          'form.people': userAddrById.people,
          'form.sex': userAddrById.sex,
          'form.phone': userAddrById.phone,
          'form.address': userAddrById.address,
          'form.doornum': userAddrById.doornum,
          'form.tips': userAddrById.tips,
        })
        // console.log('userAddrById', this.data.userAddrById[0]);
        // console.log('form', this.data.form);
      }
    })
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
  // 提交修改
  update() {
    wx.request({
      url: 'http://127.0.0.1:9090/update_address',
      method: 'POST',
      data: {
        "id": this.data.query.id,
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
      success: res => {
        console.log('edit', res);
        if (res.data.state == 1) {
          wx.showToast({
            title: '修改成功'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        }
      }
    })
  },
  // 删除地址
  del() {
    wx.request({
      url: 'http://127.0.0.1:9090/del_address?id=' + this.data.query.id,
      success: res => {
        console.log('del', res);
        if (res.data.state == 1) {
          wx.showToast({
            title: '删除成功'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('options', options);
    this.setData({
      query: options
    })
    this.getData()
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