//Importing the dependencies and required components
import React from "react";
import tw from "twin.macro";
import Signup from "../../pages/Signup";

export default function SignUp() {
    // Style for the highlighted text
    const HighlightedText = tw.span`text-primary-500 transform  inline-block`;
    
    return (
        <Signup
            headingText={<>Sign Up To <HighlightedText>MCE Connect</HighlightedText> </>} 
            >
        </Signup>
    )
}