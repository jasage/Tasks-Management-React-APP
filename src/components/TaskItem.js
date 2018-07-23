import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends Component {
    deleteItem=()=>{
        this.props.onDeleteItem(this.props.task.id);
        this.props.onClose();
    }
    updateStatus=()=>{
        this.props.onUpdateStatus(this.props.task.id);
    }
    updateItem=()=>{
        this.props.onOpen();
        this.props.onEditItem(this.props.task);
    }

    render() {
        var {task,index} = this.props;
        return (
            <tr>
                <td>{index+1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={task.status ? 'label label-success' : 'label label-danger'}
                        onClick={this.updateStatus}
                    >
                        {task.status ? 'Active' : 'Deactive'}
                    </span>
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning" 
                        onClick={this.updateItem}>
                        <span className="fa fa-pencil-alt mr-5"></span>
                        Edit
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.deleteItem}>
                        <span className="fa fa-trash mr-5"></span>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    };
}
const mapDispatchToProps = (dispatch, props) =>{
    return {
        onUpdateStatus: (id)=>{
            dispatch(actions.updateStatus(id))
        },
        onDeleteItem: (id)=>{
            dispatch(actions.deleteItem(id))
        },
        onClose: () => {
            dispatch(actions.closeForm())
        },
        onOpen: () => {
            dispatch(actions.openForm())
        },
        onEditItem: (task)=>{
            dispatch(actions.editItem(task))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
