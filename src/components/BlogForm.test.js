import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('calls the event handler it received as props with the right details when a new blog is created', () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const blogForm = component.container.querySelector('#blogForm');
  const titleInput = component.container.querySelector('#title');
  const authorInput = component.container.querySelector('#author');
  const urlInput = component.container.querySelector('#url');

  fireEvent.change(titleInput, {
    target: { value: 'testTitle' },
  });
  fireEvent.change(authorInput, {
    target: { value: 'testAuthor' },
  });
  fireEvent.change(urlInput, {
    target: { value: 'http://example.com' },
  });
  fireEvent.submit(blogForm);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testTitle');
  expect(createBlog.mock.calls[0][0].author).toBe('testAuthor');
  expect(createBlog.mock.calls[0][0].url).toBe('http://example.com');
});
