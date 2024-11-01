import React, { useState } from "react";
import { familyTree } from "../constant";

const ChildDisplay = ({ reverse }) => {
  const [expandedParent, setExpandedParent] = useState(null);
  const parents = Object.values(familyTree);
  const sortChildren = (children) => {
    return reverse
      ? [...children].sort((a, b) => b.age - a.age)
      : [...children].sort((a, b) => a.age - b.age);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>
        Eldest Children with Options
      </h2>
      <div
        style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {["Type 1", "Type 2"].map((type, index) => {
          const filteredParents = parents.filter(
            (parent) => parent.type === index + 1
          );
          const backgroundColor = index === 0 ? "#e7f3fe" : "#f8d7da";
          const titleColor = index === 0 ? "#007bff" : "#dc3545";

          return (
            <div
              key={type}
              style={{
                flex: 1,
                margin: "0 10px",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h3 style={{ color: titleColor }}>{type} Parents</h3>
              {filteredParents.map((parent) => {
                const eldestChild = sortChildren(parent.children)[0];
                const otherChildren = sortChildren(parent.children).slice(1);

                return (
                  <div
                    key={parent.name}
                    style={{
                      marginBottom: "15px",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <h4 style={{ margin: 0 }}>
                      {parent.name} (Age: {parent.age})
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <div>
                        {eldestChild.name} - {eldestChild.age} years old
                      </div>
                      <button
                        onClick={() =>
                          setExpandedParent(
                            expandedParent === parent.name ? null : parent.name
                          )
                        }
                        style={{
                          marginLeft: "10px",
                          padding: "5px",
                          borderRadius: "5px",
                          border: "none",
                          backgroundColor: "#007bff",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {expandedParent === parent.name ? "Hide" : "Select"}
                      </button>
                    </div>
                    {expandedParent === parent.name &&
                      otherChildren.length > 0 && (
                        <div style={{ paddingLeft: "10px", marginTop: "10px" }}>
                          <strong>Other Children:</strong>
                          {otherChildren.map((child) => (
                            <div key={child.name}>
                              {child.name} - {child.age} years old
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChildDisplay;
