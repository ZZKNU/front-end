import { useNavigate } from "react-router-dom";
import Card from "./Card";

const RenderList = ({ posts }) => {
  const navigate = useNavigate();

  return posts.map((post) => (
    <Card
      key={post.id}
      title={post.title}
      onClick={() => navigate(`/list/${post.id}`)}
    />
  ));
};

export default RenderList;
