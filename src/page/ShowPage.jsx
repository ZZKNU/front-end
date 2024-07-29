import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";

const ShowPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPost = (id) => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
      setPost(res.data);
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

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex">
          <h1 className="flex-grow-1">{post.title}</h1>
          <div>
            <Link className="btn btn-primary" to={`/list/${id}/edit`}>
              Edit
            </Link>
          </div>
        </div>
        <small className="text-muted">
          Created At: {printDate(post.createdAt)}
        </small>
        <hr />
        <p>{post.body}</p>
      </div>
      <div className="container flex items-center justify-center min-h-screen">
        <button
          className="btn btn-danger"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default ShowPage;
