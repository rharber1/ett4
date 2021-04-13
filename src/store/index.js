/**
 * State all reducer updates
 */

import {
    SET_SHOW_SIDEBAR,
    SET_LOGGED_IN,
    SET_TIMER_CONNECTED,
    SET_APP_BODY_CONTENT,
    SET_SHOW_NOTIFICATION,
    SET_NOTIFICATION_TEXT,
    SET_DEVICE_ID,
} from './actions';

export const initialState = {
    showSidebar: false,
    loggedIn: false,
    timerConnected: false,
    appBodyContent: '',
    showNotification: true,
    notificationText: '',
    deviceId: process.env.REACT_APP_COMPANY_ACRONYM_UPPER_CASE + "-",
};

export const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_SHOW_SIDEBAR:
            return { ...state, showSidebar: payload };
        case SET_LOGGED_IN:
            return { ...state, loggedIn: payload };
        case SET_TIMER_CONNECTED:
            return { ...state, timerConnected: payload };
        case SET_APP_BODY_CONTENT:
            return { ...state, appBodyContent: payload };
        case SET_SHOW_NOTIFICATION:
            return { ...state, showNotification: payload };
        case SET_NOTIFICATION_TEXT:
            return { ...state, notificationText: payload };
        case SET_DEVICE_ID:
            return { ...state, deviceId: payload };
        default:
            return state;
    }
}
