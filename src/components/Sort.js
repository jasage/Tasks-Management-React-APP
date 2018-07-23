import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class Sort extends Component {

    onClick=(sortBy,value)=>{
        this.props.onSort({
            by:sortBy,
            value:value
        })
    }

    render() {
        var {sort} = this.props;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button 
                        type="button" 
                        className="btn btn-primary dropdown-toggle"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        Sort by
                        <span className="fa fa-caret-square-down ml-5"></span>
                    </button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={()=>this.onClick('name',1)}>
                            <a role="button" 
                                className={(sort.by==='name'&& sort.value===1) ?'sort_selected':''}
                            >
                             <span className="fa fa-sort-alpha-down pr-5"></span>
                             Name A-Z
                            </a>
                        </li>
                        <li onClick={()=>this.onClick('name',-1)}>
                            <a role="button"
                                className={(sort.by==='name'&& sort.value===-1) ?'sort_selected':''}
                            >
                             <span className="fa fa-sort-alpha-up pr-5"></span>
                             Name Z-A
                            </a>
                        </li>
                        <li className="divider" role="separator"></li>
                        <li onClick={()=>this.onClick('status',1)}>
                            <a role="button"
                                className={(sort.by==='status'&& sort.value===1) ?'sort_selected':''}
                            >
                             Active
                            </a>
                        </li>
                        <li onClick={()=>this.onClick('status',-1)}>
                            <a role="button"
                                className={(sort.by==='status'&& sort.value===-1) ?'sort_selected':''}
                            >
                             Deactive
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
          );
    }
}

const mapStateToProps = state => {
    return {
        sort : state.sort
    };
}
const mapDispatchToProps = (dispatch, props) =>{
    return {
        onSort: (sort)=>{
            dispatch(actions.sortTask(sort))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
