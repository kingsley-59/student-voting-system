import { combineReducers } from 'redux';
import alert from './alertReducer'
import loading from './loadingReducer'
import auth from './authReducer';

export default combineReducers({
    alert,
    loading,
    auth
})