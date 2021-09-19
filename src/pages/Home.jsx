import React from 'react';
import { withRouter } from "react-router-dom";

import TweetsList from './../components/TweetsList/TweetsList';
import Tweet from './../components/Tweet/Tweet';
import Sort from './../components/Sort/Sort';


function Empty() {
    return (
        <div>
            <h1>Empty</h1>
        </div>
    )
}

function Loading() {
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}

function Error() {
    return (
        <div>
            <h1>Error...</h1>
        </div>
    )
}

class Home extends React.Component {

    incrementLikes = (id) => {
        this.setState(prevState => ({
            tweets: prevState.tweets.map((tweet) => (tweet.id === id) ? {
                ...tweet,
                likes: (!tweet.liked) ? tweet.likes + 1 : tweet.likes - 1,
                liked: !tweet.liked,
            } : tweet)
        }));
    };

    incrementRetweets = (id) => {
        this.setState(prevState => ({
            tweets: prevState.tweets.map((tweet) => (tweet.id === id) ? {
                ...tweet,
                retweets: tweet.retweets + 1,
            } : tweet)
        }));
    };

    findMatchingTweet = (searchText) => {
        this.setState(prevState => ({
            tweets: prevState.tweets.filter((tweet) => tweet.tweet.includes(searchText)),
        }));
    };

    onSortingOptionChanged = (option) => {
        this.setState(prevState => ({
            tweets: prevState.tweets.sort((a, b) => (option === "likeChecked") ? b.likes - a.likes : b.retweets - a.retweets),
        }))
    };

    // react lifecyle methods

    /*** Mounting a component
     constructor()
     getDerivedStateFromProps()
     render()
     componentDidMount()
     ***/

    constructor(props) {
        console.log("MOUNTING: constructor called");
        super(props);

        // set up initial state
        this.state = {
            tweets: [],
            loading: false,
            error: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        // called right before rendering the element(s)
        // This is the natural place to set the state object based on the initial props
        // eg. return {favoritecolor: props.favcol };
        console.log("MOUNTING: getDerivedStateFromProps called");
        return state;
    }

    componentDidMount() {
        // make initial API call here
        // run statements that requires that the component is already placed in the DOM
        console.log("MOUNTING: componentDidMount called");

        this.setState({ loading: true });

        fetch('http://localhost:3001/tweets')
            .then(res => res.json())
            .then((data) => {
                console.log('success data: ', data);
                this.setState({ tweets: data, loading: false, error: false });
            })
            .catch((error) => {
                console.error(error);
                this.setState({ loading: false, error: true });
            });
    }


    /*** Updating a component, when state/props changes
     getDerivedStateFromProps()
     shouldComponentUpdate()
     render()
     getSnapshotBeforeUpdate()
     componentDidUpdate()
     ***/

    shouldComponentUpdate() {
        console.log("UPDATING: shouldComponentUpdate");
        // return a Boolean value that specifies whether React should continue with the rendering or not
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("UPDATING: getSnapshotBeforeUpdate", prevProps, prevState);
        return null;
    }

    componentDidUpdate() {
        console.log("UPDATING: componentDidUpdate");
        // triggered after state updates
        // eg logic for a saving function if state has updated
        fetch('http://localhost:3001/snapshots', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        }).then(res => res.json())
          .then(res => console.log(res), err => console.error(err));
    }

    /*** Component Unmounting
    componentWillUnmount()
     ***/

    componentWillUnmount() {
        console.log("UNMOUNTING: componentWillUnmount");
        // called when the component is about to be removed from the DOM
        alert("The component named Home is about to be unmounted.");
    }

    render() {
        const { tweets, loading, error } = this.state;
        console.log("RENDER called: ", this.props);

        return (
            <div className="App">
                <header className="App-header">
                    <div className="row">
                        {loading && !error && <Loading />}
                        {!loading && error && <Error />}
                        {!loading && !error &&
                            <>
                                <div className="col-md-4">
                                </div>
                                <div className="col-md-4">
                                    <TweetsList {...this.props} onSubmitSearch={this.findMatchingTweet}>
                                        {
                                            (tweets.length > 0) ?
                                                tweets.map((tweet) => {
                                                    return <Tweet
                                                        data={tweet}
                                                        onIncrementLikes={this.incrementLikes}
                                                        onIncrementRetweets={this.incrementRetweets}
                                                        key={tweet.id} />
                                                }) : <Empty />
                                        }
                                    </TweetsList>
                                </div>
                                <div className="col-md-3">
                                    <Sort onOptionChange={this.onSortingOptionChanged} />
                                </div>
                            </>
                        }
                    </div>

                </header>
            </div>
        );
    }
}

export default withRouter(Home);