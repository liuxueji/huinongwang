const app = getApp()
Page({
    // 注册函数
    register(e){
        // console.log(e);//通过e获取到表单数据
        // 由于传入的数据要和服务器的保持一致，所以需要对数据进行处理
        let registerInfo = e.detail.value;
        // 删除userPwd1
        delete registerInfo.userPwd1

          wx.cloud.database().collection('users')
          .add({
            data:{
              imgUrl:'guanyu1.png',
              nickName:registerInfo.nickname,
              phone:registerInfo.phone,
              realName:registerInfo.name,
              userName:registerInfo.username,
              userPwd:registerInfo.pwd1
            }
          })
          .then(res=>{
            wx.navigateTo({
              url: '/pages/login/login',
            })
            wx.showToast({
                title: '注册成功',
                icon:"success"
              })
          }).catch(err=>{
            wx.showToast({
              title: '注册失败',
              icon:"error"
            })
          })
    },
    onShow(options){
      wx.hideHomeButton();
    }
})