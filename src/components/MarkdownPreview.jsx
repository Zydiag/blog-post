import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Header } from './Header';

export const MarkdownPreview = ({ data }) => {
  return (
    <div className="flex-1 border-[1px] border-gray-400 dark:border-gray-400 rounded ml-5 min-h-1/2">
      <div className="text-xl py-4 prose dark:prose-invert dark:prose-headings:text-white dark:text-white px-2 max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <Header title={data.title || 'Title'} />
        <ReactMarkdown>{data.body || 'Body'}</ReactMarkdown>
      </div>
    </div>
  );
};
