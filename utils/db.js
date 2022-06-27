//请求数据库
const db = wx.cloud.database();
// 发起网络请求
export const getData = (param) => {
    const promise = new Promise((resolve, reject) => {
        // 传入需要获取的数据表
        db.collection(param.name)
            .get()
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                console.log(err);
            })
    })
    return promise
}