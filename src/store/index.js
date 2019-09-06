import { combineReducers } from 'redux';

import user from './user/UserReducer';
import task from './task/TaskReducer';
import project from './project/ProjectReducer';
import system from './system/SystemReducer';

export default combineReducers({
	user,
	system,
	task,
	project,
});
