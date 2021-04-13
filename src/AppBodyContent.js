import React from 'react';
import { useState, useEffect } from 'react'
import {Box, Form, FormField, TextInput, Button, Layer, Text} from 'grommet';
import {setAppBodyContent, setDeviceId, setNotificationText, setShowNotification,} from "./store/actions";
//import { handleSetTimerId } from "./AppBodyContentHandlers"
import { Notification } from 'grommet-controls';

export const AppBodyContent = (props) => {
    // AppBodyContent state is kept in App.js with useState()
    // state value is stored in local variable appBodyContent
    // This value designates the dynamic content to display in the app body
    // func used to modify state is stored in local variable setAppBodyContent
    const appBodyContent = props.state.appBodyContent;
    //const setAppBodyContent = props.func;
    const defaultValue = process.env.REACT_APP_COMPANY_ACRONYM_UPPER_CASE + "-";
    const dispatch = props.dispatch
    let BodyContent;
    console.log("Before switch - appBodyContent: " + appBodyContent)


    //console.dir(value)
    //console.dir(defaultValue)
    switch (appBodyContent) {
        case 'SetTimerId' :
            // Input a six character timer device id string.
            // The device ID is prepended with the company acronym string plus a dash '-'
            // The device ID is written to timer device mass storage and is displayed
            // in the list of bluetooth devices available for pairing when
            // "Pair with Timer" is selected from the GUI "Timer" menu.
            const deviceId = props.state.deviceId
            BodyContent =
                <Form


                    onReset={() => setDeviceId(dispatch, defaultValue)}
                    onSubmit={handleSetTimerId}
                >
                    <FormField name="timerId" htmlFor="text-input-id"
                               label="Update the internal id of the paired timer device">
                        <TextInput id="timerId" name="timerId" maxLength={6}/>
                    </FormField>
                    <Box direction="row" gap="medium">
                        <Button type="submit" primary label="Update"/>
                        <Button type="reset" label="Reset"/>
                    </Box>
                </Form>

            break;
        case 'SetTimerIdCompleted' :
            console.log("In setTimerIdCompleted.  msg: " + props.state.notificationText)
            console.log("In setTimerIdCompleted.  showNotification: " + props.state.showNotification)
            if(props.state.showNotification) {
                BodyContent =
                    <Box align="center" width="small" border="all">
                        <Layer
                            onEsc={() => setShowNotification(dispatch, false)}
                            onClickOutside={() => setShowNotification(dispatch, false)}
                        >
                            <Notification message={props.state.notificationText} status={"ok"} size={"large"}/>
                            <Box direction="row" align="center">
                                <Button label="OK" onClick={() => setShowNotification(dispatch, false)}/>
                            </Box>
                        </Layer>
                    </Box>


            }
            else {
                BodyContent = null;
            }
            break;

        default:
            console.log("Unknown app body content: " + appBodyContent)
            BodyContent = null;
    }

    return (
        BodyContent
    );

    // Event Handlers
    function handleSetTimerId(e) {
        e.preventDefault();
        let key = '';
        let timerId = '';
        for (key in e.value) {
            if (e.value.hasOwnProperty(key)) {
                let value = e.value[key];
                console.log("In handleSetTimerId - value: " + value);
                timerId = timerId + value;
            }
        }
        console.log("In handleSetTimerId - timerId: " + timerId);
        //let setAppBodyContent = props.func;
        let msg = "Update Complete.  In the future select [ " + timerId + " ] to pair with this device"
        setNotificationText(dispatch, "Update Complete.  In the future select [ " + timerId + " ] " +
            "to pair with this device")
        setShowNotification(dispatch, true)
        console.log("msg: " + props.state.notificationText)
        console.log("msg: " + msg)
        setAppBodyContent(dispatch, 'SetTimerIdCompleted')
        //AppBodyContent({state: 'SetTimerIdCompleted'});
    }
}
export default AppBodyContent
