const app = getApp()
function getData(that){
    // 获取全局变量baseUrl，赋值给局部变量
    let baseUrl = app.globalData.baseUrl
    
    // 获得到articles数据
    wx.cloud.database().collection('articles')
    .limit(6).skip(that.data.pageNum)  // 每页展示6条，that.data.pageNum每次调用函数自增6，实现每次调用数据获取时，都能获取下一页数据
    .get()
    .then(res=>{
      that.setData({
        articles:res.data
      })
      console.log(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
    // 获得到总数据，由于还没写后台，所以再次发送请求
    wx.cloud.database().collection('articles')
    .get()
    .then(res=>{
      that.setData({
        total:res.data.length
      })
    })
}
Page({
    data: {
        articles:[],
        baseUrl:"",
        pageNum:0,
        total:0,
        isData:false,
        isShow:false,
        // 节流阀，只有当请求发起完才能进行下一次请求
        // true表示节流阀打开，可以访问数据
        // false表示节流阀关闭，不能访问数据
        isLoading:true,
        scrollHeight: wx.getSystemInfoSync().windowHeight,
        // 是否显示回到顶部图标
        visual: true,
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

    onLoad: function (options) {
        let that = this
        let baseUrl = app.globalData.baseUrl
        this.setData({
            baseUrl:baseUrl
        })
        getData(that)
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        let that = this
        that.setData({
            articles:[],
            pageNum:1,
            isShow:false,
            isData:false
        })
        // 重新获取第一页数据
        getData(that)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(this.data.isLoading){
            let that = this;
            let baseUrl = that.data.baseUrl;
    
            // 每次上提，页码都需要+5，pageNum+5
            that.setData({
                pageNum:that.data.pageNum + 6,
                // 上拉函数触发，显示加载更多
                isShow:true,
                // 上拉函数触发，节流阀关闭
                isLoading:false
            })
    
            // 判断获取的值与总数是否相同，若相同则将isData=true，并且不发起请求
            if(this.data.total === this.data.articles.length){
                this.setData({
                    isData:true,
                    isShow:false
                })
            }else{
                // 获得到articles数据
                wx.cloud.database().collection('articles')
                .limit(6).skip(this.data.pageNum)
                .get()
                .then(res=>{
                  that.setData({
                    articles:[...that.data.articles,...res.data],
                    isShow:false,
                    isLoading:true
                  })
                  console.log(res.data);
                  console.log(that.data.total,this.data.articles.length);
                })
                .catch(err=>{
                  console.log(err);
                })
            }
        }else{
            return false
        }
    }
})