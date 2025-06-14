import { useState } from "react";

const ContactForm = () => {
    const [contactResult, setContactResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setContactResult("... Sending");
        const formData = new FormData(event.target);
    
        formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
          console.log("Success", res);
          setContactResult("Email sent");
        } else {
            setContactResult("Sorry, your email couldn't be sent");
        }
    };
    
    return (
        <div className="contact-form">
            <h3>Send Us a Message</h3>
            <form id="contact-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Your email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" placeholder="Your phone number" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="5" placeholder="Your message"></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
                <div id="result" className="form-result">{contactResult}</div>
            </form>
        </div>
    );
};

export default ContactForm;
