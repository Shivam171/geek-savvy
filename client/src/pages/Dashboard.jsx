import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashPosts from '../components/DashPosts';
import DashProfile from '../components/DashProfile';
import DashSidebar from '../components/DashSidebar';
import DashUsers from '../components/DashUsers';

export default function Dashboard() {
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
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === 'profile' && <DashProfile />}
      {/* Posts */}
      {tab === 'posts' && <DashPosts />}
      {/* Users */}
      {tab === 'users' && <DashUsers />}
    </div>
  )
}
