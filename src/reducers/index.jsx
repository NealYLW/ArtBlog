import { combineReducers } from 'redux';
import userReducer from './userReducers';
import paintingsReducer from './paintingsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  paintings: paintingsReducer,
  // Other reducers can go here in the future
});

export default rootReducer;