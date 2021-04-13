//"use strict";
//Component to toggle the Login with Google and Logout of Google buttons
//import React from 'react';
import {GoogleLogin, GoogleLogout} from "react-google-login";
import { useState, useEffect } from 'react'
import { setLoggedIn } from "./store/actions";

export const GoogleLoginControl = (props) =>  {
    // Google login state is kept in App.js with useState()
    // state value is stored in local variable loggedIn
    // function used to modify state is stored in local variable setLoggedIn
    const loggedIn = props.state.loggedIn;
    //const setLoggedIn = props.func;
    const dispatch = props.dispatch
    const [userEmail, setUserEmail] = useStickyState('', 'userEmail');
    const [userName, setUserName] = useStickyState('', 'userName');
    const [userGivenName, setUserGivenName] = useStickyState('', 'userGivenName');
    const [userFamilyName, setUserFamilyName] = useStickyState('', 'userFamilyName');
    const [userGoogleId, setUserGoogleId] = useStickyState('', 'userGoogleId');
    const [userImageUrl, setUserImageUrl] = useStickyState('', 'userImageUrl');
    const [userTokenId, setUserTokenId] = useStickyState('', 'userTokenId');
    const [userAccessToken, setUserAccessToken] = useStickyState('', 'userAccessToken');

    // handler called when we have successfully logged in to our app using Google
    // response holds various Google information which Google has returned to us
    const handleLoginSuccess=(response)=>{

        console.log("Login with Google Success");
        console.log(response);
        // Persist the Google user data returned in response
        console.log("Before PersistData.  response: " + response);
        setUserEmail(response.profileObj.email);
        console.log("In handleLoginSuccess - userEmail: " + userEmail);
        setUserName(response.profileObj.name);
        console.log("In handleLoginSuccess - userName: " + userName);
        setUserGivenName(response.profileObj.givenName);
        console.log("In handleLoginSuccess - userGivenName: " + userGivenName);
        setUserFamilyName(response.profileObj.familyName);
        console.log("In handleLoginSuccess - userFamilyName: " + userFamilyName);
        setUserGoogleId(response.profileObj.googleId);
        console.log("In handleLoginSuccess - userGoogleId: " + userGoogleId);
        setUserImageUrl(response.profileObj.imageUrl);
        console.log("In handleLoginSuccess - userImageUrl: " + userImageUrl);
        setUserTokenId(response.tokenId);
        console.log("In handleLoginSuccess - userTokenId: " + userTokenId);
        setUserAccessToken(response.accessToken);
        console.log("In handleLoginSuccess - userAccessToken: " + userAccessToken);
        console.log("handleLoginSuccess before set - loggedIn state: " + loggedIn);
        // Login with Google was successful, so change state to indicate so
        setLoggedIn( dispatch,true);
    }

    // handler called when we failed to successfully log into our app using Google
    // response holds various Google information which Google has returned to us
    const handleLoginFailure=(response)=>{
        console.log("Login with Google Failure")
        console.log(response);
        console.log("handleLoginFailure before set - loggedIn state: " + loggedIn)
        // Login with Google was unsuccessful, so change state to indicate so
        setLoggedIn(dispatch, false);
    }

    // handler called when we log out from our app using Google
    const handleLogout=()=>{
        console.log("Google logout");
        setUserEmail('');
        console.log("In handleLogout - userEmail: " + userEmail);
        setUserGivenName('');
        setUserName('');
        console.log("In handleLogout - userName: " + userName);
        setUserGivenName('');
        console.log("In handleLogout - userGivenName: " + userGivenName);
        setUserFamilyName('');
        console.log("In handleLogout - userFamilyName: " + userFamilyName);
        setUserGoogleId('');
        console.log("In handleLogout - userGoogleId: " + userGoogleId);
        setUserImageUrl('');
        console.log("In handleLogout - userImageUrl: " + userImageUrl);
        setUserTokenId('');
        console.log("In handleLogout - userTokenId: " + userTokenId);
        setUserAccessToken('');
        console.log("In handleLogout - userAccessToken: " + userAccessToken);
        console.log("handleLogout before set - Provider.loggedIn state: " + loggedIn);
        setLoggedIn( dispatch,false);
    }

    // loggedIn state will determine which Goggle button will be rendered
    let button;
    console.log("Before Goggle Login /out button render.  loggedIn: " + loggedIn);
    if (loggedIn) {
        // Currently logged in so display the logout button
        button = <GoogleLogout
            clientId="1012744290053-0v3r1g3ut7u450oa8lv2j50odkvgvthu.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
        >
        </GoogleLogout>
    } else {
        // Currently logged out so display the login button
        button = <GoogleLogin
            clientId="1012744290053-0v3r1g3ut7u450oa8lv2j50odkvgvthu.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            cookiePolicy={'single_host_origin'}
        />;
    }

    // render the proper button
    return (
        <div>
            {button}
        </div>
    );

}

function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}



export default GoogleLoginControl
