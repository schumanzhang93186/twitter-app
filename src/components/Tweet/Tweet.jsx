import styles from './Tweet.module.css';
import { GlobalContext } from './../../context/GlobalState';

import heartIcon from './../../assets/heart.png';
import { useContext } from 'react';

function Tweet({ index }) {

    const { globalState, incrementLikes, incrementRetweets } = useContext(GlobalContext);
    const { tweets } = globalState;

    const {
        id,
        name,
        profile,
        handle,
        date,
        tweet,
        tweetImage,
        likes,
        liked,
        retweets,
    } = tweets[index];

    const likeClicked = () => {
        incrementLikes(id);
    };

    const retweetClicked = () => {
        incrementRetweets(id);
    };

    return (
        <div className={`card ${styles.tcard}`}>

            <div className="row">
                <div className={`col-sm-2 ${styles["profile-section"]}`}>
                    <div className={styles.profile} style={{ backgroundImage: `url(${profile})` }}>
                    </div>

                </div>
                <div className="col-sm-10">
                    <div>
                        <small className={styles["small-text"]}>{name}</small>
                        <small className={styles["handle-text"]}>@{handle}</small>
                        <small className={styles["date-text"]}>{date}</small>
                    </div>
                    <div>
                        <p className={styles["tweet-text"]}>{tweet}</p>
                    </div>
                    <div>
                        <img className={styles["tweet-image"]} src={tweetImage} alt="" />
                    </div>
                    <div>
                        <img onClick={likeClicked} className={ (liked) ? styles["heart-icon-liked"]: styles["heart-icon"] } src={heartIcon} alt="" />
                        <small className={styles["like-text"]}>{likes}</small>

                        <i onClick={retweetClicked} className={`fa fa-retweet ${styles.retweet}`}></i>
                        <small className={styles["like-text"]}>{retweets}</small>
                    </div>

                </div>
            </div>

        </div>
    );
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