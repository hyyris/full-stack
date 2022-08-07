import { useState, useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const blogFormRef = useRef();

  const sortFn = (a, b) => {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort(sortFn);
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotificationMessage({
        message: 'Wrong credentials',
        error: true,
      });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      const newBlogs = blogs.concat(returnedBlog).sort(sortFn);
      setBlogs(newBlogs);
      blogFormRef.current.toggleVisibility();
      setNotificationMessage({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        error: false,
      });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    });
  };

  const updateBlog = (blogObject) => {
    blogService.update(blogObject).then((returnedBlog) => {
      const newBlogs = blogs
        .map((blog) => (blog.id !== blogObject.id ? blog : returnedBlog))
        .sort(sortFn);
      setBlogs(newBlogs);
      setNotificationMessage({
        message: 'blog updated',
        error: false,
      });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    });
  };

  const removeBlog = (id) => {
    blogService.remove(id).then(() => {
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setNotificationMessage({
        message: 'blog removed',
        error: false,
      });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    });
  };

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </>
  );

  const blogForm = () => (
    <>
      <h2>blogs</h2>
      <p>{user.name} logged-in</p>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
      <br />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </>
  );

  return (
    <div>
      <Notification message={notificationMessage} />
      {user === null ? loginForm() : blogForm()}
    </div>
  );
};

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontStyle: 'italic',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message === null) {
    return null;
  } else if (message.error) {
    notificationStyle.color = 'red';
  }

  return <div style={notificationStyle}>{message.message}</div>;
};

export default App;
