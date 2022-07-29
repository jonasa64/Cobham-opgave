import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchData from "./services/apiFetch";

export const Post = () => {
  const [post, setPost] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetchData(`/${id}`);
      setPost(data);
    };

    fetchPost();
  }, [id]);

  return (
    post && (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p>
          By <span>{post.userId}</span>
        </p>
        <p>
          Post number <span>{post.id}</span>
        </p>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    )
  );
};

export default Post;
