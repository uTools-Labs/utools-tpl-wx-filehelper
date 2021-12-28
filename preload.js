window.exports = {
  filehelper: {
    mode: 'none',
    args: {
      enter: (action) => {
        const { type, payload } = action
        window.utools.hideMainWindow()
        const idleUbrowsers = window.utools.getIdleUBrowsers()

        const workUBrowser = window.utools.ubrowser
        if (idleUbrowsers.length === 0) {
          workUBrowser.goto('https://filehelper.weixin.qq.com/')
        } else {
          workUBrowser.show()
        }

        if (type !== 'text') {
          workUBrowser.wait('textarea')
          if (type === 'over') { // 发送文本
            workUBrowser.focus('textarea').paste(payload).wait(300).click('a.chat-send__button')
          } else if (type === 'img') { // 发送图片
            workUBrowser.file('#btnFile', payload)
          } else if (type === 'files') { // 发送文件
            workUBrowser.file('#btnFile', payload.map(x => x.path))
          }
        }

        if (idleUbrowsers.length === 0) {
          workUBrowser.run({
            show: true,
            width: 720,
            height: 680,
            fullscreenable: false,
            maximizable: false
          })
        } else {
          workUBrowser.run(idleUbrowsers[0].id)
        }

        window.utools.outPlugin()
      }
    }
  }
}
