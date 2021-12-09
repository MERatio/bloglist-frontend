import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const Blogs = () => {
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  );

  return (
    <table className="table table-striped">
      <tbody>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </tbody>
    </table>
  );
};

export default Blogs;
