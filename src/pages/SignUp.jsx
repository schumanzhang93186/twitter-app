import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SignUpForm from "../components/SignUpForm/SignUpForm";

import Loading from './../components/Loading';
import Error from './../components/Error';

// explain functional components and side effects
// react hooks used for side effects

export default function SignUp() {
    const history = useHistory();

    const [ quote, setQuote ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    // 1st param a callback
    // 2nd param an array of dependencies to watch, only runs of dependency changes
    // equivalent of componentDidMount
    useEffect(() => {
        // called after every render
        console.log("SignUp: useEffect componentDidMount called");

        setLoading(true);

        fetch('https://quotes.rest/qod?language=en')
            .then(res => res.json())
            .then((data) => {
                console.log('success data: ', data);
                setLoading(false);
                setError(false);
                setQuote(data.contents.quotes[0].quote);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                setError(true);
            });

        // equivalent of componentWillUnmount
        return () => {
            // alert('SignUp component will unmount');
        }
    }, []);

    // call on every render, better not to do this
    useEffect(() => {
        console.log("SignUp: call on every render");
    });

    // equivalent of componentDidUpdate
    useEffect(() => {
        console.log("SignUp: useEffect componentDidUpdate called");
        fetch('http://localhost:3001/quotes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quote }),
        }).then(res => res.json())
          .then(res => console.log(res), err => console.error(err));

    }, [quote]);

    const onSignUp = (profile) => {
        console.log("onSignUp", profile.email);
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ profile }),
        })
        .then(res => res.json())
        .then(res => {
            history.push("/");
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className="row">
                    {loading && !error && <Loading />}
                    {!loading && error && <Error />}
                    {!loading && !error &&
                        <div className="col-md-4 offset-md-4">
                            <SignUpForm quote={quote} onSignUpSubmit={onSignUp}/>
                        </div>
                    }
                </div>
            </header>
        </div>
    )
}