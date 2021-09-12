import React from 'react';
import styles from './Sort.module.css';

class Filter extends React.Component {

    render() {

        return (
            <div className={`card ${styles.fcard}`}>
                <h6>Sort Tweets</h6>
                <div className={`form-check ${styles.sort}`}>
                    <label className ="form-check-label" htmlFor="exampleRadios1">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                        Sort by most likes
                    </label>
                </div>

                <div className={`form-check ${styles.sort}`}>
                    <label className ="form-check-label" for="exampleRadios2">
                        <input className="form-check-input" type="radio" name="exampleRadios2" id="exampleRadios2" value="option1"/>
                        Sort by most retweets
                    </label>
                </div>


            </div>
        );
    }
}

export default Filter;