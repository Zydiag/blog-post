import { useState } from 'react';
import { Header, Button, MarkdownPreview } from '.';
import { postRef } from '../auth';
import { addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export const CreatePost = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.title.value);
    console.log(currentUser.displayName);
    const date = new Date();
    setData({});
    await addDoc(postRef, {
      title: e.target.title.value,
      body: e.target.body.value,
      createdAt: date.toLocaleDateString(),
      author: currentUser.displayName,
    });
    e.target.reset();
  };
  return (
    <div className="dark:bg-zinc-900 dark:text-white min-h-screen pb-1">
      <Header title={'Create Post'} />
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
    </div>
  );
};
