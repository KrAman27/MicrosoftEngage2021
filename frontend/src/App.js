// Importing React and different components along with styles
import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import AnimationRevealPage from "./helpers/AnimationRevealPage";
import Header from "./components/headers/light";
import Features from "components/LandingPage/teamsFeatures";
import Footer from "components/footers/MiniCenteredFooter.js";
import TeamsLandingPage from "./demos/msTeamsLandingPage";
import ContactUs from "./components/LandingPage/ContactUs";
import Steps from "./components/LandingPage/Steps";
import VideoCall from "./connect/VideoCall";
import { ContextProvider } from "SocketContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {

  return (
    // Router to use different routes and rendering all the corresponding components
    <Router>
      <Switch>

        <Route path="/features">
          <AnimationRevealPage>
          <Header />
          <Features />
          <Footer LinksShow={true}/>
          </AnimationRevealPage>
        </Route>

        <Route path="/contact-us">
          <AnimationRevealPage>
          <Header />
          <ContactUs />
          <Footer LinksShow={true}/>
          </AnimationRevealPage>
        </Route>

        <Route path="/steps">
        <AnimationRevealPage>
          <Header />
          <Steps />
          <Footer LinksShow={true}/>
          </AnimationRevealPage>
        </Route>

        <Route path="/connect">
          <ContextProvider>
            <VideoCall />
          </ContextProvider>
        </Route>

        {/* Render the home page if none of the routes match*/}
        <Route path="/">
          <TeamsLandingPage />
        </Route>
      </Switch>
    </Router>
  );
}