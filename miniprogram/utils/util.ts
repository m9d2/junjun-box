export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const request = (params: any) => {
  console.log(params)
  wx.showLoading({
    title:'数据加载中',
 })
  wx.request({
    url: "https://wemember.platform-loreal.cn" + params.data.url,
    data: params.data.data,
    method: params.data.method,
    header: {
      "Content-Type": "application/json",
      "App-Hash": "ysl",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.42(0x18002a31) NetType/WIFI Language/zh_CN",
      "Origin-Type": "miniApp",
      "Authorization": params.data.token,
    },
    success (res) {
      if (res.statusCode != 200 ||res.data.statusCode != 0) {
        wx.showToast({
          title: res.data.message,
          icon: "error"
        })
      } else {
        params.success(res.data.data)
      }
    },
    complete:()=>{
      setTimeout(function (){
        wx.hideLoading()
      }, 200);
   }
  })
}
