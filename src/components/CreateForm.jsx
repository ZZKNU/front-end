import { useState } from "react";

const CreateForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 text-xl font-semibold border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
          placeholder="제목을 입력하세요"
          required
        />
      </div>
      <div className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 text-base border-0 focus:outline-none resize-none"
          placeholder="내용을 입력하세요"
          rows="20"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
        >
          글 작성
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
