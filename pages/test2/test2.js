// pages/test/test.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    localImageUrl: 'http://imgo2o.shikee.com/goods/2019/10/17/201910171144361688.jpg',
    iconimg: 'https://2019miniapp.atonefestival.com/2021/highlight/icon/cn.png',
    bannrimg: 'https://2019miniapp.atonefestival.com/2021/highlight/banner_kv.jpg',
    canvasToTempFilePath: '',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    AccessToken: '',
    canvas: null
  },

  getcav: function () {
    console.log('getcav')
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        this.data.canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        // 绘制纯色背景
        // ctx.setFillStyle("#eeeeee");
        // ctx.fillRect(0, 10, 400, 500);
        //头像
        let pic = canvas.createImage();
        pic.src = this.data.userInfo.avatarUrl; //可以是本地，也可以是网络图片
        console.log(pic)
        pic.onload = () => {
          //不要用官方示例的图片路径，包括网上在这之前所有的文档/示例里是地址链接的都不要看了，要用image对象！
          ctx.drawImage(pic, 0, 0, 60, 60);
        }
        //名字
        ctx.font = "bold 20px sans-serif";   //font 字体样式
        ctx.fillText(String(this.data.userInfo.nickName), 20, 80);  //填充文字
        ctx.fillText("测试文字测试文字测试文字", 10, 100);    //填充文字

      })
  },

  downimg: function () { //把canvas画板保存绘制成图片
    let _this = this
    wx.canvasToTempFilePath({
      // canvasId: 'myCanvas',
      canvas: this.data.canvas, //（canvas type="2d" 时使用该属性）。
      success: function (res) {
        _this.data.canvasToTempFilePath = res.tempFilePath // 返回的图片地址保存到一个全局变量里
        // this.setData({
        //   canvasToTempFilePath: res.tempFilePath
        // })
        console.log('绘制成功', _this.data.canvasToTempFilePath)
        wx.showToast({
          title: '绘制成功',
        })
      },
      fail: function () {
        wx.showToast({
          title: '绘制失败',
        })
      },
    })
  },

  saveShareImg: function () { //把canvas画板图片 保存到相册
    let _this = this
    wx.saveImageToPhotosAlbum({
      filePath: _this.data.canvasToTempFilePath,
      success() {
        wx.showToast({
          title: '图片保存成功，快去分享到朋友圈吧~',
          icon: 'none',
          duration: 2000
        })
        console.log(_this.data.canvasToTempFilePath)
      },
      fail() {
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
        console.log(_this.data.canvasToTempFilePath)
      }
    })
  },

  getAvatarName: function () { //获取用户名头像

  },

  getwxCode: function () {

  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(res.userInfo)
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    // this.getcav()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})