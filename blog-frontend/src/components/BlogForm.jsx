import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useUserValue } from '../contexts/userContext';
import { displayMessage, useNotificationDispatch } from '../contexts/notificationContext';
import blogService from '../services/blogService';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const user = useUserValue();
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation(blogService.addBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs');
      console.log(blogs);
      queryClient.setQueryData('blogs', blogs.concat(newBlog));
    }
  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'author':
        setAuthor(e.target.value);
        break;
      case 'url':
        setUrl(e.target.value);
        break;
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    newBlogMutation.mutate({ title, author, url });
    displayMessage(notificationDispatch, `Added blog: ${title}`);
    setTitle('');
    setAuthor('');
    setUrl('');
    navigate('/');
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='input-container'>
        <label htmlFor='title'>Title: </label>
        <input value={title} onChange={handleChange} name='title' id='title' />
      </div>
      <div className='input-container'>
        <label htmlFor='author'>Author: </label>
        <input value={author} placeholder={user.name} onChange={handleChange} name='author' id='author' />
      </div>
      <div className='input-container'>
        <label htmlFor='url'>Web Address: </label>
        <input type='url'
          pattern='https://.*'
          placeholder='https://example.org' 
          value={url} 
          onChange={handleChange} 
          name='url' 
          id='url' />
      </div>
      <button className='submit-btn' type='submit'>Add Blog</button>
    </form>
  )
}

export default BlogForm;