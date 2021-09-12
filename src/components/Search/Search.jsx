import React, { Component } from 'react';
import styles from './Search.module.css';

// contains a form and will be a controlled component
class Search extends Component {


    render() {

        const { placeholder } = this.props;

        return (
            <div className={`card ${styles.scard}`}>
                <div className="row">
                    <div className="col-sm-10 offset-sm-1">
                        <form>
                            <input className="form-control form-control-lg" type="text" placeholder={placeholder}/>
                            <select className={`form-control form-control-lg ${styles.sdropdown}`}>
                                <option>Selection1</option>
                                <option>Selection2</option>
                                <option>Selection3</option>
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