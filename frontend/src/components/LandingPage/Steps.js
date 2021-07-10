//Importing the dependencies and required components
import React from "react";
import tw from "twin.macro";
import stepsPic from "images/stepsFeature.svg";
import Steps from "components/features/TwoColWithSteps";

export default function Page() {
    // Style for the sub-heading
    const Subheading = tw.span`tracking-wider text-sm font-medium`;

    // Style for the highlighted text
    const HighlightedText = tw.span`text-primary-500 px-4 transform  inline-block`;

    return (
        // Return the steps component which will show the steps how to operate the application
        <Steps
            componentId="steps"
            subheading={<Subheading>SIMPLE STEPS</Subheading>}
            heading={
                <>
                    Easy to<HighlightedText>Get Started.</HighlightedText>
                </>
            }
            steps={[
                {
                    // heading: "Sign up for free",
                    // description: "Create an account with us using your email or social media."
                    heading : "Click on Connect",
                    description: "You can click on Connect button which is shown of the top of the page."
                },
                {
                    // heading: "Sign in",
                    // description: "After creating an account, just Sign in into your account."
                    heading: "Copy your ID",
                    description: "After clicking on the connect button, you can either copy your ID and send it to your pair or you can just click WhatsApp or Telegram button to invite your pair through these options."
                },
                {
                    heading: "Good to go",
                    description: "Now your partner will just paste the ID given by you, and make a call to you. After that, there will be a incoming call to you from them, which you can answer and enjoy."
                }
            ]}
            textOnLeft={true}
            imageSrc={stepsPic}
            imageDecoratorBlob={true}
            decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-10 -translate-x-1/2 left-1/2`}
        >
        </Steps>
    )
}