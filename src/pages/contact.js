import React from 'react';
import {
  GitHub as GitHubIcon,
  Linkedin as LinkedinIcon,
  Mail as MailIcon,
} from 'react-feather'

// styles
import '../css/contactPage.css';

// components
import ContactForm from '../components/ContactForm';

export default () => (
  <div className='u-flexV'>
    <h1 className='PageHeader'>Contact</h1>

    <div>
      <h1>Email & Social Media</h1>
      <ul className='Contact-socials'>
        <li><MailIcon /> <a href='mailto:gp@gpow.ca'>gp@gpow.ca</a></li>
        <li><GitHubIcon /> <a href='https://github.com/GeordieP' target='GitHubGeordieP'>github.com/GeordieP</a></li>
        <li><LinkedinIcon /> <a href='https://www.linkedin.com/in/geordiep' target='LinkedInGeordieP'>linkedin.com/in/GeordieP</a></li>
      </ul>
    </div>

    <br />

    <div className='u-fullWidth'>
      <h1>Send a message</h1>
      <ContactForm />
    </div>

    <br />
  </div>
);
