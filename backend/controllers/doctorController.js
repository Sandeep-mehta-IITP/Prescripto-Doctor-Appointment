import doctorModel from "../models/doctorModel.js";

const changeAvailablity = async (req, res) => {
  try {

    const { docId } = req.body;

    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, {
        available: !docData.available 
    })

    res.status(200).json({
        success: true,
        message: "Doctor availability updated successfully."
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// frontend ke liye doctors ka data fetch krna 

const doctorList = async (req, res) => {

  try {
    
    const doctors = await doctorModel.find({}).select(['-password', '-email'])

    res.status(200).json({
      success: true,
      doctors
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}

export { changeAvailablity, doctorList }
