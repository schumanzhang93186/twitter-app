import React from 'react';
import './App.css';

import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>

            </Router>
        );
    }
}

export default App;
