import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="container">
      <h2>
        Main Page
        <nav
          style={{ display: "flex", flexDirection: "row", columnGap: "20px" }}
        >
          <Link to="/">Home</Link>
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
