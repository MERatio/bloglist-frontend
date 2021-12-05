import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import blogService from './services/blogs';
import { initBlogs, createBlog } from './reducers/blogsReducer';
import { initUsers } from './reducers/usersReducer';
import { setCurrentUser } from './reducers/currentUserReducer';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blogs from './components/Blogs';
import BlogView from './components/BlogView';
import Users from './components/Users';
import UserView from './components/UserView';

const App = () => {
  const currentUser = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const handleBlogFormSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;
    dispatch(createBlog({ title, author, url }));
    e.target.reset();
    blogFormRef.current.toggleVisibility();
  };

  useEffect(() => {
    const currentUserJSON = window.localStorage.getItem('currentUser');
    if (currentUserJSON) {
      const currentUser = JSON.parse(currentUserJSON);
      dispatch(setCurrentUser(currentUser));
      blogService.setToken(currentUser.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());
  }, []);

  return (
    <div>
      {currentUser.username && <Navbar />}
      <Notification />
      {!currentUser.username ? (
        <>
          <h2>log in to application</h2>
          <LoginForm />
        </>
      ) : (
        <>
          <h2>blog app</h2>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
                    <h2>create new</h2>
                    <BlogForm onSubmit={handleBlogFormSubmit} />
                  </Togglable>
                  <Blogs />
                </div>
              }
            />
            <Route path="blogs/:blogId" element={<BlogView />} />
            <Route
              path="users"
              element={
                <div>
                  <h2>Users</h2>
                  <Users />
                </div>
              }
            />
            <Route path="users/:userId" element={<UserView />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
