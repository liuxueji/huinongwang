const app = getApp()
Page({

    loginout(){
        wx.showModal({
          title: '提示',
          content: '您确定要退出登录吗',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定')
              app.globalData.userInfo = null
              wx.redirectTo({
                url: '/pages/login/login',//跳去登录页
              })
            } else {//这里是点击了取消以后
              console.log('用户点击取消')
            }
          }
        })
      },
    data: {
        userInfo:"",
        baseUrl:"cloud://cloud1-4ghzfxru0d680953.636c-cloud1-4ghzfxru0d680953-1309355503/"
    },
    onLoad: function (options) {
        let that = this
        // 判断用户是否登录，就是判断app.globalData.userInfo是否等于null
        let userInfo = app.globalData.userInfo
        if(userInfo == null){
            // 如果用户没有登录，则重定向到登录页面
            wx.redirectTo({
              url: '/pages/login/login',
            })
        }else{
            // 不为null，表示已经登录，获取用户信息并展示
            that.setData({
                userInfo:userInfo
            })
            console.log(this.data.userInfo);
        }
    }
})