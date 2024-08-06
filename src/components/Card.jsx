import { FaHeart } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types
const Card = ({ title, liked, onClick = () => {}, children = null }) => {
  return (
    <div className="card mb-3 cursor-pointer" onClick={onClick}>
      <div className="card-body py-2 d-flex align-items-center">
        <div className="flex-grow-1">{title}</div>
        <div className="px-1">{liked}</div>
        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          <FaHeart className="text-red-600" />
        </div>
      </div>
      {children && <div onClick={(e) => e.stopPropagation()}>{children}</div>}
    </div>
  );
};

export default Card;
