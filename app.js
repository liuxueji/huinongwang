// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env:"cloud1-4ghzfxru0d680953"
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    // 存储用户信息，值为unll时，表示未登录
    userInfo: null,
    // 根路径
    baseUrl:"cloud://cloud1-4ghzfxru0d680953.636c-cloud1-4ghzfxru0d680953-1309355503/"
  },
})
