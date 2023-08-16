import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
import { Button } from '../components';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate('/');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
    e.target.reset();
  };
  return (
    <div className="flex justify-center items-center h-screen dark:bg-zinc-900 dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-96 gap-5 border-2 py-5 px-8 rounded-lg shadow-lg dark:border-gray-400"
      >
        <label htmlFor="Name">
          Name
          <input
            className="border-[1px] border-gray-400 rounded py-1 px-2 bg-transparent w-full"
            type="text"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            className="border-[1px] border-gray-400 rounded py-1 px-2 bg-transparent w-full"
            type="email"
            name="email"
            id=""
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            className="border-[1px] border-gray-400 rounded py-1 px-2 bg-transparent w-full "
            name="password"
            type="password"
          />
        </label>
        <Button text="Register" />
      </form>
    </div>
  );
};
