import LikeButton from "./LikeBtn";
import ShareBtn from "./ShareBtn";

const Card = ({ title, onClick = () => {}, children = null }) => {
  // event handler : card-body만 눌렀을 때 해당 게시글로 이동//
  // const handleClick = (e) => {
  //   if (
  //     e.target === e.currentTarget ||
  //     e.target.classList.contains("card-body")
  //   ) {
  //     onClick();
  //     console.log("Click")
  //   }
  // };

  return (
    <div className="card mb-3 cursor-pointer" onClick={onClick}>
      <div className="card-body py-2 d-flex align-items-center">
        <div className="flex-grow-1">{title}</div>
        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          <LikeButton />
          <ShareBtn />
        </div>
      </div>
      {children && <div onClick={(e) => e.stopPropagation()}>{children}</div>}
    </div>
  );
};

export default Card;
