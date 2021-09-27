import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Post() {
    const history = useHistory();
    const elementRef = useRef();

    const [ tweetContent, setTweetContent ] = useState('');
    const [ numChars, setNumChars ] = useState(0);

    useEffect(() => {
        elementRef.current.focus();
    }, []);

    const postTweet = () => {
        const tweetData = {
            name: "Kennedy Smith",
            profile: "https://thispersondoesnotexist.com/image",
            handle: "kennedy_smith",
            date: "Sept 20 2021",
            tweet: tweetContent,
            tweetImage: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",
            likes: 0,
            liked: false,
            retweets: 0,
        };

        fetch('http://localhost:3002/tweets', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(tweetData),
        })
        .then((data) => {
            console.log('success post data: ', data);
            history.push("/");
        })
        .catch((error) => {
            console.error(error);
        });

    };

    const handleTweetChange = (e) => {
        setTweetContent(e.target.value);
        setNumChars(e.target.value.length);
    }

    return (
        <div className="row">
            <div className="col-sm-8">
                <textarea
                    ref={elementRef}
                    className="form-control"
                    onChange={handleTweetChange}
                    value={tweetContent}
                    rows="3">
                </textarea>
                <span><small>{numChars} characters</small></span>
                <br/>
                <br/>
                <button onClick={postTweet}
                        disabled={ numChars < 10 || numChars > 140 }
                        className="btn btn-primary">Post Tweet</button>
            </div>
        </div>
    )
}