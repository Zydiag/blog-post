import { BlogCard } from '../components/BlogCard';
import { Header } from '../components/Header';
import { postRef } from '../auth';
import { getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const data = await getDocs(postRef);
      setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBlogs();
  }, []);
  return (
    <div className="dark:bg-zinc-900 dark:text-white min-h-screen pb-5 ">
      <Header title={'Blogpost'} />
      <div className="dark:bg-zinc-900 lg:max-w-6xl md:max-w-5xl mx-auto">
        {blogs.map(({ id, title, body, createdAt }) => (
          <BlogCard key={id} id={id} title={title} body={body} createdAt={createdAt} />
        ))}
      </div>
    </div>
  );
};
