import React from "react";
import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();

  const goToHomeAndActivateAccordion = async () => {
    await new Promise((resolve) => {
      localStorage.setItem("accordion-active", JSON.stringify(true));
      resolve();
    });
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
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil iusto,
      laboriosam fuga eius, ab itaque facere sunt saepe soluta veritatis velit
      cupiditate blanditiis tenetur animi pariatur molestiae consequatur eaque
      impedit.
    </div>
  );
};
