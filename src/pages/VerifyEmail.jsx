import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const VerifyEmail = () => {
  const { currentUser,reload } = useAuth();
  return (
    <div className="flex justify-center items-center new-height dark:bg-zinc-900 dark:text-white ">
      <div className="flex flex-col gap-5 max-w-xl border-2 p-8 px-12 rounded-md shadow-md dark:border-zinc-700  dark:shadow-zinc-800">
        <h1 className="text-3xl text-center">Please Verify before Login</h1>
        <p>
          A verify Email has been sent to <span className='font-bold'>{currentUser?.email}</span>{' '}
        </p>
        {/* <p>Please Verify Before Login</p> */}
        {/* <Link className="py-2 px-5 border-[1px] rounded-md" to="/">
          Go to Home
        </Link> */}
        <Link
          className="py-2 px-5 border-[1px] text-center rounded-md shadow-md dark:border-zinc-700 dark:shadow-zinc-800"
          to="/login"
          onClick={reload}
        >
          Login
        </Link>
      </div>
    </div>
  );
};
