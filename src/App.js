import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./compontens/Posts";
import Post from "./compontens/Post";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
