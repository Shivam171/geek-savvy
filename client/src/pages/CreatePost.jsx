import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../Firebase';

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
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setformData] = useState({});

  const handleUploadImage = (async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      } else {
        setImageUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
          console.log('Upload is ' + progress + '% done');
        }, error => {
          setImageUploadError('Upload Failed! (File must be less than 2MB)');
          setImageUploadProgress(null);
          console.log("Upload Failed!", error);
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setformData({ ...formData, image: downloadURL });
            console.log('File available at', downloadURL);
          });
        });
      }
    } catch (error) {
      setImageUploadError('Upload Failed! (File must be less than 2MB)');
      setImageUploadProgress(null);
      console.log(error);
    }
  })

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
          <FileInput
            type="file"
            accept='image/*'
            className='flex-1'
            disabled={imageUploadProgress}
            onChange={(e) => setFile(e.target.files[0])} />
          <Button onClick={handleUploadImage} type='button' gradientDuoTone={"purpleToBlue"} size='sm' outline>
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img src={formData.image} alt="uploaded image" className='w-full h-72 object-cover rounded-lg' />
        )}
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
