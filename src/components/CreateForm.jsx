import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const CreateForm = ({ onSubmit, editing = false, userInfo }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    quoteType: "NONE",
    author: "",
  });
  const { id } = useParams();

  useEffect(() => {
    if (editing && id) {
      console.log(`Fetching data for post with id: ${id}`);
      // TODO: Fetch existing post data and update formData
    } else if (userInfo) {
      setFormData((prevData) => ({
        ...prevData,
        author: userInfo.nickname,
      }));
    }
  }, [editing, id, userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            placeholder="제목을 입력해주세요"
            required
          />
        </div>
        <div>
          <label
            htmlFor="quoteType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            인용 유형
          </label>
          <select
            id="quoteType"
            name="quoteType"
            value={formData.quoteType}
            onChange={handleChange}
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
          >
            <option value="NONE">선택안함</option>
            <option value="BOOK">도서</option>
            <option value="SONG">노래</option>
          </select>
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
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 resize-none"
            placeholder="내용을 입력해주세요"
            rows="6"
            required
          />
          <input type="hidden" name="author" value={formData.author} />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
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
