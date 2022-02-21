import "./contactForm.css";

function ContactForm() {
  return (
    <div className="contactFormCard">
      <div className="contactFormTitle">
        <h3>Need support?</h3>
        <p>Write your issue here</p>
      </div>

      <form action="https://formsubmit.co/markuskrag@gmail.com" method="POST">
        <div className="nameBox">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Your Name *"
            required
          />
        </div>
        <div className="emailBox">
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Your Email *"
            required
          />
        </div>
        <div className="messageBox">
          <textarea
            name="txtMsg"
            className="form-control"
            placeholder="Your Issue *"
          ></textarea>
        </div>
        <div className="submitBox">
          <input
            type="submit"
            name="btnSubmit"
            class="btnContact"
            value="Submit Issue"
          />
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
