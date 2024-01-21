// pages/my/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '微信用户',
    avatarUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: '我的'
    })
    let that = this;
    wx.getStorage({
      key: "nickName",
      success: function(res) {
        console.log(res)
        that.setData({
          nickName: res.data
        })
      }
    })
    wx.getStorage({
      key: "avatarUrl",
      success: function(res) {
        that.setData({
          avatarUrl: res.data
        })
      }
    })
  },

  onChangeNickname() {
    wx.setStorageSync("nickName", this.data.nickName)
  },

  onChooseAvatar(res: any) {
    wx.setStorageSync("avatarUrl", res.detail.avatarUrl)
    this.setData({
      avatarUrl: res.detail.avatarUrl
    })
  }
})