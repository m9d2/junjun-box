// index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    tools: [
      {
        title: "记账",
        icon: "https://m9d2-1259379841.cos.ap-shanghai.myqcloud.com/img/%E8%AE%A1%E7%AE%97%E5%99%A8.png",
        url: "/pages/accounting/index",
      },
      {
        title: "YSL积分兑换",
        icon: "https://m9d2-1259379841.cos.ap-shanghai.myqcloud.com/img/%E6%8A%A2%E8%B4%AD%E7%A7%92%E6%9D%80.png",
        url: "/pages/seckill/index",
      },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: '首页'
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
    
  },
})
