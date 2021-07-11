//Importing the dependencies
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from "simple-peer";

//Create the context
const SocketContext = createContext();

//Backend server is running on the following application
export const socket = io('https://mce-connect.herokuapp.com/');
// export const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
    // useState for corresponding features 
    const [stream, setStream] = useState(); // my current video stream
    const [me, setMe] = useState(""); // my current ID 
    const [call, setCall] = useState({}); // to make the call and updating the call when there is an incoming call
    const [callAccepted, setCallAccepted] = useState(false); // to check whether the call has been accepted
    const [callEnded, setCallEnded] = useState(false); // to check whether the call has been ended
    const [name, setName] = useState(""); // to set the user's name
    const [otherUser, setOtherUser] = useState(""); // other user's ID
    const [userName, setUserName] = useState(""); // to set the other user's name
    const [myVdoStatus, setMyVdoStatus] = useState(true); // to set my video status
    const [userVdoStatus, setUserVdoStatus] = useState(); // to set other user's video status
    const [myMicStatus, setMyMicStatus] = useState(true); // to set my mic status
    const [userMicStatus, setUserMicStatus] = useState(); // to set other user's mic status
    const [chat, setChat] = useState([]); // chat array containing messages
    const [msgRcv, setMsgRcv] = useState(""); // for message which is to be sent

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        // to take the permission to use the camera and microphone 
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((currentStream) => {
            // setting my current stream 
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
        });

        if (localStorage.getItem("name")) {
            setName(localStorage.getItem("name"));
        }

        //setting my ID
        socket.on('me', (id) => setMe(id));

        //making a function to end the call and reload the window
        socket.on("endCall", () => {
            window.location.reload();
        });

        // to update the user media devices whenever microphone or camera status changes
        socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
            if (currentMediaStatus !== null || currentMediaStatus !== []) {
                switch (type) {
                    case "video":
                        setUserVdoStatus(currentMediaStatus);
                        break;
                    case "mic":
                        setUserMicStatus(currentMediaStatus);
                        break;
                    default:
                        setUserMicStatus(currentMediaStatus[0]);
                        setUserVdoStatus(currentMediaStatus[1]);
                        break;
                }
            }
        });

        // to make the call and establish the connection
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });

        //to set the message 
        socket.on("msgRcv", ({ name, msg: value, sender }) => {
            setMsgRcv({ value, sender });
            setTimeout(() => {
                setMsgRcv({});
            }, 2000);
        });

    }, []);

    // to answer the call, if there is any incoming call
    const answerCall = () => {
        // set the callaccepted as true
        setCallAccepted(true);

        // set the other user from whom the call has been made
        setOtherUser(call.from);

        // creating an object from the peer constructor
        // marking the initiator as false because the user is only answering the call, not making the call 
        const peer = new Peer({ initiator: false, trickle: false, stream });

        //Build the connection and calling the function answerCall from backend
        peer.on('signal', (data) => {
            socket.emit('answerCall', {
                signal: data,
                to: call.from,
                userName: name,
                type: "both",
                myMediaStatus: [myMicStatus, myVdoStatus],
            });
        });

        // Sets the current stream
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);
        
        //Building the connection
        connectionRef.current = peer;
    };

    //to make the call
    const callUser = (id) => {
        // creating an object from the peer constructor
        // marking the initiator as true because the user is initiating the call
        const peer = new Peer({ initiator: true, trickle: false, stream });

        //set other user
        setOtherUser(id);

        //Build the connection and calling the function callUser from backend
        peer.on('signal', (data) => {
            socket.emit('callUser', {
                userToCall: id,
                signalData: data,
                from: me,
                name
            });
        });

        // Sets the current stream
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        // calling the function callAccepted from backend
        socket.on('callAccepted', (signal, userName) => {
            // marking setCallAccepted as true 
            setCallAccepted(true);

            // setting other user name
            setUserName(userName);

            //establishing the signal and updating the user media devices i.e., camera & microphone
            peer.signal(signal);
            socket.emit("updateMyMedia", {
                type: "both",
                currentMediaStatus: [myMicStatus, myVdoStatus],
            });
        });

        //Building the connection
        connectionRef.current = peer;
    };

    // updating the video status 
    const updateVideo = () => {
        setMyVdoStatus((currentStatus) => {
            socket.emit("updateMyMedia", {
                type: "video",
                currentMediaStatus: !currentStatus,
            });
            stream.getVideoTracks()[0].enabled = !currentStatus;
            return !currentStatus;
        });
    };

    //updating the microphone status
    const updateMic = () => {
        setMyMicStatus((currentStatus) => {
            socket.emit("updateMyMedia", {
                type: "mic",
                currentMediaStatus: !currentStatus,
            });
            stream.getAudioTracks()[0].enabled = !currentStatus;
            return !currentStatus;
        });
    };

    //ending the call
    const leaveCall = () => {
        setCallEnded(true); //Ending the call

        connectionRef.current.destroy(); //Destroying the call connection
        socket.emit("endCall", { id: otherUser }); //Sending the request to backend server to end the call
        window.location.reload(); //Reload the window
    };

    //Sending the message from client to backend server 
    const sendMsg = (value) => {
        socket.emit("msgUser", { name, to: otherUser, msg: value, sender: name });//Sending the message to the server
        let msg = {};
        msg.msg = value;
        msg.type = "sent";
        msg.timestamp = Date.now();
        msg.sender = name;
        setChat([...chat, msg]);
    };

    //Return all the useState variables and required functions that have been made
    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
            setOtherUser,
            userName,
            myVdoStatus,
            setMyVdoStatus,
            userVdoStatus,
            setUserVdoStatus,
            updateVideo,
            myMicStatus,
            userMicStatus,
            updateMic,
            sendMsg,
            msgRcv,
            chat,
            setChat,
            setMsgRcv,
        }}>
            {children}
        </SocketContext.Provider>
    );
};


export { ContextProvider, SocketContext };