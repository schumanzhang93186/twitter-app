import React from 'react';
import './App.css';
import TweetsList from './components/TweetsList/TweetsList';
import Tweet from './components/Tweet/Tweet';
import Sort from './components/Sort/Sort';

// this is an example of a functional component
class App extends React.Component {

    // we define a constructor to initialize some state in the component
    constructor(props) {
        super(props);
        // state is completely owned by the component, mutable only within this component
        // props are used to pass data/function back and forth
        this.state = {
            tweets: [
                {
                    id: "001",
                    name: "Jessica",
                    profile: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                    handle: "i_am_jessica",
                    date: "Aug 21, 2021",
                    tweet: "I really like my cake this morning",
                    tweetImage: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                    likes: 20,
                    liked: false,
                    retweets: 203,
                },
                {
                    id: "002",
                    name: "Mark",
                    profile: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80",
                    handle: "mark_smith",
                    date: "Aug 20, 2021",
                    tweet: "One of my favourite cars of all time is a Ferrari, especially THIS red Ferrari, I would buy this right now if I had the $$",
                    tweetImage: "https://images.unsplash.com/photo-1597687228894-111db66403b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1241&q=80",
                    likes: 202,
                    liked: false,
                    retweets: 303,
                },
                {
                    id: "003",
                    name: "Mike",
                    profile: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80",
                    handle: "mikey_now",
                    date: "Aug 22, 2021",
                    tweet: "Can't wait for the pandemic to be over so I can visit one of my favourite places in this world!",
                    tweetImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1022&q=80",
                    likes: 19,
                    liked: true,
                    retweets: 10,
                }
            ]
        };
    }

    incrementLikes = (id) => {
        console.log("incrementLikes: ", id);
        this.setState(prevState => ({
            tweets: prevState.tweets.map((tweet) => (tweet.id === id) ? {
                ...tweet,
                likes: tweet.likes + 1,
                liked: !tweet.liked,
            } : tweet)
        }));
    };

    incrementRetweets = (id) => {
        console.log("incrementRetweets: ", id);
        this.setState(prevState => ({
            tweets: prevState.tweets.map((tweet) => (tweet.id === id) ? {
                ...tweet,
                retweets: tweet.retweets + 1,
            } : tweet)
        }));
    };

    render() {

        const { tweets } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <div className="row">
                        <div className="col-md-4">

                        </div>
                        <div className="col-md-4">
                            <TweetsList>
                                {
                                    tweets.map((tweet) => {
                                        return <Tweet
                                            data={tweet}
                                            onIncrementLikes={this.incrementLikes}
                                            onIncrementRetweets={this.incrementRetweets}
                                            key={tweet.id} />
                                    })
                                }
                            </TweetsList>
                        </div>
                        <div className="col-md-3">
                            <Sort />
                        </div>

                    </div>
                </header>
            </div>
        );
    }
}

export default App;
