//"use strict";
//import React, { useState } from 'react'
import React, { useReducer } from 'react';

import { initialState, reducer } from './store';
import {
    setShowSidebar,
    setLoggedIn,
    setTimerConnected,
    setAppBodyContent,
    setShowNotification,
    setNotificationText,
    setDeviceId,
} from './store/actions';

import {
    Box,
    Button,
    Collapsible,
    Heading,
    Grommet,
    Layer,
    Menu,
    ResponsiveContext,
    } from 'grommet';

//import { VerticalMenu } from 'grommet-controls';

import { FormClose, Notification, FormPreviousLink, FormNextLink} from 'grommet-icons';
import GoogleLoginControl from "./LoginControl"
import AppBodyContent from "./AppBodyContent"
//import AppBodyContentHandlers from "./AppBodyContentHandlers"

const theme = {
    global: {
        colors: {
            brand: '#228BE6',
        },
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        },
    },
};

const AppBar = (props) => (
    <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

function App() {

    const [appStateStore, dispatch] = useReducer(reducer, initialState);
    //setShowSidebar(dispatch, false);
    //const [showSidebar, setShowSidebar] = useState(false);
    //console.log("In App - showSidebar: " + showSidebar);
    //const [loggedIn, setLoggedIn] = useState(false);
    //console.log("In App - state: " + loggedIn);
    //console.log("In App - func: " + setLoggedIn);
    //const [timerConnected, setTimerConnected] = useState(false);
    //const [appBodyContent, setAppBodyContent] = useState('');
    const { REACT_APP_COMPANY_ACRONYM_UPPER_CASE }  = process.env;
    //const defaultValue = {string: process.env.REACT_APP_COMPANY_ACRONYM_UPPER_CASE + "-"};
    //const [value, setValue] = React.useState(defaultValue);
    //const [showModal, setShowModal] = React.useState(true);
    //let companyAcronymUpperCase = process.env.COMPANY_ACRONYM_UPPER_CASE
    console.log("In app. msg: " + appStateStore.notificationText)
    console.log("In app. showNotification: " + appStateStore.showNotification)

    if (/Chrome\/(\d+\.\d+.\d+.\d+)/.test(navigator.userAgent)) {
        // Let's log a warning if the sample is not supposed to execute on this
        // version of Chrome.
        if (45 > parseInt(RegExp.$1)) {
            ChromeSamples.setStatus('Warning! Keep in mind this sample has been tested with Chrome ' + 45 + '.');
        }
    }
    isWebBluetoothEnabled()
    window.addEventListener('error', function (error) {
        if (ChromeSamples && ChromeSamples.setStatus) {
            //console.error(error);
            ChromeSamples.setStatus(error.message + ' (Your browser may not support this feature.)');
            error.preventDefault();
        }
    });

    // Render the display
    return (
        <Grommet theme={theme} full>
            <ResponsiveContext.Consumer>
                {size => (
                    <Box fill>
                        <AppBar>
                            <Heading level='3' margin='none'>{ REACT_APP_COMPANY_ACRONYM_UPPER_CASE }</Heading>
                            <Box>
                                <Menu
                                    label='Timer'
                                    //disabled={!appStateStore.loggedIn}
                                    items={[
                                           {
                                           label: 'Pair with Timer',
                                           onClick: () => {
                                                selectDevice(setTimerConnected);
                                            }},

                                            {
                                            label: 'Select Wifi Network', onClick: () => {
                                                selectNetwork()
                                            }},
                                            {
                                            label: 'Set Timer ID', onClick: () => {
                                                setAppBodyContent(dispatch,'SetTimerId');
                                            }},
                                    ]}
                                />
                            </Box>
                            <Button label={"log something"}
                                    onClick={() => {
                                       console.log("The button was clicked")
                                        Logger({
                                            'level': 'trace',
                                            'message': 'The log something button was clicked'
                                        })
                                    }}
                            />
                            <GoogleLoginControl
                                state={appStateStore.loggedIn}
                                func={setLoggedIn}
                                dispatch={dispatch}
                            />
                            <Button icon={<FormPreviousLink/>}
                                    onClick={() => {
                                        setShowSidebar(dispatch, !appStateStore.showSidebar)
                                    }}
                            />
                        </AppBar>
                        <Box direction='row' flex overflow={{horizontal: 'hidden'}}>
                            <Box flex align='center' justify='center'>
                                <AppBodyContent
                                    state={appStateStore}
                                    func={setAppBodyContent}
                                    dispatch={dispatch}
                                />
                            </Box>
                            {(!appStateStore.showSidebar || size !== 'small') ? (
                                <Collapsible direction="horizontal" open={appStateStore.showSidebar}>
                                    <Box
                                        flex
                                        width='medium'
                                        background='light-2'
                                        elevation='small'
                                        align='center'
                                        justify='center'
                                    >
                                        side panel
                                    </Box>
                                </Collapsible>
                            ) : (
                                <Layer>
                                    <Box
                                        background='light-2'
                                        tag='header'
                                        justify='end'
                                        align='center'
                                        direction='row'
                                    >
                                        <Button
                                            icon={<FormNextLink/>}
                                            onClick={() => setShowSidebar(false)}
                                        />
                                    </Box>
                                    <Box
                                        fill
                                        background='light-2'
                                        align='center'
                                        justify='center'
                                    >
                                        sidebar
                                    </Box>
                                </Layer>
                            )}
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
}

export default App;





// Add a global error event listener early on in the page load, to help ensure that browsers
const ChromeSamples = {
    log: function() {
        var line = Array.prototype.slice.call(arguments).map(function(argument) {
            return typeof argument === 'string' ? argument : JSON.stringify(argument);
        }).join(' ');

        console.log.textContent += line + '\n';
    },

    clearLog: function() {
        console.log.textContent = '';
    },

    setStatus: function(status) {
        status.textContent = status;
    },

    //setContent: function(newContent) {
        //var content = document.querySelector('#content');
        //while(content.hasChildNodes()) {
        //    content.removeChild(content.lastChild);
        //}
        //content.appendChild(newContent);
    //}
};

//let log = ChromeSamples.log;
let gattDevice;
let gattServer;

function selectDevice(setTimerConnected) {
    // Select and pair with the timer device using bluetooth low energy
    console.log("In selectDevice - userEmail: " + window.localStorage.getItem("userEmail"));
    console.log("In selectDevice - userName: " + window.localStorage.getItem("userName"));
    console.log("In selectDevice - userGivenName: " + window.localStorage.getItem("userGivenName"));
    console.log("In selectDevice - userFamilyName: " + window.localStorage.getItem("userFamilyName"));
    console.log("In selectDevice - userGoogleId: " + window.localStorage.getItem("userGoogleId"));
    console.log("In selectDevice - userImageUrl: " + window.localStorage.getItem("userImageUrl"));
    console.log("In selectDevice - userAccessToken: " + window.localStorage.getItem("userAccessToken"));
    console.log("In selectDevice - userTokenId: " + window.localStorage.getItem("userTokenId"));

    Logger({
        'level': 'trace',
        'message': 'Selecting Timer Device...'
    })
    console.log('Selecting Timer Device...')
    navigator.bluetooth.requestDevice(
    //{filters: [{services: ['f900010000-0002-1000-8000-00805b34fb']}]} )
    {"filters":[{"namePrefix": process.env.REACT_APP_COMPANY_ACRONYM_UPPER_CASE } ],optionalServices: [0x1800,
    0x1801,
    '00010000-0001-1000-8000-00805f9b34fb',
    '00010000-0003-1000-8000-00805f9b34fb',
    '00010000-0004-1000-8000-00805f9b34fb'
    ]} )
    .then(device => {
        Logger({
            'level': 'trace',
            'message': 'Timer Device Selected.  Connecting...'
        })
        console.log('Timer Device Selected.  Connecting...');
        return device.gatt.connect()
    })
    .then(server => {
        Logger({
                'level': 'trace',
                'message': 'Timer Device Selected.  Connecting...'
        })
        console.log('Timer Device Connected...')
        gattServer = server;
        setTimerConnected(true);
        //document.getElementById('selectDevice').textContent = 'Device Connected';
        //document.getElementById('selectDevice').disabled = true;
    })
    .catch(error => {
        if(error.code !== 8) {
            Logger({
                'level': 'fatal',
                'message': error
            })
            console.log('Error: ' + error);
        }
    });
}


function isWebBluetoothEnabled() {
    if (navigator.bluetooth) {
        return true;
    } else {
        Logger({
            'level': 'fatal',
            'message': 'Web Bluetooth API is not available.' +
                       'Experimental Web Platform features flag not enabled ' +
                       'Or this page was served using HTTPS'
        })
        //ChromeSamples.setStatus
        console.log('Web Bluetooth API is not available.\n' +
            'Please make sure the "Experimental Web Platform features" flag is enabled.\n' +
            'And that this page was served using HTTPS');
        return false;
    }
}

function selectNetwork() {
    // Select a wifi network for timer device
    Logger({
        'level': 'trace',
        'message': 'Selecting Timer Device wifi network...'
    })

    console.log('Selecting Timer Device wifi network...');
    return gattServer.getPrimaryService("00010000-0001-1000-8000-00805f9b34fb")
    .then(service => {
        console.log('Got the ETT custom service...');
        Logger({
            'level': 'trace',
            'message': 'Getting the wifi network list Characteristic...'
        })
        console.log('Getting the wifi network list Characteristic...');
        //return service.getCharacteristic('00002A00-0000-1000-8000-00805f9b34fb');
        return service.getCharacteristic('00010000-0003-1000-8000-00805f9b34fb');
    })
    .then(characteristic => {
        Logger({
            'level': 'trace',
            'message': 'Reading wifi network list...'
        })
         console.log('Reading wifi network list...');
        return characteristic.readValue();
    })
    .then(value => {
        var enc = new TextDecoder("utf-8");
        //log('Wifi network list: ' + enc.decode(value));
        let wifiList = enc.decode(value);
        let optionList = document.getElementById('networkSelector').options;
        const wifiArray = wifiList.split(" ");
        for (let i = 0; i < wifiArray.length; i++) {
            if (wifiArray[i].trim().length !== 0) {
                if(i === 0) {
                    optionList.add(new Option(wifiArray[i], wifiArray[i], true, true ));
                }
                else {
                    optionList.add(new Option(wifiArray[i], wifiArray[i]));
                }
           }
       }
       let modal = document.getElementById("wifiModal");
       modal.style.display = "block";
       document.getElementById("wifiModal").showModal();
    })
    .catch(error => {
        console.log('Error: ' + error);
    });
}

function connectToNetwork(ssid) {
    // Select a wifi network for timer device
    console.log('Connecting the timer to the user selected wifi network...');
    console.log('Getting custom ETT Service...');
    return gattServer.getPrimaryService("00010000-0001-1000-8000-00805f9b34fb")
    .then(service => {
    console.log('Got the ETT custom service...');
    console.log('Getting the wifi network connect Characteristic...');
    return service.getCharacteristic('00010000-0004-1000-8000-00805f9b34fb');
})
    .then(characteristic => {
    console.log('Writing the selected wifi network SSID...');
    const writeSSID = Uint8Array.of(ssid);
    return characteristic.writeValue(writeSSID);
})
    .then(_ => {
    console.log('Wrote the selected SSID.');
})
    .catch(error => {
    console.log('Error: ' + error);
});
}

function Logger(data) {
    //data.push("remote-timestamp", new Date().toLocaleString())
    let endpoint = process.env.REACT_APP_SEND_LOG_ENDPOINT
    console.log("endpoint: ",endpoint)
    console.log("data: ",data)
    return fetch(endpoint, {
        credentials: 'same-origin', // 'include', default: 'omit'
        method: 'POST',             // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Use correct payload (matching 'Content-Type')
        headers: { 'Content-Type': 'application/json'},
    })
        .then(response => console.log(response))
        //.then(response => response.json())
        .catch(error => console.error(error))
}

