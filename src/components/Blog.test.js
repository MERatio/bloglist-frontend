import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

let user;
let blog;
let onLikeBtnClick;
let onDeleteBtnClick;
let component;
let togglableDiv;

beforeEach(() => {
  user = {
    username: 'JohnDoe',
    name: 'John Doe',
  };

  blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'http://example.com',
    likes: 1,
    user: user,
  };

  onLikeBtnClick = jest.fn();

  onDeleteBtnClick = jest.fn();

  component = render(
    <Blog
      user={user}
      blog={blog}
      onLikeBtnClick={onLikeBtnClick}
      onDeleteBtnClick={onDeleteBtnClick}
    />
  );

  togglableDiv = component.container.querySelector('.togglableContent');
});

test('renders title and author', () => {
  expect(component.container).toHaveTextContent('testTitle');
  expect(component.container).toHaveTextContent('testAuthor');
});

test('at start url and likes are not displayed', () => {
  expect(togglableDiv).toHaveStyle('display: none');
});

test('url and likes are shown when the button controlling the shown details has been clicked', () => {
  const button = component.getByText('view');
  fireEvent.click(button);

  expect(togglableDiv).not.toHaveStyle('display: none');
});

test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
  const button = component.getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(onLikeBtnClick.mock.calls).toHaveLength(2);
});
