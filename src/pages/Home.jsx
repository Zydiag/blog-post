import { BlogCard } from '../components/BlogCard';
import { Header } from '../components/Header';
import { postRef } from '../auth';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import loader from '../assets/loading.svg';

export const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const q = query(postRef, orderBy('createdAt', 'desc'));
        onSnapshot(q, (snapshot) => {
          setBlogs(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        // const data = await getDocs(postRef);
        // setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };
    getBlogs();
  }, []);
  return (
    <div className="dark:bg-zinc-900 dark:text-white min-h-[95vh] py-5 ">
      {/* <Header title={'Blogpost'} /> */}
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <img src={loader} alt="" />
        </div>
      ) : (
        <div className="dark:bg-zinc-900 lg:max-w-6xl md:max-w-5xl mx-auto">
          {error && (
            <p className=" my-3 text-red-500 dark:text-red-400">
              Something went wrong
            </p>
          )}
          {blogs.map(({ id, title, body, date, author }) => (
            <BlogCard
              key={id}
              id={id}
              title={title}
              body={body}
              date={date}
              author={author}
            />
          ))}
        </div>
      )}
    </div>
  );
};
