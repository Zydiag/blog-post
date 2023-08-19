import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import loader from '../assets/loading.svg';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../auth';
// import { VerifyEmail } from './VerifyEmail';

export const Login = () => {
  const navigate = useNavigate();
  const { login, googleSignIn, verifyEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [resend, setResend] = useState(false);
  const resendLink = async () => {
    setResend(false);
    await verifyEmail();
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await googleSignIn();

      setLoading(false);
      navigate('/');
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    async function checkEmailVerificationAndNavigate() {
      const user = auth.currentUser;
      if (user) {
        await user.reload(); // Refresh user data
        if (user.emailVerified) {
          navigate('/');
        } else {
          setError('Please Verify your email');
        }
      }
    }

    try {
      setError(false);
      setLoading(true);
      await login(email, password);
      await checkEmailVerificationAndNavigate();
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center new-height dark:bg-zinc-900 dark:text-white">
      {loading ? (
        <img src={loader} alt="" />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-96 gap-5 border-2 py-5 px-8 rounded-lg shadow-lg justify-between dark:border-zinc-800 dark:shadow-black"
        >
          <label htmlFor="email">
            Email
            <input
              className="border-[1px]  rounded mt-1 py-1 px-2 bg-transparent w-full dark:border-zinc-700"
              type="email"
              name="email"
              id=""
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className="border-[1px]  rounded mt-1 py-1 px-2 bg-transparent w-full dark:border-zinc-700 "
              name="password"
              type="password"
            />
          </label>
          {resend && (
            <span onClick={resendLink} className="text-left cursor-pointer">
              Resend
            </span>
          )}
          {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
          <button className="border-[1px]  rounded mt-2 py-1 bg-zinc-100 text-black dark:bg-white dark:text-black hover:bg-white text-center hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-colors duration-200">
            Login
          </button>
          {/* <div className='text-center'>or</div>  */}
          <button
            onClick={handleGoogleSignIn}
            className="relative border-[1px]  rounded  py-1 bg-zinc-100 text-black dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-colors duration-200"
          >
            <span className="">
              <FcGoogle className="text-2xl absolute left-2" />
              Sign In with google
            </span>
          </button>
        </form>
      )}
    </div>
  );
};
