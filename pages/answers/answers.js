const app = getApp()
// pages/consult/consult.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl:"",
        personMsg:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let baseUrl = app.globalData.baseUrl
        this.setData({
          baseUrl : baseUrl
        })
        wx.cloud.database().collection('persons')
        .get()
        .then(res=>{
            this.setData({
                personMsg:res.data
            })
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        })
    }
})