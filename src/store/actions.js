/**
 * State all action constants and reducer functions
 */

export const SET_SHOW_SIDEBAR = 'SET_SHOW_SIDEBAR';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_TIMER_CONNECTED = 'SET_TIMER_CONNECTED';
export const SET_APP_BODY_CONTENT = 'SET_APP_BODY_CONTENT';
export const SET_SHOW_NOTIFICATION = 'SET_SHOW_NOTIFICATION';
export const SET_NOTIFICATION_TEXT = 'SET_NOTIFICATION_TEXT';
export const SET_DEVICE_ID = 'SET_DEVICE_ID';

export const setShowSidebar = (dispatch, payload) =>
    dispatch({ type: SET_SHOW_SIDEBAR, payload });

export const setLoggedIn = (dispatch, payload) =>
    dispatch({ type: SET_LOGGED_IN, payload });

export const setTimerConnected = (dispatch, payload) =>
    dispatch({ type: SET_TIMER_CONNECTED, payload });

export const setAppBodyContent = (dispatch, payload) =>
    dispatch({ type: SET_APP_BODY_CONTENT, payload });

export const setShowNotification = (dispatch, payload) =>
    dispatch({ type: SET_SHOW_NOTIFICATION, payload });

export const setNotificationText = (dispatch, payload) =>
    dispatch({ type: SET_NOTIFICATION_TEXT, payload });

export const setDeviceId = (dispatch, payload) =>
    dispatch({ type: SET_DEVICE_ID, payload });

