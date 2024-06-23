import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create Post</h1>
      <form className='flex flex-col gap-4'>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput placeholder="Title" id="title" type="text" required className='flex-1' />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="c++">C++</option>
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="react">React</option>
            <option value="next">Next</option>
            <option value="github">Github</option>
            <option value="docker">Docker</option>
            <option value="productivity">Productivity</option>
            <option value="other">Other</option>
          </Select>
        </div>
        <div className="flex gap-4 justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept='image/*' className='flex-1' />
          <Button type='button' gradientDuoTone={"purpleToBlue"} size='sm' outline>Upload image</Button>
        </div>
        <ReactQuill
          theme="snow"
          modules={modules}
          placeholder='Write your post'
          className='h-72 mb-16 md:mb-12'
          required
        />
        <Button type='submit' gradientDuoTone={"purpleToPink"}>Publish</Button>
      </form>
    </div>
  )
}
