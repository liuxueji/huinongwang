const app = getApp()
 
 
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    syas: [{
        'heSay': '你好，请问你需要咨询什么？',
        'mySay':'你好!'
      }
    ],
    kefu: '/images/kefu.jpg',
    headRight: '',
    // 用户信息
    userInfo:"",
    baseUrl:"cloud://cloud1-4ghzfxru0d680953.636c-cloud1-4ghzfxru0d680953-1309355503/",
    // 接收专家id
    id:'',
    // 专家信息
    personMsg:''
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    }
    // 如果专业页面跳转的，则获取专家名字和头像
    this.setData({
      id:options.id
    })
    // 根据传入的专家id发请求网络请求，查找对应专家的信息
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
 
 
  subInfo: function(e) {
    let that = this
    var obj = {},
    mySay = e.detail.value.says,
    syas=that.data.syas,
    length = syas.length

    wx.request({
        url: 'https://api.tianapi.com/robot/index', 
        method: 'POST', 
        data: {
            key:'5b22a19d841f9876f12ffc68ce74a63a',question:mySay
        }, 
        header: {
            'Content-Type':'application/x-www-form-urlencoded'
        }, 
        success: function (res) {
            if(res.data.code == 200){
                obj.heSay=res.data.newslist[0].reply;
                obj.mySay=mySay;
                syas[length] = obj;
                that.setData({
                    syas:syas
                })
                console.log(that.data.says = '')
            }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    
  },
  clearInfo:function(){
    let that = this
    that.setData({
      syas:[]
    })
  }
 
})