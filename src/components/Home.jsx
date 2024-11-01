import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [isActive, setIsActive] = useState(
    JSON.parse(localStorage.getItem("accordion-active")) || false
  );
  const handleAccordionClick = () => {
    setIsActive((prev) => !prev).then();
    localStorage.setItem("accordion-active", JSON.stringify(isActive));
  };
  useEffect(() => {
    return () =>
      localStorage.setItem("accordion-active", JSON.stringify(false));
  }, []);
  return (
    <div className="container">
      <h2>
        Main Page
        <nav
          style={{ display: "flex", flexDirection: "row", columnGap: "20px" }}
        >
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </h2>
      <div className="accordion">
        <AccordionItem
          title="Accordion Item #1"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          isActive={isActive}
          onClick={handleAccordionClick}
        />
      </div>
    </div>
  );
};

const AccordionItem = ({ title, content, isActive, onClick }) => {
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onClick}>
        <h4>{title}</h4>
        <span>{isActive ? "-" : "+"}</span>
      </div>
      {isActive && <div className="accordion-body">{content}</div>}
    </div>
  );
};
