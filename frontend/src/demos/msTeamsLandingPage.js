//Importing the dependencies and required components
import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import MainFeature from "../components/LandingPage/MainFeatures";
import Steps from "../components/LandingPage/Steps";
import Features from "../components/LandingPage/teamsFeatures";
import Contact from "../components/LandingPage/ContactUs";
import Main from "../components/LandingPage/Main";
import Footer from "components/footers/MiniCenteredFooter.js";

function msTeamsLandingPage() {
    return (
        // Disabled animation
        <AnimationRevealPage disabled>
            {/* Rendering the different components of the landing page*/}
            <Main />
            <MainFeature />
            <Steps />
            <Features />
            <Contact />
            {/* Render the footer with links*/}
            <Footer LinksShow={true}/>
        </AnimationRevealPage>
    );
}

export default msTeamsLandingPage;