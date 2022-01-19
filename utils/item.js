import regeneratorRuntime from '../../utils/runtime.js' // 引入模块
const app = getApp(),
  api = require('../../service/http.js');
var ctx = null, // 创建canvas对象
    canvasToTempFilePath = null, // 保存最终生成的导出的图片地址
    openStatus = true; // 声明一个全局变量判断是否授权保存到相册

// 获取微信公众号二维码
  getCode: function () {
    return new Promise(function (resolve, reject) {
      api.fetch('/wechat/open/getQRCodeNormal', 'GET').then(res => {
        console.log(res, '获取微信公众号二维码')
        if (res.code == 200) {
          console.log(res.content, 'codeUrl')
          resolve(res.content)
        }
      }).catch(err => {
        console.log(err)
      })
    })
  },

  // 生成海报
  async createCanvasImage() {
    let that = this;
    // 点击生成海报数据埋点
    that.setData({
      generateId: '点击生成海报'
    })
    if (!ctx) {
      let codeUrl = await that.getCode()
      wx.showLoading({
        title: '绘制中...'
      })
      let code = new Promise(function (resolve) {
        wx.getImageInfo({
          src: codeUrl,
          success: function (res) {
            resolve(res.path)
          },
          fail: function (err) {
            console.log(err)
            wx.showToast({
              title: '网络错误请重试',
              icon: 'loading'
            })
          }
        })
      })
      let headImg = new Promise(function (resolve) {
        wx.getImageInfo({
          src: `${app.globalData.baseUrl2}${that.data.currentChildren.headImg}`,
          success: function (res) {
            resolve(res.path)
          },
          fail: function (err) {
            console.log(err)
            wx.showToast({
              title: '网络错误请重试',
              icon: 'loading'
            })
          }
        })
      })

      Promise.all([headImg, code]).then(function (result) {
        const ctx = wx.createCanvasContext('myCanvas')
        console.log(ctx, app.globalData.ratio, 'ctx')
        let canvasWidthPx = 690 * app.globalData.ratio,
          canvasHeightPx = 1085 * app.globalData.ratio,
          avatarurl_width = 60, //绘制的头像宽度
          avatarurl_heigth = 60, //绘制的头像高度
          avatarurl_x = 28, //绘制的头像在画布上的位置
          avatarurl_y = 36, //绘制的头像在画布上的位置
          codeurl_width = 80, //绘制的二维码宽度
          codeurl_heigth = 80, //绘制的二维码高度
          codeurl_x = 588, //绘制的二维码在画布上的位置
          codeurl_y = 984, //绘制的二维码在画布上的位置
          wordNumber = that.data.wordNumber, // 获取总阅读字数
          // nameWidth = ctx.measureText(that.data.wordNumber).width, // 获取总阅读字数的宽度
          // allReading = ((nameWidth + 375) - 325) * 2 + 380;
          // allReading = nameWidth / app.globalData.ratio + 325;
          allReading = 97 / 6 / app.globalData.ratio * wordNumber.toString().length + 325;
        console.log(wordNumber, wordNumber.toString().length, allReading, '获取总阅读字数的宽度')
        ctx.drawImage('/img/study/shareimg.png', 0, 0, 690, 1085)
        ctx.save(); // 先保存状态 已便于画完圆再用
        ctx.beginPath(); //开始绘制
        //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
        ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
        ctx.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
        ctx.drawImage(result[0], avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片

        ctx.restore(); //恢复之前保存的绘图上下文状态 可以继续绘制
        ctx.setFillStyle('#ffffff'); // 文字颜色
        ctx.setFontSize(28); // 文字字号
        ctx.fillText(that.data.currentChildren.name, 103, 78); // 绘制文字

        ctx.font = 'normal bold 44px sans-serif';
        ctx.setFillStyle('#ffffff'); // 文字颜色
        ctx.fillText(wordNumber, 325, 153); // 绘制文字

        ctx.font = 'normal normal 30px sans-serif';
        ctx.setFillStyle('#ffffff')
        ctx.fillText('字', allReading, 150);

        ctx.font = 'normal normal 24px sans-serif';
        ctx.setFillStyle('#ffffff'); // 文字颜色
        ctx.fillText('打败了全国', 26, 190); // 绘制文字

        ctx.font = 'normal normal 24px sans-serif';
        ctx.setFillStyle('#faed15'); // 文字颜色
        ctx.fillText(that.data.percent, 154, 190); // 绘制孩子百分比

        ctx.font = 'normal normal 24px sans-serif';
        ctx.setFillStyle('#ffffff'); // 文字颜色
        ctx.fillText('的小朋友', 205, 190); // 绘制孩子百分比

        ctx.font = 'normal bold 32px sans-serif';
        ctx.setFillStyle('#333333'); // 文字颜色
        ctx.fillText(that.data.singIn, 50, 290); // 签到天数

        ctx.fillText(that.data.reading, 280, 290); // 阅读时长
        ctx.fillText(that.data.reading, 508, 290); // 听书时长

        // 书籍阅读结构
        ctx.font = 'normal normal 28px sans-serif';
        ctx.setFillStyle('#ffffff'); // 文字颜色
        ctx.fillText(that.data.bookInfo[0].count, 260, 510); 
        ctx.fillText(that.data.bookInfo[1].count, 420, 532); 
        ctx.fillText(that.data.bookInfo[2].count, 520, 594); 
        ctx.fillText(that.data.bookInfo[3].count, 515, 710); 
        ctx.fillText(that.data.bookInfo[4].count, 492, 828); 
        ctx.fillText(that.data.bookInfo[5].count, 348, 858); 
        ctx.fillText(that.data.bookInfo[6].count, 212, 828); 
        ctx.fillText(that.data.bookInfo[7].count, 148, 726); 
        ctx.fillText(that.data.bookInfo[8].count, 158, 600); 

        ctx.font = 'normal normal 18px sans-serif';
        ctx.setFillStyle('#ffffff'); // 文字颜色
        ctx.fillText(that.data.bookInfo[0].name, 232, 530); 
        ctx.fillText(that.data.bookInfo[1].name, 394, 552); 
        ctx.fillText(that.data.bookInfo[2].name, 496, 614); 
        ctx.fillText(that.data.bookInfo[3].name, 490, 730); 
        ctx.fillText(that.data.bookInfo[4].name, 466, 850); 
        ctx.fillText(that.data.bookInfo[5].name, 323, 878); 
        ctx.fillText(that.data.bookInfo[6].name, 184, 850); 
        ctx.fillText(that.data.bookInfo[7].name, 117, 746); 
        ctx.fillText(that.data.bookInfo[8].name, 130, 621); 

        ctx.drawImage(result[1], codeurl_x, codeurl_y, codeurl_width, codeurl_heigth); // 绘制头像
        ctx.draw(false, function () {
          // canvas画布转成图片并返回图片地址
          wx.canvasToTempFilePath({
            canvasId: 'myCanvas',
            success: function (res) {
              canvasToTempFilePath = res.tempFilePath
              that.setData({
                showShareImg: true
              })
              console.log(res.tempFilePath, 'canvasToTempFilePath')
              wx.showToast({
                title: '绘制成功',
              })
            },
            fail: function () {
              wx.showToast({
                title: '绘制失败',
              })
            },
            complete: function () {
              wx.hideLoading()
              wx.hideToast()
            }
          })
        })
      })
    }
  },

  // 保存到系统相册
  saveShareImg: function () {
    let that = this;
    // 数据埋点点击保存学情海报
    that.setData({
      saveId: '保存学情海报'
    })
    // 获取用户是否开启用户授权相册
    if (!openStatus) {
      wx.openSetting({
        success: (result) => {
          if (result) {
            if (result.authSetting["scope.writePhotosAlbum"] === true) {
              openStatus = true;
              wx.saveImageToPhotosAlbum({
                filePath: canvasToTempFilePath,
                success() {
                  that.setData({
                    showShareImg: false
                  })
                  wx.showToast({
                    title: '图片保存成功，快去分享到朋友圈吧~',
                    icon: 'none',
                    duration: 2000
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            }
          }
        },
        fail: () => { },
        complete: () => { }
      });
    } else {
      wx.getSetting({
        success(res) {
          // 如果没有则获取授权
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                openStatus = true
                wx.saveImageToPhotosAlbum({
                  filePath: canvasToTempFilePath,
                  success() {
                    that.setData({
                      showShareImg: false
                    })
                    wx.showToast({
                      title: '图片保存成功，快去分享到朋友圈吧~',
                      icon: 'none',
                      duration: 2000
                    })
                  },
                  fail() {
                    wx.showToast({
                      title: '保存失败',
                      icon: 'none'
                    })
                  }
                })
              },
              fail() {
                // 如果用户拒绝过或没有授权，则再次打开授权窗口
                openStatus = false
                console.log('请设置允许访问相册')
                wx.showToast({
                  title: '请设置允许访问相册',
                  icon: 'none'
                })
              }
            })
          } else {
            // 有则直接保存
            openStatus = true
            wx.saveImageToPhotosAlbum({
              filePath: canvasToTempFilePath,
              success() {
                that.setData({
                  showShareImg: false
                })
                wx.showToast({
                  title: '图片保存成功，快去分享到朋友圈吧~',
                  icon: 'none',
                  duration: 2000
                })
              },
              fail() {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
              }
            })
          }
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  },
