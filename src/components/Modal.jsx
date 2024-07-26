// Modal.js
/* eslint-disable react/prop-types */

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <button
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
