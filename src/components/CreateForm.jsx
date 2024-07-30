import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateForm = ({ onSubmit, editing = false }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (editing && id) {
      axios
        .get(`http://localhost:3001/posts/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.body);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    }
  }, [editing, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      try {
        await axios.put(`http://localhost:3001/posts/${id}`, {
          title,
          body: content,
          createdAt: new Date().getTime(),
        });
        navigate(`/bestlist`);
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      onSubmit({ title, content });
    }
  };

  const goback = () => {
    navigate(editing ? `/bestlist` : "/alllist");
  };

  return (
    <div>
      <div className="bg-indigo-600 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <FaPen className="mr-2" size={24} />
          {editing ? "글 수정하기" : "새 글 작성"}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            placeholder="제목을 입력해주세요"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 resize-none"
            placeholder="내용을 입력해주세요"
            rows="6"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={goback}
            className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
          >
            {editing ? "수정하기" : "글 발행"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
