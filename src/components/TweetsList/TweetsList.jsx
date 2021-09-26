import React from 'react';
import { useHistory } from 'react-router-dom';
import Search from '../Search/Search';

// this is an example of a class component
// that uses es6 class syntax

export default function TweetsList({ children, searchPlaceholder="Search popular tweets", onSubmitSearch}) {
    const history = useHistory();

    const goToProfilePage = () => {
        history.push('/profile');
    };

    return (
        <>  
            <button onClick={goToProfilePage} className="btn btn-primary">Go to profile</button>
            <Search placeholder={searchPlaceholder} onSubmitSearch={onSubmitSearch}/>
            { children }
        </>
    )
}
