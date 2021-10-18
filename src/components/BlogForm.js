const BlogForm = ({
	title,
	author,
	url,
	setTitle,
	setAuthor,
	setUrl,
	onSubmit,
}) => (
	<form onSubmit={onSubmit}>
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
		<button type="submit">create</button>
	</form>
);

export default BlogForm;
