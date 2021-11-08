import React, { useState } from 'react';

const Blog = ({ user, blog, updateBlog, onDeleteBlogBtnClick }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeBtnClick = () => {
    updateBlog(blog.id, {
      likes: blog.likes + 1,
    });
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} data-cy="blog">
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div className="togglableContent" style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={handleLikeBtnClick}>like</button>
        </div>
        <div>{blog.author}</div>
        {user.username === blog.user.username && (
          <button
            style={{ backgroundColor: 'DodgerBlue' }}
            onClick={onDeleteBlogBtnClick}
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
