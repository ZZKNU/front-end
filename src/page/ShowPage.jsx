import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { getBestQuoteDetail } from "../apis/api";

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

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

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
      <div className="mt-4">
        <button
          className="btn btn-secondary"
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
