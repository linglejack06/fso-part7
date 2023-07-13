import { useState } from 'react';

const BlogForm = ({ user, addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
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
    addBlog({
      title, author, url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
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