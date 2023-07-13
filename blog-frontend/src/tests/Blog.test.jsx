//import React from 'react';
//import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

const blog = {
  title: 'test with me',
  author: 'tester',
  url: 'https://www.test.com',
  likes: 0,
}
test('blog renders', () => {
  render(<Blog blog={blog} />);
  const component = screen.getByText('test with me by tester');
  expect(component).toBeDefined();
});
test('blog url and likes are shown when toggled', async () => {
  const user = userEvent.setup();
  const container = render(<Blog blog={blog} />).container;
  const showButton = container.querySelector('.expand-btn');
  await user.click(showButton);
  const url = screen.getByText('https://www.test.com');
  const likes = screen.getByText('Likes 0');
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});
test('like function is called', async () => {
  const user = userEvent.setup();
  const addLike = jest.fn();
  const container = render(<Blog blog={blog} addLike={addLike} />).container;
  const showButton = container.querySelector('.expand-btn');
  await user.click(showButton);
  const likeButton = container.querySelector('.like-btn');
  await user.click(likeButton);
  expect(addLike.mock.calls).toHaveLength(1);
})