// Import the db object from your models folder
const db = require("../models");
const { format } = require("date-fns");

// Access a specific model from the db object
// Import the db object from your models folder

// Access a specific model from the db object
const Party = db.Party; // Ensure this matches the model name exactly

// Function to fetch data using the model

// Function to fetch data using the model
/*const getlgaresult=(req,res)=>{

}*/
exports.getAllParties = async (req, res) => {
  try {
    const allparties=await Party.findAll({attributes:['id','partyid']})
    if(allparties.length>0){
        return res.status(200).json({data:allparties})
    }else{
        return res.status(404).json({message:"there is no party in our database for now"})
    }
  } catch (error) {
    console.error("error:",error)
    return res.status(500).json({message:"internal server error"})
  }
};


