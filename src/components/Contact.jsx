import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const goToHomeAndActivateAccordion = () => {
    localStorage.setItem("accordion-active", JSON.stringify(true));
    navigate("/");
  };

  return (
    <div className="container">
      <h2>
        Main Page
        <nav
          style={{ display: "flex", flexDirection: "row", columnGap: "20px" }}
        >
          <button
            onClick={goToHomeAndActivateAccordion}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Home
          </button>
        </nav>
      </h2>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum mollitia
      nobis modi recusandae neque, quisquam facere architecto non obcaecati
      nesciunt, quae suscipit iure voluptatum culpa magnam reiciendis tenetur
      expedita inventore.
    </div>
  );
};

export default Contact;
