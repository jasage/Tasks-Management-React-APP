import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Search_Sort from './components/Search_Sort';
import TaskList from './components/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
    
    onAddInfo=()=>{
        if(this.props.itemEditing.id){
            this.props.onOpen();
        }else{
            this.props.onToggleForm();
        } 
        this.props.onClearTask({});
    }

    render() {
        var {isDisplayForm} = this.props;
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Manager</h1>
                    <hr/>
                </div>
                <div className="row">
                    
                    {/* Form */}
                    {isDisplayForm ? <TaskForm /> : ''}
                    
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <button type="button" className="btn btn-primary" onClick={this.onAddInfo}>
                            <span className="fa fa-plus mr-5"></span>&nbsp;
                            Add info
                        </button>
                        
                        {/* Search and Sort */}
                        <Search_Sort />
                        
                        {/* List */}
                        <TaskList />

                    </div>
                </div>
            </div>
          );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing: state.itemEditing
    };
}
const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm())
        },
        onClearTask: (task)=>{
            dispatch(actions.editItem(task))
        },
        onOpen: () => {
            dispatch(actions.openForm())
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
