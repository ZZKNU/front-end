import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { getBestQuoteDetail } from "../apis/api";
import LikeButton from "../components/LikeBtn";

const ShowPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPost = (id) => {
    getBestQuoteDetail(id)
      .then((res) => {
        setPost(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPost(id);
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="container mt-5">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1>{post.title}</h1>
        <Link className="btn btn-primary" to={`/list/${id}/edit`}>
          Edit
        </Link>
      </div>
      글쓴이 : <small className="text-muted">{post.author}</small>
      <hr />
      <p>{post.content}</p>
      <div className="mt-4 d-flex align-items-center">
        <LikeButton challenge_id={id} /> {/* Add LikeButton here */}
        <button
          className="btn btn-secondary ml-3"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ShowPage;
