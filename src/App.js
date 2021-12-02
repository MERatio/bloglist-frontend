import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import blogService from './services/blogs';
import { initBlogs, createBlog } from './reducers/blogsReducer';
import { setUser } from './reducers/userReducer';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import LogoutBtn from './components/LogoutBtn';
import BlogForm from './components/BlogForm';
import Blogs from './components/Blogs';
import Users from './components/Users';

const App = () => {
  const user = useSelector((state) => state.user);

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
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  return (
    <div>
      <Notification />
      {!user.username ? (
        <>
          <h2>log in to application</h2>
          <LoginForm />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <LogoutBtn />
          </p>
          <Routes>
            <Route
              exact
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
            <Route
              exact
              path="/users"
              element={
                <div>
                  <h2>Users</h2>
                  <Users />
                </div>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
