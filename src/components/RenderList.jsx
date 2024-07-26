import { useNavigate } from "react-router-dom";
import Card from "./Card";

const RenderList = ({ posts }) => {
  const navigate = useNavigate();
  return posts.map((post) => {
    return (
      <Card
        key={post.id}
        title={post.title}
        onClick={() => navigate(`/list/${post.id}`)}
      ></Card>
    );
  });
};

export default RenderList;
