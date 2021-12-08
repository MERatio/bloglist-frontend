import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateBlog, createComment } from '../reducers/blogsReducer';

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

  const handleCommentFormSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    await dispatch(createComment(blog.id, { content }));
    e.target.reset();
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
      <h3>comments</h3>
      <form onSubmit={handleCommentFormSubmit}>
        <input type="text" name="content" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;
