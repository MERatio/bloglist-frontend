import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateBlog } from '../reducers/blogsReducer';

const BlogView = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === params.blogId)
  );

  if (!blog) {
    return null;
  }

  const handleLikeBtnClick = () => {
    dispatch(
      updateBlog(blog.id, {
        likes: blog.likes + 1,
      })
    );
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLikeBtnClick}>like</button>
      </div>
      <div>added by {blog.author}</div>
    </div>
  );
};

export default BlogView;
