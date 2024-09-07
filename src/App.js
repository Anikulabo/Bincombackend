import Sidebar from "./components/sidebar";
import { Accordiondropdown } from "./components/accordion";
import ProfileTable from "./components/profiletable";
import { Textinput } from "./components/textinput";
import React, { createContext, useState, useCallback, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const state_id = 25;

// Fetch LGA data
const fetchLGA = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/lga/state/${state_id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error in the process");
    throw error;
  }
};

// Fetch Ward data
const fetchWard = async (lga_id, searchitem) => {
  try {
    const response = !searchitem
      ? await axios.get(`http://localhost:3001/api/wards/${lga_id}`)
      : await axios.get(
          `http://localhost:3001/api/wards/${lga_id}/${searchitem}`
        );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching wards:", error);
    throw error;
  }
};
const fetchpollingunitresults = async (polling_unit_uniqueid) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/puresults/${polling_unit_uniqueid}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching polling units:", error);
    throw error;
  }
};
const fetchpollingunit = async (lga_id, uniquewardid) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/polling-units/${lga_id}/${uniquewardid}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching polling units:", error);
    throw error;
  }
};

const fetchlgaresult = async (lga_id) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/lgaresults/${lga_id}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching lga results:", error);
    throw error;
  }
};
const fetchallparties = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/parties`);
    return response.data;
  } catch (error) {
    console.error("Error fetching parties:", error);
    throw error;
  }
};
// Actions for the sidebar
const allactions = [
  "Polling_unit results",
  "View LGA result",
  "Add a polling_unit result",
];
// Create context
export const MyContext = createContext();

function MyProvider({
  children,
  WardData,
  WardError,
  WardLoading,
  PartyData,
  PartyError,
  PartyLoading,
  LGAData,
  LGAError,
  LGALoading,
  PuData,
  PuError,
  PuLoading,
  allselecteditems,
  changeSelectedItems,
}) {
  return (
    <MyContext.Provider
      value={{
        LGAData,
        LGAError,
        LGALoading,
        WardData,
        WardError,
        WardLoading,
        PartyData,
        PartyError,
        PartyLoading,
        PuData,
        PuError,
        PuLoading,
        allselecteditems,
        changeSelectedItems,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

function App() {
  const [activeaction, setActiveaction] = useState(allactions[0]);
  const [data, setData] = useState({
    entered_by_user: "",
    party_score: 0,
  });
  const changeactiveaction = (value) => {
    setActiveaction(value);
  };
  const updatedata = (event, part) => {
    let value =
      !isNaN(Number(event.target.value)) && event.target.value !== ""
        ? Number(event.target.value)
        : event.target.value;
    setData({ ...data, [part]: value });
  };
  const [allselecteditems, setAllselecteditems] = useState({
    LGA: 0,
    Ward: 0,
    Pu: 0,
    Party: 0,
  });

  // Function to change selected items
  const changeSelectedItems = useCallback(
    (value, type) => {
      setAllselecteditems({ ...allselecteditems, [type]: value });
      console.log(value);
    },
    [allselecteditems]
  );

  // Fetch LGA data using React Query
  const {
    data: LGAData,
    error: LGAError,
    isLoading: LGALoading,
  } = useQuery({
    queryKey: ["Lga"],
    queryFn: fetchLGA,
  });
  const {
    data: PartyData,
    error: PartyError,
    isLoading: PartyLoading,
  } = useQuery({
    queryKey: ["Party"],
    queryFn: fetchallparties,
    enabled: activeaction === allactions[2],
  });
  const submitdata = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Correct comparison operator
    const party_abbreviation = PartyData["data"].find(
      (item) => item.id === allselecteditems["Party"]
    )?.partyid;

    const unfilled = [];
    const data_to_be_submitted = {
      ...data,
      party_abbreviation,
      polling_unit_uniqueid: allselecteditems["Pu"],
    };

    // Append only non-empty values to formData
    for (const key of Object.keys(data_to_be_submitted)) {
      if (
        data_to_be_submitted[key] &&
        data_to_be_submitted[key] !== 0 &&
        data_to_be_submitted[key] !== ""
      ) {
        formData.append(key, data_to_be_submitted[key]);
      } else {
        unfilled.push(key);
      }
    }

    if (unfilled.length <= 0) {
      try {
        const response = await axios.post(
          `http://localhost:3001/api/puresults`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle response errors
        if (response.status !== 200) {
          alert(`Submission failed: ${response.statusText}`);
          throw new Error(`Submission failed: ${response.statusText}`);
        } else {
          alert("Submission successful!");
        }
      } catch (error) {
        console.log("Error:", error);
        alert("There was an error with your request. Please try again.");
      }
    } else {
      alert(`You need to fill the following fields: ${unfilled.join(", ")}`);
    }
  };
  const {
    data: LGAresultData,
    error: LGAresultError,
    isLoading: LGAresultLoading,
  } = useQuery({
    queryKey: ["Lgaresult", allselecteditems["LGA"]], // Include `allselecteditems["LGA"]` in queryKey to trigger refetch
    queryFn: () => fetchlgaresult(allselecteditems["LGA"]), // Correct: Pass a function that calls fetchlgaresult
    enabled: activeaction === allactions[1] && allselecteditems["LGA"] > 0,
  });
  // Fetch Ward data based on selected LGA
  const {
    data: WardData,
    error: WardError,
    isLoading: WardLoading,
  } = useQuery({
    queryKey: ["Ward", allselecteditems["LGA"]], // Dependent on LGA
    queryFn: () => fetchWard(allselecteditems["LGA"]), // Fetch wards based on selected LGA
    enabled: allselecteditems["LGA"] > 0, // Only run query if LGA is selected
  });
  const {
    data: PuData,
    error: PuError,
    isLoading: PuLoading,
  } = useQuery({
    queryKey: ["Pu", allselecteditems["LGA"], allselecteditems["Ward"]], // Dependent on LGA
    queryFn: () =>
      fetchpollingunit(allselecteditems["LGA"], allselecteditems["Ward"]), // Fetch wards based on selected LGA
    enabled: allselecteditems["LGA"] > 0 && allselecteditems["Ward"] > 0, // Only run query if LGA is selected
  });
  const {
    data: PuresultData,
    error: PuresultError,
    isLoading: PuresultLoading,
  } = useQuery({
    queryKey: ["Puresult", allselecteditems["Pu"]], // Dependent on LGA
    queryFn: () => fetchpollingunitresults(allselecteditems["Pu"]), // Fetch wards based on selected LGA
    enabled: allselecteditems["Pu"] > 0, // Only run query if LGA is selected
  });
  useEffect(() => {
    const newselecteditems={}
    for(let key of Object.keys(allselecteditems)){
      newselecteditems[key]=0
    }
    setAllselecteditems(newselecteditems)
  }, [activeaction]);
  return (
    <div className="container-fluid main-content">
      <div className="row">
        <Sidebar
          items={allactions}
          handleButtonClick={changeactiveaction}
          active={activeaction}
        />
        <div className="col-md-10 content">
          {LGALoading ? (
            <p>Loading LGA data...</p>
          ) : LGAError ? (
            <p>Error loading LGA data: {LGAError.message}</p>
          ) : (
            <MyProvider
              LGAData={LGAData}
              LGAError={LGAError}
              LGALoading={LGALoading}
              WardData={WardData}
              WardError={WardError}
              WardLoading={WardLoading}
              PartyData={PartyData}
              PartyError={PartyError}
              PartyLoading={PartyLoading}
              PuData={PuData}
              PuError={PuError}
              PuLoading={PuLoading}
              allselecteditems={allselecteditems}
              changeSelectedItems={changeSelectedItems}
            >
              <Accordiondropdown
                title={"Select LGA of Interest"}
                type={"LGA"}
              />
              {allselecteditems["LGA"] > 0 &&
                WardData &&
                activeaction !== allactions[1] && (
                  <Accordiondropdown
                    title={"Select Ward within LGA of Interest"}
                    type={"Ward"}
                  />
                )}
              {allselecteditems["Ward"] > 0 &&
                activeaction !== allactions[1] && (
                  <Accordiondropdown
                    title={"Select Polling_unit within Ward of Interest"}
                    type={"Pu"}
                  />
                )}
              {allselecteditems["Pu"] > 0 && activeaction === allactions[0] && (
                <ProfileTable
                  tabledata={
                    PuresultData ? PuresultData["data"] : ["an error occured"]
                  }
                  topic={
                    PuData
                      ? `here is the result for ${
                          PuData["data"].find(
                            (item) => item.uniqueid === allselecteditems["Pu"]
                          )["polling_unit_name"]
                        }`
                      : ""
                  }
                  top={1}
                  isLoading={PuresultLoading}
                  isError={PuresultError?PuresultError:false} 
                />
              )}
              {activeaction === allactions[1] &&
                allselecteditems["LGA"] > 0 && (
                  <div>
                    {/* {LGAresultData?console.log("for result table:",LGAresultData):console.log("nothing")} */}
                    <ProfileTable
                      tabledata={
                        LGAresultData
                          ? LGAresultData["data"]
                          : ["an error occured"]
                      }
                      topic={`here is the result for ${
                        LGAData["data"].find(
                          (item) => item.lga_id === allselecteditems["LGA"]
                        )["lga_name"]
                      }`}
                      top={1}
                      isLoading={LGAresultLoading}
                      isError={LGAError?LGAError:false}
                    />
                  </div>
                )}
              {activeaction === allactions[2] && (
                <div>
                  <Textinput
                    variable={"enter name"}
                    username={data["entered_by_user"]}
                    placeholder={"please enter your name"}
                    action={updatedata}
                    ctrl={"entered_by_user"}
                  />
                  <Accordiondropdown
                    title={"Select Party of Interest"}
                    type={"Party"}
                  />
                  <Textinput
                    variable={"enter party's score"}
                    username={
                      data["party_score"] > 0 ? data["party_score"] : ""
                    }
                    placeholder={"please enter the party's score"}
                    action={updatedata}
                    ctrl={"party_score"}
                  />
                  <button
                    className="btn btn-light text-light mt-5"
                    style={{ backgroundColor: "rgb(81, 194, 37)" }}
                    onClick={(event) => submitdata(event)}
                  >
                    <i className="fas fa-check"></i>
                    <span style={{ marginLeft: "3px" }}>Submit</span>
                  </button>
                </div>
              )}
            </MyProvider>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
