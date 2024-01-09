import { action, observable } from 'mobx-miniprogram'

export const store = observable({
	userInfo: '',
	// 计算属性

	// actions方法
	login: action(function () {
		wx.getUserProfile({
			desc: '用于用户登录',
			success: res => {
				console.log(res);
				this.userInfo = res.userInfo
				console.log('userInfo,', this.userInfo);
			}
		})
	})
})