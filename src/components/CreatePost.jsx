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
    <div className="dark:bg-zinc-900 dark:text-white min-new-height ">
      <Header title={'Create Post'} />
      {loading ? (
        <div className="flex justify-center items-center new-height">
          <img src={loader} alt="" />
        </div>
      ) : (
        // <p></p>
        <div className="dark:bg-zinc-900 flex lg:justify-start lg:items-stretch  lg:max-w-6xl md:max-w-xl lg:mx-auto mt-5 flex-col justify-start  lg:flex-row lg:gap-5 mx-5 gap-10">
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
              className="border-[1px] shadow-sm dark:shadow-black   rounded py-3 px-2 bg-transparent w-full dark:border-zinc-800"
            />
            <textarea
              name="body"
              id="body"
              cols="30"
              rows="20"
              placeholder="Body"
              required
              className="border-[1px] shadow-sm dark:shadow-black  rounded py-3 px-2 bg-transparent w-full dark:border-zinc-800"
            ></textarea>
            <Button text="Create" />
          </form>
          <MarkdownPreview data={data} />
        </div>
      )}
    </div>
  );
};
