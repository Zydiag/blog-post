import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BiMoon } from 'react-icons/bi';
import { BiSun } from 'react-icons/bi';

export const TopBar = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode')) || false
  );

  // handling the initial dark mode theme
  useEffect(() => {
    document.querySelector('html').classList.toggle('dark', darkMode);
  }, [darkMode]);

  // logout
  const handleLogOut = async () => {
    await logout();
    navigate('/');
    console.log('logout');
  };

  //changing darkMode
  const handleClick = () => {
    document.querySelector('html').classList.toggle('dark');
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
  };

  return (
    <nav className="dark:bg-black border-b-2 border-[#00df9a] h-[4.5rem] ">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center  p-4 text-white">
        <Link to="/" className=" text-3xl font-bold text-[#00df9a]">
          BLOG
        </Link>
        <div className="flex gap-5 items-center">
          <span className="text-xl py-1 shadow-md border-[1px] rounded-md text-black dark:text-white px-2 dark:shadow-zinc-800 dark:border-zinc-800 cursor-pointer">
            {darkMode ? (
              <BiSun onClick={handleClick} />
            ) : (
              <BiMoon onClick={handleClick} />
            )}
          </span>
          {!Object.keys(currentUser).length ? (
            <div className="flex gap-4">
              <Link
                to="/login"
                className=" 
                  text-black 
                  dark:text-white border-[1px] 
                  dark:border-zinc-800 
                  dark:hover:bg-[#00df9a]  
                  dark:hover:text-black 
                  hover:bg-[#00df9a]
                  dark:shadow-zinc-800
                  shadow-md
                  dark:shadow-md
                  hover:duration-200
                  py-1 px-3 
                  rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className=" 
              text-black 
              dark:text-white border-[1px] 
              dark:border-zinc-800 
              dark:hover:bg-[#00df9a]  
              dark:hover:text-black 
              hover:bg-[#00df9a]
              dark:shadow-zinc-800
              shadow-md
              dark:shadow-md
              hover:duration-200
              py-1 px-3 
              rounded-md"
              >
                SignUp
              </Link>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/create"
                className=" py-1 shadow-md border-[1px] 
                rounded-md 
                text-black 
                dark:text-white px-2 
                dark:shadow-zinc-800 
                dark:border-zinc-800
                hover:bg-[#00df9a]
                dark:hover:text-black
                "
              >
                Create
              </Link>
              <button
                onClick={handleLogOut}
                className=" 
              text-black 
              dark:text-white border-[1px] 
              dark:border-zinc-800 
              dark:hover:bg-[#00df9a]  
              dark:hover:text-black 
              hover:bg-[#00df9a]
              dark:shadow-zinc-800
              shadow-md
              dark:shadow-md
              hover:duration-200
              py-1 px-3 
              rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
