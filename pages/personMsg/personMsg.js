const app = getApp()
Page({
    data: {
        baseUrl:"",
        // 通过跳转携带的id
        id:"",
        // 获取到的用户信息
        personMsg:""
    },
    onLoad: function (options) {
        let baseUrl = app.globalData.baseUrl
        this.setData({
          baseUrl : baseUrl,
          id:options.id
        })
        // 根据传入的id发请求网络请求，查找对应的信息
        wx.cloud.database().collection('persons')
        .doc(this.data.id)
        .get()
        .then(res=>{
            this.setData({
                personMsg:res.data
            })
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },
    call(){
        wx.makePhoneCall({
            phoneNumber: '151112345678', //仅为示例，并非真实的电话号码
            success() {
              console.log('接口调用成功的回调函数')
            },
            fail() {
              console.log('接口调用失败的回调函数')
            },
            complete() {
              console.log('接口调用结束的回调函数（调用成功、失败都会执行）')
            }
          })
      
    },
    onShow(options){
      wx.hideHomeButton();
    }
})