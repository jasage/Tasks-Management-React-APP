import * as types from './../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));
var initState = data? data :[];

var generateID = ()=>{
    function s4(){
        return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4();
};

var myReducer = (state = initState, action)=>{
    var index;
    switch(action.type){
        case types.LIST_ALL:
            return state;

        case types.SAVE_TASK:
            if(action.task.id){
                index =  state.findIndex(task => task.id === action.task.id);
                state[index] = action.task;
            }else{
                action.task.id = generateID();
                state.push(action.task);
            } 
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS:
            index = state.findIndex((task)=>{return task.id===action.id});
            state[index] = {
                ...state[index],
                status : !state[index].status
            };
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];

        case types.DELETE_ITEM:
            index = state.findIndex((task)=>{return task.id===action.id});
            if(index !== -1) state.splice(index, 1);
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];

        default:
            return state;
    }
};
export default myReducer;