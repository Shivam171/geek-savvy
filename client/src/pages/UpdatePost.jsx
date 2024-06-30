import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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

export default function UpdatePost() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector(state => state.user)
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        } else {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      }
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId])

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
            setFormData({ ...formData, image: downloadURL });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      // console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      } else {
        setPublishError(null);
        navigate(`/posts/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong!');
    }
  }

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl font-semibold text-center my-7'>Update Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            placeholder="Title"
            id="title"
            type="text"
            required
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, title: e.target.value.trim() })}
            value={formData.title}
          />
          <Select
            onChange={
              (e) => setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
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
            onChange={(e) => setFile(e.target.files[0])}
          />
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
          onChange={(value) => {
            setFormData({ ...formData, content: value })
          }}
          value={formData.content}
        />
        <Button type='submit' gradientDuoTone={"purpleToPink"}>Update post</Button>
        {publishError && <Alert className='mt-5' color="failure">{publishError}</Alert>}
      </form>
    </div>
  )
}
