// Accordiondropdown.js
import React, { useState, useContext } from "react";
import { Collapse, Button, Card, CardBody } from "reactstrap";
import { MyContext } from "../App";
import ProfileTable from "./profiletable";

export const Accordiondropdown = ({ title, type }) => {
  // Get context value
  const mycontextvalue = useContext(MyContext);

  // State for toggle
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // Extract context values for the specific type
  const loading = mycontextvalue[`${type}Loading`];
  const error=mycontextvalue[`${type}Error`]
  const selecteditems = mycontextvalue.allselecteditems[type];
  const tableData = mycontextvalue[`${type}Data`];
console.log("for table:",mycontextvalue)
  return (
    <div>
      <Button
        color="light"
        onClick={toggle}
        style={{
          marginBottom: "0",
          marginTop: "15px",
          width: "100%",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <i className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`} />
      </Button>
      <Collapse isOpen={isOpen}>
        <Card style={{ margin: "0" }}>
          <CardBody style={{ padding: "10px" }}>
            <ProfileTable
              topic={type}
              tabledata={tableData?tableData['data']:"an error occured"}
              activeprofile={selecteditems}
              setActiveprofile={mycontextvalue['changeSelectedItems']}
              top={1}
              isLoading={loading}
              isError={error}
            />
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};
