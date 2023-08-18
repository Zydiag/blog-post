import { useState } from 'react';
import { Header, Button, MarkdownPreview } from '.';
import { postRef } from '../auth';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loading.svg';

export const CreatePost = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target.title.value);
    // console.log(currentUser.displayName);
    const date = new Date();
    setData({});
    try {
      setLoading(true);
      await addDoc(postRef, {
        title: e.target.title.value,
        body: e.target.body.value,
        createdAt: serverTimestamp(),
        date: date.toLocaleDateString(),
        author: currentUser.displayName,
      });
      setLoading(false);
      e.target.reset();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dark:bg-zinc-900 dark:text-white min-h-screen pb-1">
      <Header title={'Create Post'} />
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <img src={loader} alt="" />
        </div>
      ) : (
        <div className="dark:bg-zinc-900 flex justify-start lg:max-w-6xl md:max-w-xl mx-auto mt-5">
          <form
            className="flex  flex-col flex-1 gap-5 items-start"
            onSubmit={handleSubmit}
            onChange={handleChange}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              className="border-[1px] border-gray-400 rounded py-3 px-2 bg-transparent w-full"
            />
            <textarea
              name="body"
              id="body"
              cols="30"
              rows="25"
              placeholder="Body"
              required
              className="border-[1px] border-gray-400 rounded py-3 px-2 bg-transparent w-full"
            ></textarea>
            <Button text="Create" />
          </form>
          <MarkdownPreview data={data} />
        </div>
      )}
    </div>
  );
};
