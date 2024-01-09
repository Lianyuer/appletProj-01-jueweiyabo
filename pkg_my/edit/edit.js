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
    userAddrById: ''
  },
  // 用于数据回显
  getData() {
    var relId = Number(this.data.query.id) + 1
    // console.log('relId', relId);
    wx.request({
      url: `http://127.0.0.1:9090/getidaddress?id=${relId}`,
      method: 'GET',
      success: res => {
        // console.log('put', res);
        var that = this
        console.log('this', this);
        this.setData({
          userAddrById: res.data.data
        })
        this.setData({
          'form.people': that.data.userAddrById[0].people,
          'form.sex': that.data.userAddrById[0].sex,
          'form.phone': that.data.userAddrById[0].phone,
          'form.address': that.data.userAddrById[0].address,
          'form.doornum': that.data.userAddrById[0].doornum,
          'form.tips': that.data.userAddrById[0].tips,
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
  // 提交编辑
  submit() {
    wx.request({
      url: 'http://127.0.0.1:9090/update_address',
      method: 'PUT',
      data: {   //data里面放携带参数
        "people": this.data.form.people,  //这里根据需求写  例:"name" : "张三"
        "sex": this.data.form.sex,
        "phone": this.data.form.phone,
        "address": this.data.form.address,
        "doornum": this.data.form.doornum,
        "tips": this.data.form.tips,
      },
      header: {
        "content-type": 'application/json' //携带参数的格式，这里我们用json格式，对应上面data
      },
      success: res => {
        console.log(res);
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