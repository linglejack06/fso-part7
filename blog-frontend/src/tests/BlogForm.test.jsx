import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../components/BlogForm';

let container;
let addBlog;
beforeEach(() => {
  addBlog = jest.fn();
  const user = { name: 'test' }
  container = render(<BlogForm user={user} addBlog={addBlog} />).container;
})
test('form elements are rendered', () => {
  const inputContainers = container.querySelectorAll('.input-container');
  expect(inputContainers).toHaveLength(3);
})
test('submit handler is called with params', async () => {
  const user = userEvent.setup();
  const title = container.querySelector('#title');
  const author = container.querySelector('#author');
  const url = container.querySelector('#url');
  await user.type(title, 'test title');
  await user.type(author, 'test author');
  await user.type(url, 'https://www.testurl.com');
  const submit = container.querySelector('.submit-btn');
  await user.click(submit);
  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: 'test title',
    author: 'test author',
    url: 'https://www.testurl.com',
  })
})