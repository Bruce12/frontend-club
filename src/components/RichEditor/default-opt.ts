import { QuillOptionsStatic } from 'quill'

const config: QuillOptionsStatic = {
  placeholder: '请输入内容',
  debug: false, // process.env.NODE_ENV === 'development',
  theme: 'snow',
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      // ['blockquote', 'code-block'],
      // [{ header: 1 }, { header: 2 }],
      // [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      // [{ direction: 'rtl' }],
      [{ font: [] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ],
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar']
    }
  }
}

export default config
