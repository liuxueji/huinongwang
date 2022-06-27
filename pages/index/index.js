// 获取应用实例
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper',
      scrollHeight: wx.getSystemInfoSync().windowHeight,
      // 是否显示回到顶部图标
      visual: false,
    }
  },
  data: {
    data:"",
    navs:"",
    articles:"",
    baseUrl:"",
    background: ['cloud://cloud1-4ghzfxru0d680953.636c-cloud1-4ghzfxru0d680953-1309355503/swiper1.jpg', 'cloud://cloud1-4ghzfxru0d680953.636c-cloud1-4ghzfxru0d680953-1309355503/swiper2.jpg', 'cloud://cloud1-4ghzfxru0d680953.636c-cloud1-4ghzfxru0d680953-1309355503/swiper3.jpg'],
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
    /**
   * 实时监听滚动条位置,显示/不显示回到顶部图片
   */
  onPageScroll:function(e) {
    let scrollTop = e.scrollTop
    if (scrollTop < this.data.scrollHeight / 2) {
      this.setData({
        visual: false
      })
    } else {
      this.setData({
        visual: true
      })
    }
  },

  /**
   * 点击回到顶部图片方法
   */
  scrollToTop() {
    if (wx.pageScrollTo) {//判断这个方法是否可用
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },

  onLoad: function (options) {
    console.log(app.globalData.userInfo);
    let that = this
    // 获取全局变量baseUrl，赋值给局部变量
    let baseUrl = app.globalData.baseUrl
    this.setData({
      baseUrl : baseUrl
    })
    console.log(baseUrl);

    // 获得到data数据
    wx.cloud.database().collection('datas')
    .get()
    .then(res=>{
      this.setData({
        data:res.data
      })
    })
    .catch(res=>{
      console.log(err);
    })

    // 排序
    wx.cloud.database().collection('shopWater')
    .limit(3) 
    .get()
    .then(res=>{
      this.setData({
        data:res.data
      })
    })
    .catch(res=>{
      console.log(err);
    })
    
    // 获得到menus数据
    wx.cloud.database().collection('menus')
    .get()
    .then(res=>{
      this.setData({
        menus:res.data
      })
      console.log(res.data);
    })
    .catch(res=>{
      console.log(err);
    })

    // 获得到articles数据
    wx.cloud.database().collection('articles')
    .limit(3)
    .get()
    .then(res=>{
      this.setData({
        articles:res.data
      })
      console.log(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
  }
})
