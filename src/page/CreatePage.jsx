import CreateForm from "../components/CreateForm";

const CreatePage = () => {
  const handleSubmit = (formData) => {
    // function : POST API작성 //
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          새 글 작성
        </h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <CreateForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
