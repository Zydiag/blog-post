import { Link } from 'react-router-dom';

export const BlogCard = ({ title, id, createdAt, author }) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="px-4 pt-2 pb-6 border-2 rounded-md relative mt-8 shadow-md hover:shadow-gray-100 hover:translate-x-[2px] transition-transform dark:text-white">
        <span className="text-sm text-gray-400 ">
          {createdAt}
        </span>
        <p className="text-xl py-3">{title}</p>
        <span className="absolute right-3 bottom-1 before:content-['-'] before:mr-2 italic">
          {author}
        </span>
      </div>
    </Link>
  );
};
