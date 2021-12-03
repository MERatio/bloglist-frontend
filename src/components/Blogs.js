import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, deleteBlog } from '../reducers/blogsReducer';
import Blog from './Blog';

const Blogs = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  );
  const currentUser = useSelector((state) => state.currentUser);

  const handleLikeBtnClick = (blog) => {
    dispatch(
      updateBlog(blog.id, {
        likes: blog.likes + 1,
      })
    );
  };

  const handleDeleteBtnClick = (blog) => {
    const confirmDeletion = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (confirmDeletion) {
      dispatch(deleteBlog(blog));
    }
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          currentUser={currentUser}
          blog={blog}
          onLikeBtnClick={() => handleLikeBtnClick(blog)}
          onDeleteBtnClick={() => handleDeleteBtnClick(blog)}
        />
      ))}
    </div>
  );
};

export default Blogs;
