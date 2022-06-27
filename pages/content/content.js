// 引入富文本解析器
var WxParse = require('../../wxParse/wxParse.js');

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        contents:"",
        baseUrl:"",
        scrollHeight: wx.getSystemInfoSync().windowHeight,
        // 是否显示回到顶部图标
        visual: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id
        let baseUrl = app.globalData.baseUrl
        this.setData({
            baseUrl:baseUrl
        })
        let that = this;
        // 获得到contents数据
        wx.cloud.database().collection('articles')
        .doc(id)
        .get()
        .then(res=>{
        this.setData({
            contents:res.data
        })
        WxParse.wxParse('content' , 'html', res.data.content, this)
        })
        .catch(res=>{
        console.log(err);
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
})