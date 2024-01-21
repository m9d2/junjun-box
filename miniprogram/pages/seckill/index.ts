const app = getApp();
var util = require('../../utils/util.js')
Page({
  data: {
    token: "",
    addressJson: [],
    addressArray: [],
    address: "",
    addressId: "",
    showPopup: false,
    nick_name: "",
    currentScoreSum: "",
    goods: [],
    checked: [],
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: 'YSL积分兑换'
    })
  },

  onShow() {
    let that = this
    wx.getStorage({
      key: "ysl_token",
      success: function (res) {
        that.setData({ token: res.data })
        util.request({
          data: { url: '/api/user', method: 'GET', token: res.data, data: '' },
          success: (res: any) => {
            that.setData({
              nick_name: res.nick_name,
              currentScoreSum: res.currentScoreSum
            })
          }
        })

        util.request({
          data: { url: '/api/getGoodsList', method: 'POST', token: res.data, data: '{"type": 1,"apiListId": 3,"goods_num": 200}' },
          success: (res: any) => {
            that.setData({
              goods: res[0].list,
            })
          }
        })
      }
    })
    wx.getStorage({
      key: "address",
      success: function (res) {
        that.setData({ address: res.data })
      }
    })
    wx.getStorage({
      key: "address_id",
      success: function (res) {
        that.setData({ addressId: res.data })
      }
    })
    wx.getStorage({
      key: "checked",
      success: function (res) {
        that.setData({ checked: res.data })
      }
    })
  },

  onPullDownRefresh() {
    console.log("下拉刷新");
    let that = this
    util.request({
      data: { url: '/api/user', method: 'GET', token: this.data.token, data: '' },
      success: (res: any) => {
        that.setData({
          nick_name: res.nick_name,
          currentScoreSum: res.currentScoreSum
        })
      }
    })
    util.request({
      data: { url: '/api/getGoodsList', method: 'POST', token: this.data.token, data: '{"type": 1,"apiListId": 3,"goods_num": 200}' },
      success: (res: any) => {
        that.setData({
          goods: res[0].list,
        })
      }
    })
    wx.stopPullDownRefresh({
      success: () => { },
    })
  },

  /**
   * 选择地址
   */
  changeAddress() {
    let that = this
    util.request({
      data: { url: '/api/exchange-gift/address-list?page_size=10&page=1', method: 'GET', token: this.data.token, data: '' },
      success: (res: any) => {
        let addressJson = res.list
        const addressArray = addressJson.map((element: { address: any; }) => element.address)
        that.setData({
          addressJson: addressJson,
          addressArray: addressArray,
          showPopup: true,
        });
      }
    })
  },

  /**
   * 确认选择地址
   * @param res 
   */
  onConfirmAddress(res: any) {
    let address: any = this.data.addressJson[res.detail.index]
    this.setData({
      address: address.address,
      addressId: address.id,
      showPopup: false,
    })
    wx.setStorageSync("address", address.address)
    wx.setStorageSync("address_id", address.id)
  },

  /**
   * 取消选择地址
   */
  onCancelAddress() {
    this.setData({ showPopup: false });
  },

  /**
   * 
   * @param event 
   */
  onChangeChecked(event: any) {
    this.setData({
      checked: event.detail,
    });
  },

  toggle(event: any) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
    wx.setStorageSync("checked", this.data.checked)
  },

  noop() { },

  /**
   * 立即兑换
   */
  exchange() {
    let data = {
      address_id: this.data.addressId,
      is_cart: 0,
      is_subscribe: 1,
      product: [] as any[]
    }
    this.data.checked.forEach(element => {
      data.product.push({ sku_id: element, num: 1 })
    })
    util.request({
      data: { url: '/api/exchange-gift/ordinary/order-submit', method: 'POST', token: this.data.token, data: data },
      success: () => {
        wx.showToast({
          title: "兑换成功！",
          icon: "success"
        })
      }
    })
  },
})