import "./faq.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Faq() {
  const toggleQuestion = (event) => {
    event.target.closest(".faq").classList.toggle("active");
  };

  return (
    <div className="faqCard">
      <div className="faqTitle">
        <h3>FAQ</h3>
      </div>
      <div className="faq" onClick={toggleQuestion}>
        <div className="question">
          <h3>Who can help me with the dashboard?</h3>
          <KeyboardArrowDownIcon />
        </div>
        <div className="answer">
          <p>
            The increadible talented tech team who are hiding in the corner of
            Blazar's office can assist you with your dashboard requests!
          </p>
        </div>
      </div>

      <div className="faq" onClick={toggleQuestion}>
        <div className="question">
          <h3>What is NG?</h3>
          <KeyboardArrowDownIcon />
        </div>
        <div className="answer">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            semper est vitae feugiat efficitur. Donec maximus ultricies ipsum
            sit amet varius. Maecenas egestas diam id urna cursus viverra.
            Praesent pulvinar ante eget ligula varius tristique.
          </p>
        </div>
      </div>

      <div className="faq" onClick={toggleQuestion}>
        <div className="question">
          <h3>Lorem ipsum dolor sit amet ?</h3>
          <KeyboardArrowDownIcon />
        </div>
        <div className="answer">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            semper est vitae feugiat efficitur. Donec maximus ultricies ipsum
            sit amet varius. Maecenas egestas diam id urna cursus viverra.
            Praesent pulvinar ante eget ligula varius tristique.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Faq;
