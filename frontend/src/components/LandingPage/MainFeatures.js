//Importing the dependencies and required components
import React from 'react';
import tw from "twin.macro";
import MainFeature from "components/features/TwoColWithButton.js";

function MainFeatures() {
    // Style for the sub-heading
    const Subheading = tw.span`tracking-wider text-sm font-medium`;

    // Style for the highlighted text
    const HighlightedText = tw.span`text-primary-500 px-0 transform  inline-block`;

    // Style for the Description text 
    const Description = tw.span`inline-block mt-8`;

    // Style for the image in the component
    const imageCss = tw`rounded-4xl`;
    
    return (
        // Return the component which comes after the hero section in the home page, basically tells the feature of the app
        <MainFeature
            subheading={<Subheading>About MCE Connect</Subheading>}
            heading={
                <>
                    What we are offering for you <HighlightedText> from Connect</HighlightedText>
                </>
            }
            description={
                <Description>
                    With MCE Connect, you can schedule a conferencing video call with anyone, whether your friend, collegeaue, or your family member, sitting in any corner of the world.
                    <br />
                    <br />
                    You can now connect to anyone, and bring them in your window, at your place in just one click.
                </Description>
            }
            buttonRounded={false}
            textOnLeft={false}
            imageSrc={
                "https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dmlkZW8lMjBjYWxsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            }
            imageCss={imageCss}
            imageDecoratorBlob={true}
            imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
        />
    )
}

export default MainFeatures;