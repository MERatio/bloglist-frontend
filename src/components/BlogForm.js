import React from 'react';

const BlogForm = ({ onSubmit }) => {
	return (
		<form id="blogForm" onSubmit={onSubmit}>
			<div className="mb-3">
				<label htmlFor="title">title</label>
				<input type="text" name="title" className="form-control" id="title" />
			</div>
			<div className="mb-3">
				<label htmlFor="author">author</label>
				<input type="text" name="author" className="form-control" id="author" />
			</div>
			<div className="mb-3">
				<label htmlFor="url">url</label>
				<input type="text" name="url" className="form-control" id="url" />
			</div>
			<button
				type="submit"
				className="btn btn-primary"
				data-cy="create-blog-button"
			>
				create
			</button>
		</form>
	);
};

export default BlogForm;
