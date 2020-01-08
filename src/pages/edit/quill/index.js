import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card } from "antd";
import axios from '../../../axios'
import api from '../../../axios/api'
const formats = [
  'font',
  'size',
  'align',
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];


export default class Quill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      modules: {
        toolbar: {
          container: [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'align': [false,'center','right','justify'] }],
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],

            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
           
          
            
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
           
        
            ["link", "image", "video"],
            ["clean"]
          ],
          handlers: {
            'image':this.showUploadBox.bind(this),
            'video':this.showUploadBox.bind(this),
            'clean':this.clearContent.bind(this)
          }
        }
      }
    };
  }

 
  showUploadBox(){
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      const fd = new FormData();
      fd.append('file', file);

      axios({
        url:api.uploads,
        method:'post',
        data:fd
      }).then(res =>{
        let quill=this.refs.reactQuillRef.getEditor();//获取到编辑器本身
        const cursorPosition = quill.getSelection().index;//获取当前光标位置
        quill.insertEmbed(cursorPosition, "image",res.path);//插入图片
        quill.setSelection(cursorPosition + 1);//光标位置加1
      })
    }
  }
  changes = e => {
    this.setState({
      content: e
    });
  };
  //清空输入
  clearContent(){
    this.setState({
      content:''
    })
  }
  render() {
    return (
      <Card>
        <ReactQuill
          ref="reactQuillRef"
          value={this.state.content}
          onChange={this.changes}
          modules={this.state.modules}
          formats={formats}
          theme="snow"
        />
        <div>{this.state.content}</div>
      </Card>
    );
  }
}
