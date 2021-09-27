import React, { useEffect, useState, useContext } from 'react';

import { GlobalContext } from '../context/GlobalState';

import TweetsList from './../components/TweetsList/TweetsList';
import Tweet from './../components/Tweet/Tweet';
import Sort from './../components/Sort/Sort';

import Loading from './../components/Loading';
import Error from './../components/Error';
import Empty from './../components/Empty';

export default function Home() {
    const { globalState, findMatchingTweet, onSortingOptionChanged, refreshTweets } = useContext(GlobalContext);
    const { tweets } = globalState;

    const [ currentStatus, setCurrenStatus ] = useState({
        loading: false,
        error: false,
    });

    useEffect(() => {
        setCurrenStatus({ loading: true });

        fetch('http://localhost:3002/tweets')
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log('success data: ', data);
                setCurrenStatus({ loading: false, error: false });
                refreshTweets(data);
            })
            .catch((error) => {
                console.error(error);
                setCurrenStatus({ loading: false, error: true });
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div className="row">
                    {currentStatus.loading && !currentStatus.error && <Loading />}
                    {!currentStatus.loading && currentStatus.error && <Error />}
                    {!currentStatus.loading && !currentStatus.error &&
                        <>
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                                <TweetsList onSubmitSearch={findMatchingTweet}>
                                    {
                                        (tweets.length > 0) ?
                                            tweets.map((tweet, index) => {
                                                return <Tweet
                                                    index={index}
                                                    key={index} />
                                            }) : <Empty />
                                    }
                                </TweetsList>
                            </div>
                            <div className="col-md-3">
                                <Sort onOptionChange={onSortingOptionChanged} />
                            </div>
                        </>
                    }
                </div>

            </header>
        </div>

    )
}
