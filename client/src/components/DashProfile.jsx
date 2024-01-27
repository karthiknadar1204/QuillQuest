import {useSelector} from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { app } from '../firebase';

const DashProfile = () => {
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };

  return (
    <div className='max-w-lg mx-auto p-3 w-full' >
        <h1 className='my-7 text-center font-semibold text-3xl' >Profile</h1>
        <form action="" className='flex flex-col gap-4'>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' >
                <img src={currentUser.profilePicture} alt="" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
            </div>
            <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        />
            <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={loading || imageFileUploading}
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span 
        // onClick={handleSignout} 
        className='cursor-pointer'>
          Sign Out
        </span>
      </div>
    </div>

  )
}

export default DashProfile