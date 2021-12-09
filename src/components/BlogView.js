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
      <div className="mb-3">
        <h2>{blog.title}</h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes{' '}
          <button className="btn btn-primary" onClick={handleLikeBtnClick}>
            like
          </button>
        </div>
        <div>added by {blog.author}</div>
      </div>
      <h3>comments</h3>
      <form onSubmit={handleCommentFormSubmit} className="d-flex col-lg-6 mb-1">
        <input type="text" name="content" className="col-lg-5 me-1" />
        <button type="submit" className="btn btn-primary col-lg-4">
          add comment
        </button>
      </form>
      <div>
        <ul className="list-group">
          {blog.comments.map((comment) => (
            <li key={comment.id} className="list-group-item">
              {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogView;
