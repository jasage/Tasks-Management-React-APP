import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';


class Search_Sort extends Component {

    render() {

        return (
            <div className="row mt-15">

                {/* Search */}
                <Search/>
                
                {/* Sort */}
                <Sort />

            </div>
          );
    }
}

export default Search_Sort;