import favicon from "./img/inec.jpg";
import React from "react";
import { Nav } from "react-bootstrap";
import "./top.css";
const Sidebar = ({ items, handleButtonClick, active }) => {
  return (
    <div className="bg-light col-md-2 bg-light sidebar">
      <div className="inline-container">
        <img
          className="round-image"
          src={favicon}
          alt="the school logo should show here"
          height="40px"
        />
        <p>
          INEC
          <small className="small-text">
            Independent Electoral Committee
          </small>
        </p>
      </div>
      <Nav className="flex-column">
        {items.map((item, index) => {
          return (
            <Nav.Item key={index}>
              <Nav.Link
                className={`nav-link w-100 ${item === active ? "bg-primary text-white" : ""}`}
                onClick={() =>
                  handleButtonClick
                    ? handleButtonClick(item)
                    : alert("no action yet")
                }
              >
                {item}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};

export default Sidebar;
