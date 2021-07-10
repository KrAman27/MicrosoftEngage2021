//Importing the dependencies and required components
import React from "react";
import tw from "twin.macro";
import Login from "../../pages/Login";

export default function SignUp() {
    // Style for the highlighted text
    const HighlightedText = tw.span`text-primary-500 transform  inline-block`;
    
    return (
        // Return the component of Sign up page 
        <Login
            headingText={<>Sign In To <HighlightedText>MCE Connect</HighlightedText> </>}
        >
        </Login>
    )
}