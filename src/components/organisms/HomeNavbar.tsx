// HomeNavbar.tsx
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UseScroll } from '../hooks/UseScroll';
import axios from 'axios';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const baseURL = import.meta.env.VITE_APP_PUBLIC_API_URL; 
const navigation = [
  { name: 'Dashboard', to: '/Home', current: false },
  { name: 'Layanan Kami', to: '#', current: false },
  { name: 'Informasi Publik', to: '#', current: false },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

type HomeNavbarProps = {
  userName: string | null;
};

const HomeNavbar = ({ userName }: HomeNavbarProps) => {
  const isScrolled = UseScroll(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleProfileClick = () => {
    navigate('/Profil'); 
  };

  const handleLogout = async () => {
    try {
      const response = await axios.delete(`${baseURL}/logout`, { withCredentials: true });
      if (response.status === 200) {
        message.success('Logout berhasil');
        dispatch(logout());
        setTimeout(() => {
           window.location.href = '/Login';
         }, 1000); 
      } else {
        console.error('Error during logout:', response.data);
      }
    } catch (error) {
      console.log(error);
      message.error('Terjadi kesalahan saat logout');
    }
  };

  const formatUserName = (name: string | null) => {
    if (!name) return 'Akun'; 
    
    const nameParts = name.split(' '); 
    const firstName = nameParts[0]; 
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''; 
    
    return nameParts.length > 2 ? `${firstName} ${lastName}` : name; 
  };

  return (
    <Disclosure as="nav" className={`${isScrolled ? 'bg-black/50' : 'bg-transparent'} transition duration-300 w-full fixed z-50`}>
      {({ open }) => (
        <>
          <div className="mx-auto min-w-screen px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 w-[100vw] items-center justify-center sm:items-stretch sm:justify-start">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/assets/img/trashure-logo.png" 
                  alt="Trashure Logo"
                  className="h-10 w-10"
                />
                <b className="text-white"><span className="text-amber-400">| Trash</span>ure</b>
              </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : isScrolled ? 'text-white hover:bg-gray-700' : 'text-white hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                  <Menu.Button className="hover:text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium text-white">
                    <span className="sr-only">Open user menu</span>
                    <span className={`${isScrolled ? 'text-white hover:text-gray-200' : ''} font-bold rounded-md px-3 py-2 text-sm font-medium transition-colors`}>
                      {formatUserName(userName)}
                    </span>
                  </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white/90 rounded-lg shadow-left-bottom-light border border-gray-400 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                     <div className="py-1" role="none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleProfileClick}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm w-full text-left'
                              )}
                            >
                              Profil
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm w-full text-left'
                              )}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default HomeNavbar;
