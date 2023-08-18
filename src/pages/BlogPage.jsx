import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../auth';
import { doc, getDoc } from 'firebase/firestore';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import loader from '../assets/loading.svg';

export const BlogPage = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const getBlog = async () => {
      try {
        setLoading(true)
        const blog = await getDoc(doc(db, 'posts', id));
        setBlog(blog.data());
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    getBlog();
  }, [id]);
  return (
    <div className="dark:bg-zinc-900 dark:text-white min-h-screen pb-6">
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <img src={loader} alt="" />
        </div>
      ) : (
        <div className="dark:bg-zinc-900  lg:max-w-6xl md:max-w-5xl mx-auto py-5 min-h-screen">
          <h1 className="text-4xl py-5">{blog.title}</h1>
          <div className="text-xl py-4 prose dark:prose-invert dark:text-white ">
            <ReactMarkdown>{blog.body}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};
