import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class Taskform extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            status:true
        }
    }

    componentWillMount(){
        if(this.props.task.id){
            this.setState({
                id:this.props.task.id,
                name:this.props.task.name,
                status:this.props.task.status
            })
        }else{
            this.setState({
                id: '',
                name: '',
                status: true
            })
        }
    }

    componentWillReceiveProps(props){
        if(props && props.task.id){
            this.setState({
                id: props.task.id,
                name: props.task.name,
                status: props.task.status
            })
        }else{
            this.setState({
                id: '',
                name: '',
                status: true
            })
        }
    }

    onClose=()=>{
        this.props.onClose();
    }

    onHandleChange=(event)=>{
        var value;
        switch (event.target.value){
            case 'false':
                value=false;
                break;
            case 'true':
                value=true;
                break;
            default:
                value=event.target.value;
        }
        this.setState({
            [event.target.name]: value
        })
    }

    onHandleSubmit=(event)=>{
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClose();
    };

    render() {
        return (
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            {this.state.id ? 'Update' : 'Add New' }
                            <span className="fa fa-times-circle text-right" onClick={this.onClose}></span>
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onHandleSubmit}>                                
                            <div className="form-group">
                                <label>Name :</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    className="form-control"
                                    onChange={this.onHandleChange}
                                    value={this.state.name} 
                                />
                            </div>
                            <label>Status :</label>
                            <select 
                                name="status" 
                                className="form-control"
                                onChange={this.onHandleChange}
                                value={this.state.status}
                            >
                                <option value={true}>Active</option>
                                <option value={false}>Deactive</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">
                                    <span className="fa fa-plus mr-5"></span>
                                    Save
                                </button>&nbsp;
                                <button type="button" className="btn btn-danger" onClick={this.onClose}>
                                    <span className="fa fa-times mr-5"></span>
                                    Exit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          );
    }
}

const mapStateToProps = (state)=>{
    return {
        task : state.itemEditing
    }
};
const mapDispatchToProps = (dispatch, props)=>{
    return {
        onSaveTask : (task)=>{
            dispatch(actions.saveTask(task))
        },
        onClose: () => {
            dispatch(actions.closeForm())
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Taskform);
