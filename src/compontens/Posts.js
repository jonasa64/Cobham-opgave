import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchData from "./services/apiFetch";
import Pagination from "./Pagination";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [input, setInput] = useState("");

  // Initial fetch of posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await fetchData();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Filter posts
  useEffect(() => {
    const handleKeydown = async (event) => {
      const { keyCode, target } = event;
      if (keyCode === 13) {
        if (target.value === "") {
          alert("Please enter something in the search box");
          return;
        }
        let query = "?";
        if (isNaN(Number(target.value))) {
          query += "title=" + target.value;
        } else {
          query += "userId=" + target.value;
        }
        setLoading(true);
        const data = await fetchData(query);
        setLoading(false);
        setInput("");
        if (data.length === 0) {
          alert("could not find any posts");
          return;
        }
        setPosts(data);
      }
    };

    // Clean up
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [input]);

  // Pagination find number of posts per page
  const indexOfLastPost =
    posts.length === 100 ? currentPage * postsPerPage : posts.length;
  const indexOfFirstPost =
    posts.length === 100 ? indexOfLastPost - postsPerPage : 0;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onChange = ({ target }) => {
    const { value } = target;
    setInput(value);
  };

  if (loading) {
    return <h2>loading...</h2>;
  }

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={onChange}
        placeholder="filter posts"
      />
      {currentPosts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>
            By <span>{post.userId}</span>
          </p>
          <p>
            Post number <span>{post.id}</span>
          </p>
          <Link to={`post/${post.id}`}>View post</Link>
        </div>
      ))}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  );
};

export default Posts;
