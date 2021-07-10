//Importing the dependencies and required components
import React, { useContext } from 'react';
import { Button, Typography } from '@material-ui/core';
import { SocketContext } from "../SocketContext";

function IncomingCall() {
    const context = useContext(SocketContext);

    const { answerCall, // To answer the call
            call, // To check whether the call has been received or not
            callAccepted // To check whether the incoming call has been accepted or not
          } = context;
    return (
        // Return the component which will show the status of the incoming call 
        <>
            {   // Show the Ringing status until there is incoming call and the call has not been accepted
                call.isReceivingCall && !callAccepted && (

                <div style={{ display: 'flex', justifyContent: 'center', columnGap: '20px' }}>

                    {/* This will show Ringing... if there is an incoming call*/}
                    <Typography style={{ color: '#185ADB' }} variant="h4" gutterBottom>Ringing.....</Typography>

                    {/* Button to answer the incoming call which on clicked, calls the function to answerCall answer the call*/}
                    <Button variant="contained" style={{ fontSize: 15 }} color="primary" onClick={answerCall}>
                        Answer
                    </Button>
                </div>
            )}
        </>
    )
}

export default IncomingCall
