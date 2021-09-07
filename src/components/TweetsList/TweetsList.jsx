import React from 'react';
import './TweetsList.css';
import Tweet from './../Tweet/Tweet';

// this is an example of a class component
// that uses es6 class syntax
class TweetsList extends React.Component {

    // javascript generates a default constructor for you
    // you don't need to include in ths case

    // must have a render method that returns the jsx
    render() {
        console.log("props: ", this.props.tweets);
        const tweets = this.props.tweets;
        const heading = this.props.heading;

        return (
            <div className="col-md-4 tweets-container">
                <h3 className="tweet-heading">{heading}</h3>
                {
                    tweets.map((tweet, index) => {
                        return (<Tweet data={tweet} key={index}/>)
                    })
                }
            </div>
        );
    }
}

// you can use default props, in case no props passed in to this component
TweetsList.defaultProps = {
    heading: "Today's most popular tweets",
    tweets: []
};

export default TweetsList;