// pages/test/test.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    localImageUrl: 'http://imgo2o.shikee.com/goods/2019/10/17/201910171144361688.jpg',
    canvasToTempFilePath: ''
  },

  getcav: function () {
    console.log('getcav')
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('red') // 设置填充色为红色
    // 画一个矩形，填充为红色
    // ctx.fillRect(10, 20, 150, 75) // ctx.fillRect(x, y, width, height)

    // 笑脸设置线条颜色和线宽
    ctx.setStrokeStyle('#000a97')
    ctx.setLineWidth(2)

    // // 移动画笔坐标位置，绘制（外部大圆）
    // ctx.moveTo(160, 100)
    // ctx.arc(100, 100, 60, 0, 2 * Math.PI, true)
    // // 移动画笔坐标位置，绘制（嘴巴线条）
    // ctx.moveTo(140, 100)
    // ctx.arc(100, 100, 40, 0, Math.PI, false)
    // //移动画笔坐标位置，绘制（左 右眼圆圈）
    // ctx.moveTo(85, 80)
    // ctx.arc(80, 80, 5, 0, 2 * Math.PI, true)
    // ctx.moveTo(125, 80)
    // ctx.arc(120, 80, 5, 0, 2 * Math.PI, true)

    //font 字体样式
    ctx.font = "bold 22px sans-serif";

    //填充文字
    ctx.fillText("fillTextxxx", 20, 20);
    //描边文本
    ctx.strokeText("strokeText", 20, 40, 100);

    //测量文本宽度
    console.log(ctx.measureText("measureTextxxxxxxxxxx").width)

    //图片
    ctx.drawImage('../../img/1-2.jpg',50,150);
    // wx.chooseImage({
    //   success: function(res){
    //     ctx.drawImage(res.tempFilePaths[0], 20, 150, 150, 100)
    //     ctx.draw()
    //   }
    // })


    // 画出当前路径的边框
    ctx.stroke()
    ctx.draw()
  },

  downimg: function(){
    let _this = this
    wx.canvasToTempFilePath({ //保存图片
      canvasId: 'myCanvas',
      success: function (res) {
        _this.data.canvasToTempFilePath = res.tempFilePath // 返回的图片地址保存到一个全局变量里
        // this.setData({
        //   canvasToTempFilePath: res.tempFilePath
        // })
        console.log('绘制成功',_this.data.canvasToTempFilePath)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getcav()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

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