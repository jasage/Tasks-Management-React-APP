import * as types from './../constants/ActionTypes';

var initState = {};

var myReducer = (state = initState, action)=>{
    switch(action.type){
        case types.EDIT_ITEM:
            return action.task;

        default:
            return state;
    }
};
export default myReducer;