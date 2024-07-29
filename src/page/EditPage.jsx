import { FaPen } from "react-icons/fa";
import CreateForm from "../components/CreateForm";

const EditPage = () => {
  const handleSubmit = (formData) => {
    // function : POST API작성 //
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center">
            <FaPen className="mr-3 text-blue-500" size={36} />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              수정하기
            </span>
          </h1>
          <p className="mt-2 text-xl text-gray-600">임시 코멘트</p>
        </div>
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-3xl">
          <CreateForm onSubmit={handleSubmit} editing={true} />
        </div>
      </div>
    </div>
  );
};

export default EditPage;
