import React from 'react';
import './Tweet.css';

import heartIcon from './../../assets/heart.png';

class Tweet extends React.Component {

    // we define a constructor to initialize some state in the component
    constructor(props) {
        super(props);
        // state is completely owned by the component, mutable only within this component
        // props are used to pass data/function back and forth
        this.state = {
            likes: props.data.likes,
        };

        // this.incrementLikes = this.incrementLikes.bind(this);
    }

    /*
    Although when you want to call this.setState or reference anything via this 
    you may get an error or unexpected results because this will not reference 
    what you think it will, it will reference the element that triggered the event.
    */

    /*
    incrementLikes() {
        console.log(this);
    }
    */
    
    incrementLikes = (event) => {
        this.setState({
            likes: this.state.likes + 1,
        });
    }

    render() {
        console.log("props: ", this.props.data);

        // destructing syntax
        const { 
            name, 
            profile,
            handle,
            date,
            tweet,
            tweetImage,
        } = this.props.data;

        const { likes } = this.state;

        return (
            <div className="card">
                
                <div className="row">
                    <div className="col-sm-2 profile-section">
                        <div className="profile" style={{backgroundImage: `url(${profile})`}}>
                        </div>

                    </div>
                    <div className="col-sm-10">
                        <div>
                            <small className="small-text">{name}</small>
                            <small className="handle-text">@{handle}</small>
                            <small className="date-text">{date}</small>
                        </div>
                        <div>   
                            <p className="tweet-text">{tweet}</p>
                        </div>
                        <div>
                            <img className="tweet-image" src={tweetImage}/>
                        </div>
                        <div>
                            <img onClick={this.incrementLikes} className="heart-icon" src={heartIcon}/>
                            <small className="like-text">{likes}</small>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }

}

export default Tweet;


/*
class Foo {
  constructor(name){
    this.name = name
    this.display = this.display.bind(this);
  }
  
  display(){
    console.log(this.name);
  }
}

var foo = new Foo('Saurabh');
foo.display(); // Saurabh

var display = foo.display;
display(); // Saurabh

display loses context
*/