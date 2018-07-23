import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterStatus:-1,
            filterName:''
        }
    }
    onChange=(event)=>{
        var value = event.target.value;
        var name = event.target.name;
        switch(value){
            case '1':
                value = name ==='filterName' ? 1: true;
                break;
            case '0':
                value = name ==='filterName' ? 0: false;
                break;
            case '-1':
                value=-1;
                break;
            default:
            value = value.toLowerCase().trim();
        }
        this.setState({
            [name]:value
        });
        this.props.onFilter({
            name : name === 'filterName' ? value : this.state.filterName,
            status : name === 'filterStatus' ? value : this.state.filterStatus
        });
    }

    render() {
        var {tasks, filter, keyword, sort} = this.props;
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task)=>{return task.name.toLowerCase().includes(filter.name)});
            }
            if(filter.status!==-1){
                tasks = tasks.filter((task)=>{return task.status === filter.status});
            }
        }
        if(keyword){
            tasks = tasks.filter((task)=>{return task.name.toLowerCase().includes(keyword)});
        }
        if(sort.by ==='name'){
            tasks.sort((a,b)=>{
                if(a.name>b.name) return sort.value;
                else if(a.name<b.name) return -(sort.value);
                else return 0;
            })
        }
        if(sort.by ==='status'){
            tasks.sort((a,b)=>{
                if(a.status>b.status) return -sort.value;
                else if(a.status<b.status) return (sort.value);
                else return 0;
            })    
        }
        var elementTasks = tasks.map((task,index)=>{
            return <TaskItem 
                        key={task.id} 
                        index={index}  
                        task={task} 
                    />;
        })
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center">№</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="filterName"
                                        onChange={this.onChange}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control" 
                                        name="filterStatus"
                                        onChange={this.onChange}
                                    >
                                        <option value={-1}>All</option>
                                        <option value={1}>Active</option>
                                        <option value={0}>Deactive</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>

                            {elementTasks}

                        </tbody>
                    </table>
                </div>
            </div>
          );
    }
}

const mapStateToProps = (state)=>{
    return {
        tasks : state.tasks,
        filter: state.filter,
        keyword: state.search,
        sort: state.sort
    }
}
const mapDispatchToProps = (dispatch, props)=>{
    return {
        onFilter: (filter)=>{
            dispatch(actions.filterTask(filter))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskList);
