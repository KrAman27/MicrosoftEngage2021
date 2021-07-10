//Importing the dependencies and required components
import { React, useContext } from 'react';
import { SocketContext } from "../SocketContext";
import { IconButton, Grid } from "@material-ui/core";
import { Mic, MicOff, Videocam, VideocamOff } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';

// Style for displaying the Video slides 
const useStyles = makeStyles((theme) => ({
    icons: {
        display: 'inline-block',
        marginRight: '20%',
    },
    gridContainer: {
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    video : {
        border : '4px solid black',
        backgroundColor : '#fff',
        padding : '10px',
        borderRadius : '5%'
    }
}));

function VideoSlides() {
    const { myVideo, // for my Video
            stream, // for my current stream
            userVideo, // for other user video
            callAccepted, // to check whether the call has been accepted or not
            callEnded, // to check whether the call has been ended or not
            updateMic, // function to update the status of microphone : on or off
            myMicStatus, // to check the current status of microphone
            updateVideo, // function to update the status of camera : on or off
            myVdoStatus, // to check the current status of the camera
          } = useContext(SocketContext);

    const classes = useStyles();

    return (
        // Grid Container for the video container 
        <Grid container className={classes.gridContainer}>
            {   // Render my video if my stream is available
                stream && (
                // Grid container for my video
                <Grid item xs={12} md={6}>

                    {/* Display my video */}
                    <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>

                    <div  >
                        {/* Return the microphone iconbutton which on click, changes the status of microphone*/}
                        <div className={classes.icons} onClick={() => {updateMic();}}>

                        {   // Show Mic on icon if my mic is on i.e., true
                            myMicStatus ? (
                            <IconButton color="primary" aria-label="Mic on" component="span">
                                <Mic style={{ fontSize: 40 }} />
                            </IconButton>
                        ) : (
                            //Show Mic off icon if my mic is off i.e., false
                            <IconButton color="primary" aria-label="Mic off" component="span">
                                <MicOff style={{ fontSize: 40 }} />
                            </IconButton>
                        )}
                    </div>

                        {/*  Return the camera iconbutton which on click, changes the status of camera */}
                        <div className={classes.icons} onClick={() => updateVideo()}>

                        {   // Show camera on icon if my camera is on i.e., true
                            myVdoStatus ? (
                            <IconButton color="primary" aria-label="Camera on" component="span">
                                <Videocam style={{ fontSize: 40 }} />
                            </IconButton>
                        ) : (
                            // Show camera off icon if my camera is off i.e., false
                            <IconButton color="primary" aria-label="Camera off" component="span">
                                <VideocamOff style={{fontSize: 40 }} />
                            </IconButton>
                        )}
                    </div>
                    </div>
                </Grid>
            )}
            {
                // Show other user's video if the call has been accepted and call has not been ended yet
                callAccepted && !callEnded && (
                    <Grid item xs={12} md={6}>
                        {/* Display other user's video */} 
                        <video playsInline ref={userVideo} autoPlay className={classes.video}/>
                    </Grid>
                )}
        </Grid>
    )
}

export default VideoSlides;