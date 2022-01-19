// pages/test/test.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    localImageUrl: 'http://imgo2o.shikee.com/goods/2019/10/17/201910171144361688.jpg',
    iconimg:'https://2019miniapp.atonefestival.com/2021/highlight/icon/cn.png',
    canvasToTempFilePath: ''
  },

  getcav: function () {
    console.log('getcav')
    const ctx = wx.createCanvasContext('myCanvas')
    
    ctx.setFillStyle("#eeeeee"); // 绘制背景
    ctx.fillRect(0, 0,300, 300);
     ctx.setFillStyle('red') // 设置填充色为红色
    ctx.font = "bold 20px sans-serif";   //font 字体样式

    ctx.fillText("fillTextxxx", 20, 40);    //填充文字
   
    ctx.strokeText("strokeText", 20, 60, 100); //描边文本
   
    console.log(ctx.measureText("measureTextxxxxxxxxxx").width)  //测量文本宽度

    //  wx.chooseImage({ //选择图片显示
    //   success: function(res){
    //     ctx.drawImage(res.tempFilePaths[0], 20, 150, 150, 100)
    //   }
    // })

    // let image = new Image()
    // console.log('image',image)

    ctx.fillStyle = ctx.createPattern(this.data.iconimg, 'no-repeat') // 性质相当于css中的background-image
		ctx.fillRect(10, 10, 400, 400) // 最终渲染的位置


  
    // ctx.fillRect(10, 20, 150, 75) // (x, y, width, height)矩形，填充为红色
    // 笑脸设置线条颜色和线宽
    // ctx.setStrokeStyle('#000a97')
    // ctx.setLineWidth(2)
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

    // 画出当前路径的边框
    // ctx.stroke()

    ctx.draw();   // 显示绘制
  },

  downimg: function(){//把canvas画板保存绘制成图片
    let _this = this
    wx.canvasToTempFilePath({ 
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

  saveShareImg: function () {//把canvas画板图片 保存到相册
    let _this = this
    wx.saveImageToPhotosAlbum({
      filePath:  _this.data.canvasToTempFilePath,
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