import { Sidebar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';

export default function DashSidebar() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('');
  // Set tab from url
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: 'POST',
      })
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile" >
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts" >
              <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} labelColor='dark' as='div'>
                Posts
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
