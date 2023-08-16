import { Button } from "../components";

export const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="flex justify-center items-center h-screen dark:bg-zinc-900 dark:text-white">
      <form onSubmit={handleSubmit} className="flex flex-col w-96 gap-5 border-2 py-5 px-8 rounded-lg shadow-lg dark:border-gray-400">
        {/* <label htmlFor="Name">
          Name
        <input className="border-[1px] border-gray-400 rounded py-1 px-2 bg-transparent w-full" type="text" />
        </label> */}
        <label htmlFor="email">Email
        <input className="border-[1px] border-gray-400 rounded py-1 px-2 bg-transparent w-full" type="email" name="" id="" />
        </label>
        <label htmlFor="password">Password
        <input className="border-[1px] border-gray-400 rounded py-1 px-2 bg-transparent w-full " type="password" />
        </label>
        <Button text="Login" />
      </form>
    </div>
  );
};
