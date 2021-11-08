import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		createBlog({ title, author, url });
		setTitle('');
		setAuthor('');
		setUrl('');
	};

	return (
		<form id="blogForm" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="title">title</label>
				<input
					type="text"
					value={title}
					name="title"
					id="title"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				<label htmlFor="author">author</label>
				<input
					type="text"
					value={author}
					name="author"
					id="author"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				<label htmlFor="url">url</label>
				<input
					type="text"
					value={url}
					name="url"
					id="url"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type="submit" data-cy="create-blog-button">
				create
			</button>
		</form>
	);
};

export default BlogForm;
