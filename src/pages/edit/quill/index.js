import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card } from "antd";
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image"
];

export default class Quill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"]
          ],
          handlers: {
            'image':this.showUploadBox.bind(this)
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
      console.log(file)
      let url = 'https://cdn2.jianshu.io/assets/default_avatar/4-3397163ecdb3855a0a4139c34a695885.jpg'
      let quill=this.refs.reactQuillRef.getEditor();//获取到编辑器本身
     
        const cursorPosition =quill.getSelection().index;//获取当前光标位置
          console.log(cursorPosition)
          quill.insertEmbed(cursorPosition, "image",url);//插入图片
          quill.setSelection(cursorPosition + 1);//光标位置加1
    }
  }
  changes = e => {
    this.setState({
      content: e
    });
  };

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
