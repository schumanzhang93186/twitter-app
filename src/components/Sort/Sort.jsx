import React from 'react';
import styles from './Sort.module.css';

class Filter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: "likeChecked",
        }
    }

    handleOptionChange = (event) => {
        const { onOptionChange } = this.props;

        this.setState({
            selectedOption: event.target.value,
        });

        onOptionChange(event.target.value);
    };

    render() {

        return (
            <div className={`card ${styles.fcard}`}>
                <h6>Sort Tweets</h6>
                <div className={`form-check ${styles.sort}`}>
                    <label className ="form-check-label">
                        <input className="form-check-input" 
                            type="radio" 
                            value="likeChecked"
                            onChange={this.handleOptionChange}
                            checked = {this.state.selectedOption === "likeChecked"}/>
                        Sort by most likes
                    </label>
                </div>

                <div className={`form-check ${styles.sort}`}>
                    <label className ="form-check-label">
                        <input className="form-check-input" 
                            type="radio" 
                            value="retweetChecked"
                            onChange={this.handleOptionChange}
                            checked = {this.state.selectedOption === "retweetChecked"}/>
                        Sort by most retweets
                    </label>
                </div>


            </div>
        );
    }
}

export default Filter;