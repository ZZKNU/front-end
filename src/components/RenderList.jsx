import Card from "./Card";

const RenderList = ({ posts, onClick }) => {
  return posts.map((post) => (
    <Card key={post.id} title={post.title} onClick={() => onClick(post.id)} />
  ));
};

export default RenderList;
