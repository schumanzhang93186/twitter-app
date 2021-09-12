import React from 'react';
import Search from '../Search/Search';

// this is an example of a class component
// that uses es6 class syntax
class TweetsList extends React.Component {

    render() {
        const { children } = this.props;
        const { searchPlaceholder } = this.props;
        const { onSubmitSearch } = this.props;

        return (
            <>
                <Search placeholder={searchPlaceholder} onSubmitSearch={onSubmitSearch}/>
                { children }
            </>
        );
    }
}

// you can use default props, in case no props passed in to this component
TweetsList.defaultProps = {
    searchPlaceholder: "Search popular tweets",
};

export default TweetsList;