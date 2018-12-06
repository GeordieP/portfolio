import React from 'react';
import { Send as SendIcon } from 'react-feather';

const AWS_URL = 'https://0dmdey21oh.execute-api.us-west-2.amazonaws.com/prod';

const FormStates = Object.freeze({
  IDLE: 0,
  SENDING: 1,
  SUCCESS: 2,
  ERROR: 3,
});

// Helper function to gather relevant values from a form, and send it off as JSON
// to the AWS endpoint.
const sendContactForm = (formTargetElements) => {
  const formData = Array.from(formTargetElements)
    .reduce((ac, field) => {
      if (!field || !field.name) return ac;
      ac[field.name] = field.value;
      return ac;
    }, {});

    return fetch(AWS_URL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json());
}

// Form 'Send' button component. Renders differently depending on the form state.
const SendBtn = ({ state, onSubmitClick }) => {
  switch(state) {
    default:
    case FormStates.IDLE:
      return <button className='SendButton is-idle'>Send <SendIcon /></button>

    case FormStates.SENDING:
      return <button disabled className='SendButton is-sending'>Sending...</button>

    case FormStates.SUCCESS:
      return <button disabled className='SendButton is-success'>Message Sent!</button>

    case FormStates.ERROR:
      return <button disabled className='SendButton is-failure'>Error sending message.</button>
  }
}

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { state: FormStates.IDLE };
    this.submitForm = this.submitForm.bind(this);
    this.ref_form = React.createRef();
  }

  // Show the Success state for x seconds.
  tempStateSuccess() {
    this.setState({ state: FormStates.SUCCESS });
    setTimeout(() => {
      this.setState({ state: FormStates.IDLE });
    }, 5000); // 5 seconds
  }

  // Show the form Error state for x seconds.
  tempStateError() {
    this.setState({ state: FormStates.ERROR });
    setTimeout(() => {
      this.setState({ state: FormStates.IDLE });
    }, 8000); // 8 seconds
  }

  resetForm() {
    this.ref_form.current.reset();
  }

  async submitForm(e) {
    e.preventDefault();
    this.setState({ state: FormStates.SENDING });

    // Send form data to AWS emailer.
    try {
      await sendContactForm(e.currentTarget.elements);

      this.tempStateSuccess();
      this.resetForm();
    } catch(err) {
      console.error(err);
      this.tempStateError();
    }
  }

  render() {
    return (
      <form className='ContactForm' onSubmit={this.submitForm} ref={this.ref_form}>
        <noscript>
          NOTE: You need to have JavaScript enabled to submit this form. Alternatively, you can send an email to gp@gpow.ca
        </noscript>

        <section>
          <label htmlFor='message'>Message body</label>
          <textarea id='message' name='message' rows='9' required placeholder='Your Message' />
        </section>

        <section>
          <fieldset>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' required placeholder='Your Name' />
          </fieldset>

          <fieldset>
            <label htmlFor='replyTo'>Email</label>
            <input type='email' id='replyTo' name='replyTo' required placeholder='Your Email' />
          </fieldset>
          <SendBtn state={this.state.state} />

          <noscript>
            NOTE: You need to have JavaScript enabled to submit this form. Alternatively, you can send an email to gp@gpow.ca
          </noscript>
        </section>
      </form>
    );
  }
}
