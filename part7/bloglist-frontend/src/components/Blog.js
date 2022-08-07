import { useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
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

  const update = () => {
    const updatedBlog = {};
    Object.assign(updatedBlog, blog);
    updatedBlog.likes += 1;
    updatedBlog.user = blog.user?.id;
    updateBlog(updatedBlog);
  };

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <Card className="blog" style={blogStyle} >
      <Card.Body>
        <Card.Title>{blog.title} {blog.author}</Card.Title>
        <Card.Text>
          <div style={hideWhenVisible}>
            <Button variant="link" onClick={toggleVisibility}>view</Button>
          </div>
          <div style={showWhenVisible}>
            <Button variant="link" onClick={toggleVisibility}>hide</Button>
            <ListGroup variant="flush">
              <ListGroup.Item>{blog.url}</ListGroup.Item>
              <ListGroup.Item>
                likes {blog.likes} <Button variant="success" onClick={() => update()}>like</Button>
              </ListGroup.Item>
              <ListGroup.Item>{blog?.user?.name ? blog.user.name : blog?.user?.username}</ListGroup.Item>
              {user?.username === blog.user?.username ? (
                <ListGroup.Item><Button variant="danger" onClick={() => remove()}>remove</Button></ListGroup.Item>
              ) : (
                <></>
              )}
            </ListGroup>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Blog;
