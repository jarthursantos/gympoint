import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import navigation from './navigation/reducer';

export default combineReducers({
  auth,
  user,
  navigation,
});
