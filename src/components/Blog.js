import React, { useState } from 'react';

const Blog = ({ currentUser, blog, onLikeBtnClick, onDeleteBtnClick }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
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
          likes {blog.likes} <button onClick={onLikeBtnClick}>like</button>
        </div>
        <div>{blog.author}</div>
        {(currentUser.id === blog.user.id || currentUser.id === blog.user) && (
          <button
            style={{ backgroundColor: 'DodgerBlue' }}
            onClick={onDeleteBtnClick}
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
