import { useState } from 'react';
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const createBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    addBlog(blogObject);
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <Form onSubmit={createBlog}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title: </Form.Label>
        <Form.Control
          placeholder="Title of the blog"
          value={newTitle}
          onChange={handleTitleChange}
        />
        <Form.Label>Author: </Form.Label>
        <Form.Control
          placeholder="Author of the blog"
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        <Form.Label>Url: </Form.Label>
        <Form.Control
          placeholder="Url of the blog"
          value={newUrl}
          onChange={handleUrlChange}
        />
      </Form.Group>
      <Button id="create-button" type="submit">
        create
      </Button>
    </Form>
  );
};

export default BlogForm;
