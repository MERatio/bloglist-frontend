import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
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
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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

  const handleBlogFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const returnedBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(returnedBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
      setNotification({
        message: `New blog ${returnedBlog.title} added`,
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

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            onSubmit={handleLoginFormSubmit}
          />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <LogoutBtn onClick={handleLogoutBtnClick} />
          </p>
          <h2>create new</h2>
          <BlogForm
            title={title}
            author={author}
            url={url}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            onSubmit={handleBlogFormSubmit}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
