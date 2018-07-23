import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword:''
        }
    }

    onChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value.toLowerCase()
        })
    }

    search=()=>{
        this.props.onSearch(this.state.keyword);
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input 
                        type="text"
                        name="keyword"
                        className="form-control"
                        placeholder="enter keyword..."
                        onChange={this.onChange}
                    />
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-primary" onClick={this.search}>
                            <span className="fa fa-search mr-5"></span>
                            Search
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
}
const mapDispatchToProps = (dispatch, props) =>{
    return {
        onSearch: (keyword)=>{
            dispatch(actions.searchTask(keyword))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);

