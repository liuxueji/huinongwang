const app = getApp()
import {getData} from '../../utils/db'
Page({
    data: {
        userInfo:""
    },

    // 登录函数
    login(e){
        // console.log(e);//通过e获取到表单数据
        // 获取要提交的用户名和密码，用变量存储
        let userName = e.detail.value.username
        let userPwd = e.detail.value.userpwd

        wx.cloud.database().collection('users')
        .where({
            userName:userName,
            userPwd:userPwd
        })
        .get()
        .then(res=>{
            if(res.data.length>0){
                wx.switchTab({
                url: '/pages/my/my',
                })
                wx.showToast({
                title: '登录成功',
                icon:'success'
                })
                // 本地缓存
                wx.setStorage({
                    key:"userInfo",
                    data:{
                        userName:userName,
                        userPwd:userPwd
                    }
                })
                // 在全局中，存储用户信息
                app.globalData.userInfo = res.data[0]
            }else{
                wx.showToast({
                title: '用户名或密码错误',
                icon:'error'
                })
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    // 跳转到注册页面
    gotoReg(){
        wx.navigateTo({
          url: '/pages/register/register',
        })
    },

    onLoad: function (options) {
        getData({
            name:'users'
        }).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
        let that = this
        // 获取本地缓存数据
        wx.getStorage({
            key:'userInfo',
            success(res){
                that.setData({
                    userInfo:res.data
                })
            }
        })
    },
})