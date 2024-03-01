import {combineReducers} from 'redux';
import settingSlice from './slice/settingSlice';
import authSlice from './slice/authSlice';
import videoPlaySlice from './slice/videoPlaySlice';

const rootReducer = combineReducers({
  setting: settingSlice.reducer,
  auth: authSlice.reducer,
  videoPlay: videoPlaySlice.reducer,
});

export default rootReducer;
