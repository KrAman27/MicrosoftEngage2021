//Importing the dependencies and required components
import React from "react";
import tw from "twin.macro";
import Features from "components/features/ThreeColSimple.js";
import meet from "images/meet.svg";
import chat from "images/chat.svg";
import enjoy from "images/enjoy.svg";

export default function Page() {
    // Style for the highlighted text
    const HighlightedText = tw.span`text-primary-500 px-4 transform  inline-block`;

    return (
        // Return the features of the application in the form of cards
        <Features
            componentId="features"
            heading={
                <>
                    What we have for<HighlightedText>you</HighlightedText>
                </>
            }
            cards={[
                {
                    imageSrc: meet,
                    title: "Meet",
                    description: "Now you can bridge the gap and bring your pair closer to you while staying at home.",
                },
                {
                    imageSrc: chat,
                    title: "Chat",
                    description: "Schedule your video conferencing call with your friend, colleague or family member.",
                },
                {
                    imageSrc: enjoy,
                    title: "Enjoy",
                    description: "Get connected with anyone around the globe and have fun online at your place.",
                },
            ]}
            imageContainerCss={tw`p-3!`}
            imageCss={tw`w-20! h-20!`}
        />
    )
}