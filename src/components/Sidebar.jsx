import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BiMenu } from 'react-icons/bi';
import { BiHome } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';
import { BiMoon } from 'react-icons/bi';
import { BiEdit } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import { BiSun } from 'react-icons/bi';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode')) || true
  );

  useEffect(() => {
    document.querySelector('html').classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleLogOut = async () => {
    await logout();
    navigate('/');
    console.log('logout');
  };
  const handleClick = () => {
    document.querySelector('html').classList.toggle('dark');
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
  };
  return (
    <IconContext.Provider
      value={{ className: 'global-class-name cursor-pointer text-2xl' }}
    >
      <div
        className={`flex 
        flex-col justify-between md:h-screen  
        dark:bg-black dark:text-white py-3 px-3
        fixed
        overflow-hidden
        border-r-2
        w-14
        ${menuOpen ? 'w-36 h-screen' : 'w-14 h-10'}
        transition-all
        `}
      >
        <div className="" onClick={() => setMenuOpen(!menuOpen)}>
          <BiMenu />
        </div>
        <div className="flex flex-col gap-5">
          <span className="flex gap-5 w-36">
            <Link to="/">
              <BiHome />
            </Link>
            <p>Home</p>
          </span>
          <span className=" flex gap-5 w-36">
            <Link to="/create">
              <BiEdit />
            </Link>
            <p>Add Post</p>
          </span>
          <span className=" flex gap-5 w-36">
            <BiMoon onClick={handleClick} />
            <p>Theme</p>
          </span>
          {/* <BiSun /> */}
        </div>
        <div className="">
          <span className=" flex gap-5 w-36">
            <BiLogOut onClick={handleLogOut} />
            <p>Log Out</p>
          </span>
        </div>
      </div>
    </IconContext.Provider>
  );
};
