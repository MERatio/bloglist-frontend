import blogService from '../services/blogs';
import commentService from '../services/comments';
import { setNotification } from './notificationReducer';

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_BLOGS':
			return action.data;
		case 'NEW_BLOG':
			return [...state, action.data];
		case 'UPDATE_BLOG':
			return state.map((el) => (el.id !== action.id ? el : action.data));
		case 'DELETE_BLOG':
			return state.filter((el) => el.id !== action.id);
		case 'NEW_COMMENT':
			return state.map((el) =>
				el.id !== action.id
					? el
					: { ...el, comments: [...el.comments, action.data] }
			);
		default:
			return state;
	}
};

export const initBlogs = () => {
	return async (dispatch) => {
		try {
			const blogs = await blogService.getAll();
			dispatch({
				type: 'INIT_BLOGS',
				data: blogs,
			});
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error', 5));
		}
	};
};

export const createBlog = (data) => {
	return async (dispatch) => {
		try {
			const blog = await blogService.create(data);
			dispatch({ type: 'NEW_BLOG', data: blog });
			dispatch(setNotification(`New blog ${blog.title} added`, 'success', 5));
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error', 5));
		}
	};
};

export const updateBlog = (id, data) => {
	return async (dispatch) => {
		try {
			const blog = await blogService.update(id, data);
			dispatch({ type: 'UPDATE_BLOG', id, data: blog });
			dispatch(setNotification(`Blog ${blog.title} updated`, 'success', 5));
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error', 5));
		}
	};
};

export const deleteBlog = (blog) => {
	return async (dispatch) => {
		try {
			await blogService.deleteObject(blog.id);
			dispatch({ type: 'DELETE_BLOG', id: blog.id });
			dispatch(setNotification(`Blog ${blog.title} deleted`, 'success', 5));
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error', 5));
		}
	};
};

export const createComment = (id, data) => {
	return async (dispatch) => {
		try {
			const comment = await commentService.create(id, data);
			dispatch({ type: 'NEW_COMMENT', id, data: comment });
			dispatch(
				setNotification(`New comment ${comment.content} added`, 'success', 5)
			);
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error', 5));
		}
	};
};

export default reducer;
