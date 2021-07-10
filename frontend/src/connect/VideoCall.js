//Importing the dependencies and required components
import React from 'react';
import ToggleTheme from './ToggleTheme';
import VideoSlides from './VideoSlides';
import Particulars from './Particulars';
import IncomingCall from './IncomingCall';
import Header from "../components/headers/light";
import Footer from "../components/footers/MiniCenteredFooter";
import AnimationRevealPage from 'helpers/AnimationRevealPage';

function VideoCall() {
    return (
        // Disabled animation
        <AnimationRevealPage disabled>
            {/* Render the Header without the links to show on the connect page*/}
            <Header links={[]} />

            {/* Render the ToggleTheme component for the mode changer*/}
            <ToggleTheme />
            
            {/* Render the VideoSlides component for showing the video of the users*/}
            <VideoSlides />

            {/* Render the Particulars component for showing all the options of copying, pasting and sharing the ID */}
            <Particulars />

            {/* Render the IncomingCall component for showing the status of incoming call */}
            <IncomingCall />

            {/* Render the Footer component to show the footer without the links*/}
            <Footer LinksShow={false} />
        </AnimationRevealPage>
    )
}

export default VideoCall;