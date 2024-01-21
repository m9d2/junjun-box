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
        icon: "/image/grid/accounting.png",
        url: "/pages/accounting/index",
      },
      {
        title: "YSL积分兑换",
        icon: "/image/grid/seckill.png",
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
