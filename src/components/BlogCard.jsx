import { Link } from 'react-router-dom';

export const BlogCard = ({ title, id, date, author }) => {
  return (
    <Link to={`/blog/${id}`}>
      <div
        className="px-4 pt-2 pb-6 
        border-2 
        rounded-md 
        relative mt-8 
        shadow-md 
        hover:translate-x-[2px] 
        dark:text-white
        dark:border-zinc-800
        dark:shadow-black
        hover:shadow-none
        transition-transform 
        "
      >
        <span className="md:text-sm text-xs text-gray-400 ">{date}</span>
        <p className="text-xl py-3">{title}</p>
        <span className="absolute right-3 bottom-1 before:content-['-'] before:mr-2 italic text-xs md:text-sm">
          {author}
        </span>
      </div>
    </Link>
  );
};
