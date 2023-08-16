import { Header, Button } from '../components';
import { postRef } from '../auth';
import { addDoc } from 'firebase/firestore';

export const CreatePost = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.title.value);
    const date = new Date();
    await addDoc(postRef, {
      title: e.target.title.value,
      body: e.target.body.value,
      createdAt: date.toLocaleDateString(),
    });
    e.target.reset();
  };
  return (
    <div className="dark:bg-zinc-900 dark:text-white min-h-screen pb-6">
      <Header title={'Create Post'} />
      <div className="dark:bg-zinc-900 lg:max-w-6xl md:max-w-5xl mx-auto my-5">
        <form
          className="flex flex-col gap-5 items-start"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border-[1px] border-gray-400 rounded py-3 px-2 bg-transparent w-full"
          />
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="10"
            placeholder="Body"
            className="border-[1px] border-gray-400 rounded py-3 px-2 bg-transparent w-full"
          ></textarea>
          <Button text="Create" />
        </form>
      </div>
    </div>
  );
};
