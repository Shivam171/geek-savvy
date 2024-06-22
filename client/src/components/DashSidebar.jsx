import { Sidebar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
export default function DashSidebar() {
  const location = useLocation()
  const [tab, setTab] = useState('');
  // Set tab from url
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile" >
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark' as='button'>
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
