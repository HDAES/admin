import React, { useState } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { Card, Button } from 'antd';
const formats = ['header','bold','italic','underline','strike','blockquote','list','bullet','indent','link','image', ]

export default () => {
    const [content,setContent] = useState()
    let searchInput = React.createRef()
    console.log(content)
    const modules = {
        toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
            handlers: {
              image() {
                console.log(123)
              },
            },
          }
    }
    function change(){
        console.log(searchInput.current.state.value)
        setContent(searchInput.current.state.value)
       
    }
    return (
        <Card>
           
            <ReactQuill
                ref={searchInput}
                onChange={(e) =>setContent(e)}
                modules={modules}
                formats={formats}
                theme="snow"
                />
                <input onChange={(e)=>setContent(e.target.value)}></input>
                <Button onClick={()=>console.log(content)}>click</Button>   
        </Card>
    )
}