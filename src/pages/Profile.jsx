import { useEffect, useContext, useState } from "react";

import Post from "../components/Post";
import { GlobalContext } from "../context/GlobalState";

export default function Profile() {

    const { globalState, refreshProfile } = useContext(GlobalContext);
    const { profile } = globalState;

    const [ currentStatus, setCurrenStatus ] = useState({
        loading: false,
        error: false,
    });

    useEffect(() => {
        setCurrenStatus({ loading: true });

        fetch('http://localhost:3002/profile')
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log('success data: ', data);
                setCurrenStatus({ loading: false, error: false });
                refreshProfile(data);
            })
            .catch((error) => {
                console.error(error);
                setCurrenStatus({ loading: false, error: true });
            });

    }, []);

    return (
        <div className="container">
            <div class="row">
                <div className="col-sm-4">
                    <img className="img-fluid" src={profile.image}/>
                </div>
                <div className="col-sm-8">
                    <h4>Name: <strong>{profile.name}</strong></h4>
                    <Post/>
                </div>
            </div>
        </div>
    )

}