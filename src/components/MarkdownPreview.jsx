import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Header } from './Header';

export const MarkdownPreview = ({ data }) => {
  return (
    <div className="flex-1 border-[1px]  dark:border-zinc-400 rounded">
      <div className="text-xl pt-4 prose dark:prose-invert h-full pb-3 dark:prose-headings:text-white dark:text-white px-2 max-h-[80vh] overflow-y-auto overflow-x-hidden">
        <Header title={data.title || 'Title'} />
        <ReactMarkdown>{data.body || 'Body'}</ReactMarkdown>
      </div>
    </div>
  );
};
