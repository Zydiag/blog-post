export const Button = ({ text }) => {
  return (
    <button className="border-[1px] border-gray-400 px-3 py-1 my-2 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200">
      {text}
    </button>
  );
};
