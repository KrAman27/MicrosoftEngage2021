//Importing the dependencies and required components
import React from "react";
import emailjs from "emailjs-com";
import Contact from "components/forms/TwoColContactUsWithIllustrationFullForm";

// function to send the contact us form from the user to the website owner
export default function Page() {
    // This will send the response of the contact us form to the website owner and user will also get confirmation.
    // Function call from emailjs service
    const sendEmail = (e) => {
        e.preventDefault();

        // sendform method is given by emailjs and parameters are serviceID, templateID, templateParams and userID of the website owner.
        emailjs.sendForm('service_fe7lqtb', 'template_fu7zxty', e.target, 'user_xfN8sqqspHEQm7i1ctJH6')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }

    return (
        // Return the component of contact us form
        <Contact
            formSubmit={sendEmail}
            componentId="contact-us"
            description="If you have any query or would like to have few words with us, feel free to shoot out an email to us. We will be more happy to talk to you."
        />
    )
}