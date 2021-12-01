import React from 'react';

const BlogForm = ({ onSubmit }) => {
	return (
		<form id="blogForm" onSubmit={onSubmit}>
			<div>
				<label htmlFor="title">title</label>
				<input type="text" name="title" id="title" />
			</div>
			<div>
				<label htmlFor="author">author</label>
				<input type="text" name="author" id="author" />
			</div>
			<div>
				<label htmlFor="url">url</label>
				<input type="text" name="url" id="url" />
			</div>
			<button type="submit" data-cy="create-blog-button">
				create
			</button>
		</form>
	);
};

export default BlogForm;
