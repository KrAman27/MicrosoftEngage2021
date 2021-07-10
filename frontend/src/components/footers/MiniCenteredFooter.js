//Importing the dependencies and required components
import React from "react";
import tw from "twin.macro";
import {Container as ContainerBase } from "components/misc/Layouts.js"
import logo from "../../images/logo.png";
import {HashLink as Link} from "react-router-hash-link";

const Container = tw(ContainerBase)`bg-gray-900 text-gray-100 -mx-8 -mb-8`
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Row = tw.div`flex items-center justify-center flex-col px-8`
const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-2xl font-black tracking-wider`;
const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`
const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`
const Linkcss = tw`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 pb-1 transition duration-300 mt-2 mx-4`;


function MiniCenteredFooter(props) {
  return (
    <Container id={props.componentId}>
      <Content>
        <Row>
          <LogoContainer>
            <LogoImg src={logo} />
            <LogoText>MCE</LogoText>
          </LogoContainer>
          { props.LinksShow && (
          <LinksContainer>
            <Link smooth css={Linkcss} to="#header">Home</Link>
            <Link smooth css={Linkcss} to="#steps">Steps</Link>
            <Link smooth css={Linkcss} to="#features">Features</Link>
            <Link smooth css={Linkcss} to="#contact-us">Contact Us</Link>
          </LinksContainer>
          )
          }
          <CopyrightText>
            &copy; Copyright 2021, Aman Kumar<br />All rights reserved.
          </CopyrightText>
        </Row>
      </Content>
    </Container>
  );
};

export default MiniCenteredFooter;