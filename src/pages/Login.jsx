import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import loader from '../assets/loading.svg';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      await login(email, password);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen dark:bg-zinc-900 dark:text-white">
      {loading ? (
        <img src={loader} alt="" />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-96 gap-5 border-2 py-5 px-8 rounded-lg shadow-lg dark:border-gray-400"
        >
          <label htmlFor="email">
            Email
            <input
              className="border-[1px] border-gray-400 rounded mt-2 py-1 px-2 bg-transparent w-full"
              type="email"
              name="email"
              id=""
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className="border-[1px] border-gray-400 rounded mt-2 py-1 px-2 bg-transparent w-full "
              name="password"
              type="password"
            />
          </label>
          {error && (
            <p className="text-red-500 dark:text-red-400">
              Invalid email or password
            </p>
          )}
          <button className="border-[1px] border-gray-400 rounded mt-2 py-1 bg-zinc-100 text-black dark:bg-white dark:text-black hover:bg-white text-center hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-colors duration-200">
            Login
          </button>
          <button className="relative border-[1px] border-gray-400 rounded mt-2 py-1 bg-zinc-100 text-black dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-colors duration-200">
            <span className="">
              <FcGoogle className="text-2xl absolute left-2" />
              SignIn with google
            </span>
          </button>
        </form>
      )}
    </div>
  );
};
