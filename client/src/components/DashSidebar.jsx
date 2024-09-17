import { Sidebar } from 'flowbite-react';
import { 
  HiUser, 
  HiArrowSmRight, 
  HiDocumentText, 
  HiOutlineUserGroup, 
  HiAnnotation, 
  HiChartPie,
  HiMenu,
  HiX
} from 'react-icons/hi';
import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignout = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND+'/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 text-white">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">
          <HiMenu />
        </button>
      </div>
      <div 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-50`}
      >
        <Sidebar className='w-56 h-full'>
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-semibold">QuillQuest</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-2xl">
              <HiX />
            </button>
          </div>
          <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
              {currentUser && currentUser.isAdmin && (
                <Link to='/dashboard?tab=dash'>
                  <Sidebar.Item active={tab === 'dash' || !tab} icon={HiChartPie} as='div'>
                    Dashboard
                  </Sidebar.Item>
                </Link>
              )}
              <Link to='/dashboard?tab=profile'>
                <Sidebar.Item 
                  active={tab === 'profile'} 
                  icon={HiUser} 
                  label={currentUser.isAdmin ? 'Admin' : 'User'} 
                  labelColor='dark' 
                  as='div'
                >
                  Profile
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=posts'>
                <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                  Posts
                </Sidebar.Item>
              </Link>
              {currentUser.isAdmin && (
                <>
                  <Link to='/dashboard?tab=users'>
                    <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as='div'>
                      Users
                    </Sidebar.Item>
                  </Link>
                  <Link to='/dashboard?tab=comments'>
                    <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} as='div'>
                      Comments
                    </Sidebar.Item>
                  </Link>
                </>
              )}
              <Sidebar.Item 
                icon={HiArrowSmRight} 
                className='cursor-pointer' 
                onClick={handleSignout}
              >
                Sign Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </>
  );
}