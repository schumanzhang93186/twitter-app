import React, { Component } from 'react';
import styles from './Search.module.css';

// contains a form and will be a controlled component
class Search extends Component {

    constructor(props) {
        super(props);

        // form values capture in state
        this.state = {
            searchText: "",
            dropdownOption: "Europe",
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('handleSubmit: ', event);
        const { onSubmitSearch } = this.props;
        onSubmitSearch(this.state.searchText);
        this.setState({ searchText: "" });
    };

    handleSearchTextChange = (event) => {
        this.setState({ searchText: event.target.value });
    };

    handleDropdownChange = (event) => {
        this.setState({ dropdownOption: event.target.value });
    };

    render() {

        const { placeholder } = this.props;

        return (
            <div className={`card ${styles.scard}`}>
                <div className="row">
                    <div className="col-sm-10 offset-sm-1">
                        <form onSubmit={this.handleSubmit}>
                            <input className="form-control form-control-lg" 
                                type="text"
                                value={this.state.searchText}
                                onChange={this.handleSearchTextChange}
                                placeholder={placeholder}
                            />
                            <select value={this.state.dropdownOption}
                                    onChange={this.handleDropdownChange}
                                    className={`form-control form-control-lg ${styles.sdropdown}`}>
                                <option value="Europe">Europe</option>
                                <option value="Asia">Asia</option>
                                <option value="Australia">Australia</option>
                            </select>
                            <input type="submit" className="btn btn-primary" value="Search"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;