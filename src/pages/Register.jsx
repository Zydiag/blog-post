import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import loader from '../assets/loading.svg';
import { updateProfile } from 'firebase/auth';
import { auth } from '../auth';
import { FcGoogle } from 'react-icons/fc';
export const Register = () => {
  const navigate = useNavigate();
  const { signUp, verifyEmail, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      await signUp(name, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      await verifyEmail();
      // console.log(await verifyEmail());

      if (currentUser?.emailVerified === true) {
        setLoading(false);
        navigate('/');
      } else {
        setLoading(false);
        navigate('/verify-email');
      }
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }

    e.target.reset();
  };
  return (
    <div className="flex justify-center items-center h-screen dark:bg-zinc-900 dark:text-white">
      {loading ? (
        // <p>Loading...</p>
        <img src={loader} alt="" />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-96 gap-5 border-2 py-5 px-8 rounded-lg shadow-lg dark:border-gray-400"
        >
          <label htmlFor="Name">
            Name
            <input
              name="name"
              className="border-[1px] border-gray-400 rounded mt-2 py-1 px-2 bg-transparent w-full"
              type="text"
            />
          </label>
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
              Something went wrong
            </p>
          )}
          {/* <Button text="Register" /> */}

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
