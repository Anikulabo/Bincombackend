import React, { useState } from "react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";

const ProfileTable = ({
  tabledata,
  activeprofile,
  setActiveprofile,
  topic,
  top,
  isError, // Pass this as a prop to show the error message
  isLoading, // Pass this as a prop to show the spinner
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = tabledata
    ? searchTerm !== ""
      ? tabledata.filter((item) =>
          Object.values(item).some((val) =>
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : tabledata
    : [];

  return (
    <div
      className={`table-container`}
      style={{
        overflowY: "auto",
        maxHeight: "75vh",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: `${top}rem`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 style={{ fontWeight: "bolder" }}>{topic}</h3>
          <div
            className="position-relative"
            style={{ marginLeft: "1rem", width: "100%" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ paddingLeft: "2.5rem" }}
            />
            <i
              className="fas fa-search"
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#aaa",
              }}
            ></i>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <ClipLoader color={"#123abc"} loading={isLoading} size={50} />
          </div>
        ) : isError ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "red",
            }}
          >
            <p>Error loading data: Please try again later.</p>
          </div>
        ) : filteredData.length > 0 && Array.isArray(filteredData) ? (
          <table className="table">
            <thead>
              <tr>
                {Object.keys(filteredData[0]).map((item, headindex) => (
                  <th key={headindex}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  {Object.keys(item).map((detail, childindex) => (
                    <td
                      key={childindex}
                      className={
                        activeprofile &&
                        (item.uniqueid === activeprofile ||
                          item.id === activeprofile ||
                          item.lga_id === activeprofile)
                          ? "bg-primary text-light"
                          : ""
                      }
                      style={{
                        textTransform: "capitalize",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setActiveprofile
                          ? setActiveprofile(
                                item.uniqueid || item.id || item.lga_id,
                                topic
                            )
                          : console.log("we're done");
                      }}
                    >
                      {`${item[detail]}`}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <p>There is no data in our database</p>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileTable.propTypes = {
  tabledata: PropTypes.array.isRequired,
  activeprofile: PropTypes.number.isRequired,
  setActiveprofile: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
  top: PropTypes.number.isRequired,
  isError: PropTypes.bool.isRequired, // Add this prop type
  isLoading: PropTypes.bool.isRequired, // Add this prop type
};

export default ProfileTable;
