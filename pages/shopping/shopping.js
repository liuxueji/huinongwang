// index.js
// 获取应用实例
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  data: {
    shop:"",
    baseUrl:"",
    background: ['swiper11.jpg', 'swiper22.jpg', 'swiper33.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  onLoad: function (options) {
    let baseUrl = app.globalData.baseUrl
    this.setData({
      baseUrl : baseUrl
    })

    // 获得到shop数据
    wx.cloud.database().collection('shopWater')
    .get()
    .then(res=>{
      this.setData({
        shop:res.data
      })
      console.log(res.data);
    })
    .catch(res=>{
      console.log(err);
    })
  },

  // 调用自定义组件
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },
  
  showDialog() {
    this.dialog.showDialog();
    // console.log(this.selectComponent("#dialog"));
  },
  
  //取消事件
  cancel() {
    this.dialog.hideDialog();
    wx.showToast({
      title: '您点击了取消',
      icon:'none'
      })
  },
  //确认事件
  success() {
    this.dialog.hideDialog();
    wx.showToast({
      title: '成功加入购物车',
      icon:'success'
      })
  }
})
