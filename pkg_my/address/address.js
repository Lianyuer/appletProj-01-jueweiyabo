// pkg_my/address/address.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: ''
  },
  // 跳转到新增地址页面
  toAdded() {
    wx.navigateTo({
      url: '../added/added',
    })
  },
  // 跳转到编辑地址页面
  toEdit(e) {
    console.log(e.currentTarget.dataset.index);
    // wx.navigateTo({
    //   url: `../edit/edit?id=${e.currentTarget.dataset.index}`,
    // })
  },
  getData() {
    wx.request({
      url: 'http://127.0.0.1:9090/alladdress',
      method: 'get',
      success: res => {
        console.log('alladdress', res);
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
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['userInfo'],
      actions: []
    })
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