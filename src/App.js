import React, { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import LogoutBtn from './components/LogoutBtn';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({});
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotification({
        message: `Welcome ${user.name}`,
        type: 'success',
      });
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        type: 'error',
      });
    }
    setTimeout(() => setNotification({}), 5000);
  };

  const handleLogoutBtnClick = () => {
    localStorage.removeItem('user');
    setUser(null);
    setNotification({
      message: `Logged out successfully`,
      type: 'success',
    });
    setTimeout(() => setNotification({}), 5000);
  };

  const createBlog = async (blog) => {
    try {
      const returnedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(returnedBlog));
      setNotification({
        message: `New blog ${returnedBlog.title} added`,
        type: 'success',
      });
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        type: 'error',
      });
    }
    setTimeout(() => setNotification({}), 5000);
  };

  const updateBlog = async (id, newBlogProps) => {
    try {
      const returnedBlog = await blogService.update(id, newBlogProps);
      setBlogs(
        blogs.map((blog) => (blog.id !== returnedBlog.id ? blog : returnedBlog))
      );
      setNotification({
        message: `Blog ${returnedBlog.title} updated`,
        type: 'success',
      });
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        type: 'error',
      });
    }
    setTimeout(() => setNotification({}), 5000);
  };

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    const confirmDeletion = window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
    );
    if (!confirmDeletion) {
      return;
    }
    try {
      await blogService.deleteObject(blogToDelete.id);
      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      setNotification({
        message: `Blog ${blogToDelete.title} deleted`,
        type: 'success',
      });
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        type: 'error',
      });
    }
    setTimeout(() => setNotification({}), 5000);
  };

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogsDescLikes = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <LoginForm
            username={username}
            password={password}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onSubmit={handleLoginFormSubmit}
          />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <LogoutBtn onClick={handleLogoutBtnClick} />
          </p>
          <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
            <h2>create new</h2>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogsDescLikes.map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              updateBlog={updateBlog}
              onDeleteBlogBtnClick={() => deleteBlog(blog.id)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
