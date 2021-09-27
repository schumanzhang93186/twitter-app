import React, { createContext, useReducer } from 'react';

const initialState = {
    tweets: [],
    profile: {},
    users: [],
}

export const GlobalContext = createContext(initialState);

// reducer, immutably change state
// state here is like previous state
// action and action.type, action.payload
function appReducer(state, action) {
    switch(action.type) {
        case "REFRESH_TWEETS":
            console.log("REFRESH_TWEETS");
            return {
                ...state,
                tweets: action.payload,
            }
        case "INCREMENT_LIKES":
            console.log("INCREMENT_LIKES");
            return {
                ...state,
                tweets: state.tweets.map((tweet) => (tweet.id === action.payload) ? {
                    ...tweet,
                    likes: (!tweet.liked) ? tweet.likes + 1 : tweet.likes - 1,
                    liked: !tweet.liked,
                } : tweet)
            }
        case "INCREMENT_RETWEETS":
            console.log("INCREMENT_RETWEETS");
            return {
                ...state,
                tweets: state.tweets.map((tweet) => (tweet.id === action.payload) ? {
                    ...tweet,
                    retweets: tweet.retweets + 1,
                } : tweet)
            }
        case "FIND_TWEET":
            console.log("FIND_TWEET");
            return {
                ...state,
                tweets: state.tweets.filter((tweet) => tweet.tweet.includes(action.payload)),
            }
        case "SORT_TWEET":
            console.log("SORT_TWEET");
            return {
                ...state,
                tweets: state.tweets.sort((a, b) => (action.payload === "likeChecked") ? b.likes - a.likes : b.retweets - a.retweets),
            }
        case "REFRESH_PROFILE":
            console.log("REFRESH_PROFILE");
            return {
                ...state,
                profile: action.payload,
            }
        case "ADD_USER":
            return {
                ...state,
                users: [...state.users, action.payload],
            }
        default:
            return state;
    }
}

// GlobalProvider component
// remember the children props

// This is a Provider component which wraps our other components
export const GlobalProvider = ({ children }) => {

    // useReducer takes a reducer, and initial state
    const [ state, dispatch ] = useReducer(appReducer, initialState);

    // dispatch will be called with an action object

    // further simplified down
    const incrementLikes = (id) => {
        // to update my application level state, you call the dispatch function
        // with a type and payload
        dispatch({
            type: "INCREMENT_LIKES",
            payload: id,
        });
    };

    const incrementRetweets = (id) => {
        dispatch({
            type: "INCREMENT_RETWEETS",
            payload: id,
        });  
    };

    const findMatchingTweet = (searchText) => {
        dispatch({
            type: "FIND_TWEET",
            payload: searchText,
        });
    };

    const onSortingOptionChanged = (option) => {
        dispatch({
            type: "SORT_TWEET",
            payload: option,
        });
    };

    const refreshTweets = (tweets) => {
        dispatch({
            type: "REFRESH_TWEETS",
            payload: tweets,
        });
    };

    const refreshProfile = (profile) => {
        dispatch({
            type: "REFRESH_PROFILE",
            payload: profile,
        });
    };

    const value = { globalState: state, 
            refreshTweets, incrementLikes, incrementRetweets, refreshProfile,
            findMatchingTweet, onSortingOptionChanged };

    // this is how we add methods and properties to the GlobalContext
    return (
        <GlobalContext.Provider value={value}>
            { children }
        </GlobalContext.Provider>
    );
};
