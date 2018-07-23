import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './displayForm';
import itemEditing from './itemEditing';
import filter from './filter';
import search from './search';
import sort from './sort';

const myReducer = combineReducers({
    tasks,
    isDisplayForm,
    itemEditing,
    filter,
    search,
    sort
});

export default myReducer;