export const Button = ({ text }) => {
  return (
    <button
      className="border-[1px] 
    mt-2 
    px-3 py-1 my-2 
    rounded 
    shadow-sm
    dark:shadow-black
    hover:bg-black 
    hover:text-white 
    dark:hover:bg-white
    dark:border-zinc-800 
    dark:hover:text-black transition-colors duration-200"
    >
      {text}
    </button>
  );
};
