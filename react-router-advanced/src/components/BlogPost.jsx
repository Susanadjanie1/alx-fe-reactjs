import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { postId } = useParams();

  return (
    <div>
      <h2>Blog Post ID: {postId}</h2>
      <p>This is a dynamic route for a blog post with ID: {postId}.</p>
    </div>
  );
};

export default BlogPost;
