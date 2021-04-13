//"use strict";
// StateManager.js
//import React, {useState, createContext} from 'react';

//const PersistData = () => {
//    const [mode, setMode] = useStickyState('', 'userEmail');
//    const [mode1, setMode1] = useStickyState('', 'userGivenName');
//}
//    const [loggedIn, setLoggedIn] = useState(false);
//    const SetState = (newState) => setLoggedIn(newState);

/*
// createContext returns object with a provider and a consumer component
const ClientContext = createContext({
    loggedIn: false,
    setLoggedIn: (value) => { ClientContext.loggedIn = value },
    userEmail: "",
    setUserEmail: (value) => { ClientContext.userEmail = value },
    userGivenName: "",
    setUserGivenName: () => {},
    userFamilyName: "",
    setUserFamilyName: () => {},
    userFullName: "",
    setUserFullName: () => {},
    userAccessToken: "",
    setAccessToken: () => {},
    userGoogleId: "",
    setUserGoogleId: () => {}
});


//const { ClientProvider, ClientConsumer } = ClientContext;

const ClientProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const loggedInValue = { loggedIn, setLoggedIn };
    const [userEmail, setUserEmail] = useState('');
    const userEmailValue = { userEmail, setUserEmail };
    const [userGivenName, setUserGivenName] = useState('');
    const userGivenNameValue = { userGivenName, setUserGivenName };
    const [userFamilyName, setUserFamilyName] = useState('');
    const userFamilyNameValue = { userFamilyName, setUserFamilyName };
    const [userFullName, setUserFullName] = useState('');
    const userFullNameValue = { userFullName, setUserFullName };
    const [userAccessToken, setUserAccessToken] = useState('');
    const userAccessTokenValue = { userAccessToken, setUserAccessToken };
    const [userGoogleId, setUserGoogleId] = useState('');
    const userGoogleIdValue = { userGoogleId, setUserGoogleId };
    return (
        <ClientContext.Provider
            value={{ loggedIn: [loggedIn, setLoggedIn],
                     userEmail: [userEmail, setUserEmail],
                     userGivenName: [userGivenName, setUserGivenName],
                     userFamilyName: [userFamilyName, setUserFamilyName],
                     userFullName: [userFullName, setUserFullName],
                     userAccessToken: [userAccessToken, setUserAccessToken],
                     setUserGoogleId: [userGoogleId, setUserGoogleId],
            }}
        >
            {children}
        </ClientContext.Provider>
    );
};
*/
//export { loggedIn, SetState }
//export { ClientContext, ClientProvider };
