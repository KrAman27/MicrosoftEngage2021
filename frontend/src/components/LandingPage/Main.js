//Importing the dependencies and required components
import React from 'react';
import tw from "twin.macro";
import Hero from "../hero/TwoColumnWithVideo";

function Main() {
    const HighlightedText = tw.span`text-primary-500 px-0 transform  inline-block`;
    const imageCss = tw`rounded-4xl`;
    return (
        // Return the Hero component of the home page
        <Hero
            heading={<>MCE Connect <HighlightedText>Always with you...❤</HighlightedText></>}
            description="Now meet, chat and enjoy with your loved ones online, only with MCE Connect."
            imageCss={imageCss}
            imageDecoratorBlob={true}
            primaryButtonText1="Connect"
            primaryButtonText2="Chat"
        />
    )
}

export default Main;