import React, { useState } from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor'

// 引入编辑器样式
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import MaxLength from 'braft-extensions/dist/max-length'
import HeaderId from 'braft-extensions/dist/header-id'
import Markdown from 'braft-extensions/dist/markdown'
import { Card } from 'antd';


const options = {
  defaultValue: 1500, // 指定默认限制数，如不指定则为Infinity(无限)
  includeEditors: ['braft-editor'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  excludeEditors: ['editor-id-2']  // 指定该模块对哪些BraftEditor无效
}

BraftEditor.use(CodeHighlighter(options))
BraftEditor.use(HeaderId(options))
BraftEditor.use(MaxLength(options))
BraftEditor.use(Markdown(options))




export default () =>{
    const [editor,setEditor] = useState(BraftEditor.createEditorState())
    
    function handleChange(e){
        setEditor(e)
    }
    const extendControls = [
        {
          key: 'custom-button',
          type: 'button',
          text: '预览',
          onClick: preview
        }
    ]
    //上传图片方法
    function myUploadFn(param){
        const serverURL = 'http://127.0.0.1:3001/api/common/uploads'
        const xhr = new XMLHttpRequest()
        const fd = new FormData()
        const successFn = () => {
          // 假设服务端直接返回文件上传后的地址
          // 上传成功后调用param.success并传入上传后的文件地址
          param.success({
            url: JSON.parse(xhr.responseText).data.path,
            meta: {
              id: param.id,
              title: param.file.name,
              alt: param.file.name
            //   loop: true, // 指定音视频是否循环播放
            //   autoPlay: true, // 指定音视频是否自动播放
            //   controls: true, // 指定音视频是否显示控制栏
            //   poster: 'http://xxx/xx.png', // 指定视频播放器的封面
            }
          })
        }
      
        const progressFn = (event) => {
          // 上传进度发生变化时调用param.progress
          param.progress(event.loaded / event.total * 100)
        }
      
        const errorFn = (response) => {
          // 上传发生错误时调用param.error
          param.error({
            msg: 'unable to upload.'
          })
        }
      
        xhr.upload.addEventListener("progress", progressFn, false)
        xhr.addEventListener("load", successFn, false)
        xhr.addEventListener("error", errorFn, false)
        xhr.addEventListener("abort", errorFn, false)
      
        fd.append('file', param.file)
        xhr.open('POST', serverURL, true)
        xhr.send(fd)
      
    }
    //预览 方法
    function preview(){
        if (window.previewWindow) {
            window.previewWindow.close()
        }
        window.previewWindow = window.open()
        window.previewWindow.document.write(BuildPreviewHtml())
        window.previewWindow.document.close()
    }
    //预览页面
    function  BuildPreviewHtml () {
        return `
          <!Doctype html>
          <html>
            <head>
              <title>Preview Content</title>
              <style>
                html,body{
                  height: 100%;
                  margin: 0;
                  padding: 0;
                  overflow: auto;
                  background-color: #f1f2f3;
                }
                .container{
                  box-sizing: border-box;
                  width: 1000px;
                  max-width: 100%;
                  min-height: 100%;
                  margin: 0 auto;
                  padding: 30px 20px;
                  overflow: hidden;
                  background-color: #fff;
                  border-right: solid 1px #eee;
                  border-left: solid 1px #eee;
                }
                .container img,
                .container audio,
                .container video{
                  max-width: 100%;
                  height: auto;
                }
                .container p{
                  white-space: pre-wrap;
                  min-height: 1em;
                }
                .container pre{
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-radius: 5px;
                }
                .container blockquote{
                  margin: 0;
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-left: 3px solid #d1d1d1;
                }
              </style>
            </head>
            <body>
              <div class="container">${editor.toHTML()}</div>
            </body>
          </html>
        `
      }
    return (
        <>
            <Card>
                <BraftEditor
                    id="braft-editor"
                    media={{uploadFn: myUploadFn}}
                    value={editor}
                    extendControls={extendControls}
                    onChange={(editorState) =>handleChange(editorState)}
                />  
            </Card>
        </>
    )
}

