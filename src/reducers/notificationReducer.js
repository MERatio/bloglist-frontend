let notificationTimeout;

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.message, notifType: action.notifType };
    case 'CLEAR_NOTIFICATION':
      return {};
    default:
      return state;
  }
};

const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' };
};

export const setNotification = (message, notifType, durationInSeconds) => {
  return async (dispatch) => {
    notificationTimeout && clearTimeout(notificationTimeout);
    dispatch({ type: 'SET_NOTIFICATION', message, notifType });
    notificationTimeout = setTimeout(() => {
      dispatch(clearNotification());
    }, durationInSeconds * 1000);
  };
};

export default reducer;
