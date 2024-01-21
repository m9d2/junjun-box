import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    token: ""
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: "",
    })
  },

  onShow() {
    let that = this
    wx.getStorage({
      key: "ysl_token",
      success: function(res) {
        that.setData({
          token: res.data
        })
      }
    })
  },

  bindTextAreaBlur: function (e: any) {
    this.setData({
      token: e.detail.value
    })
  },
  formSubmit() {
    wx.setStorageSync('ysl_token', this.data.token);
    Toast.success('设置成功');
  },
})