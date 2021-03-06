//Importing the dependencies,styles and required components
import { React, useContext, useState } from 'react';
import tw from 'twin.macro';
import { Button, TextField } from "@material-ui/core";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext,socket } from "../SocketContext";
import { Assignment, Phone, PhoneDisabled, Telegram, WhatsApp } from '@material-ui/icons';
import { Input } from "antd";
import chat_show from "../images/chat_show.svg";
import "./chatstyles.css";

//Using Search from Input of antd framework
const { Search } = Input;

function Particulars() {
    //Using useState to set the ID of the user to which call is going to make
    const [idToCall, setIdToCall] = useState('');
    const Actions = tw.div`flex flex-col justify-between gap-x-4 items-center gap-y-4 sm:flex-row  justify-between lg:justify-around mt-5`;

    const { me, // User's ID
            callAccepted, // To check whether the call has been accepted or not
            callEnded, // To check whether the call has been ended or not
            leaveCall, // To leave the call when clicked on hang call button
            callUser, // user who is going to make the call
            sendMsg: sendMsgFunc, // To send the message chat
            chat, // Message array for chat
            setChat, //To set Message array
          } = useContext(SocketContext);

    const [sendMsg, setSendMsg] = useState(""); //To send the chat message 
    //On receive message, store to the chat message array
    socket.on("msgRcv", ({ name, msg: value, sender }) => {
        let msg = {};
        msg.msg = value;
        msg.type = "rcv";
        msg.sender = sender;
        msg.timestamp = Date.now();
        setChat([...chat, msg]);
    });

    //To send the message on clicked
    const onSearch = (value) => {
        if (value && value.length) sendMsgFunc(value);
        //setting the message to empty string after sending the message
        setSendMsg("");
    };
    return (
        <>
            <Actions>
                <CopyToClipboard text={me}>

                    {/* Return the button to copy the ID */}
                    <Button
                        variant="contained"
                        style={{ fontSize: 15 }}
                        color="primary"
                        startIcon={<Assignment style={{ fontSize: 25 }} />}>
                        Copy ID
                    </Button>
                </CopyToClipboard>

                {/* Return the Telegram button to share the ID */}
                <Button
                    variant="contained"
                    target="_blank"
                    href={`https://t.me/share/url?url=mce-connect.netlify.com%0A&text=Please%20join%20the%20call%20by%20copy%20the%20following%20ID%0A${me}%0AAnd%20Paste%20it%20in%20ID%20column%20on%20the%20above%20link%20and%20make%20the%20call.`}
                    style={{ backgroundColor: '#0088cc', color: '#FFFFFF', fontSize: 15 }} 
                    startIcon={<Telegram style={{ fontSize: 25 }} />}>
                    Telegram
                </Button>

                {/* Return the WhatsApp button to share the ID */}
                <Button
                    variant="contained"
                    target="_blank"
                    href={`https://wa.me/?text=mce-connect.netlify.com%0A%0APlease%20join%20the%20call%20by%20copy%20the%20following%20ID%0A${me}%0AAnd%20Paste%20it%20in%20ID%20column%20on%20the%20above%20link%20and%20make%20the%20call.`}
                    style={{ backgroundColor: '#25D366', color: '#FFFFFF', fontSize: 15 }} 
                    startIcon={<WhatsApp style={{ fontSize: 25 }} />}>
                    WhatsApp
                </Button>

                {   // Return the button to give option to call or hang the call 
                    callAccepted && !callEnded ? (
                    // Return the Hangup button to hang the call if the call has been accepted and yet not ended, which on clicked ends the call
                    <Button 
                    variant="contained" 
                    style={{ fontSize: 15 }} 
                    color="secondary" 
                    startIcon={<PhoneDisabled style={{ fontSize: 25 }} />} 
                    onClick={leaveCall}>
                        Hang Up
                    </Button>
                ) : (
                    //Return the Call button to make the call which on clicked, calls the function callUser when passing with parameter idToCall in the SocketContext.js  
                    <Button 
                    variant="contained" 
                    style={{ fontSize: 15 }} 
                    color="primary" 
                    startIcon={<Phone style={{ fontSize: 25 }} />} 
                    onClick={() => { callUser(idToCall) }}>
                        Call Now
                    </Button>
                )}
            </Actions>
            <br />

            {/* Show the chat section if the call has not been accepted and call has not been ended yet*/}
            {callAccepted && !callEnded && (
                <>
                    <h1 style={{ fontSize: "30pt", color: '#39A2DB' }}>Chat</h1>
                    {chat.length ? (
                        <div className="msg_flex">
                            {chat.map((msg) => (
                                <div className={msg.type === "sent" ? "msg_sent" : "msg_rcv"}>
                                    {msg.msg}
                                </div>
                            ))}
                        </div>
                    ) : (
                        // To add svg/image if chat has not started
                        <div className="chat_img_div">
                            <img src={chat_show} alt="msg_illus" className="img_illus" />
                        </div>
                    )}
                    <br />

                    {/* TextField and send button to send the message to Peer*/}
                    <Search
                        placeholder="Type your message"
                        className="input_msg"
                        enterButton="Send ???"
                        onChange={(e) => setSendMsg(e.target.value)}
                        value={sendMsg}
                        size="large"
                        style={{ color: '#39A2DB', fontSize: "15pt", textDecoration : 'none'}}
                        onSearch={onSearch}
                    />
                    <br />
                    <br />
                    <br />
                </>
            )}
            {/* Textfield to paste the ID to make the call which on change, sets the ID to which call is going to happen*/}
            <TextField 
                label="ID to Call"
                inputProps={{
                    style: { color: '#39A2DB', fontSize: 30 }
                }}
                InputLabelProps={{ style: { color: '#185ADB', fontSize: 30 } }}
                value={idToCall} 
                onChange={(e) => setIdToCall(e.target.value)} 
                fullWidth />
            <br />
            <br />
        </>
    )
}

export default Particulars;