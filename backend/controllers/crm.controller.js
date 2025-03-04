const CRM = require("../models/crm.model.js");

const updateCRMProfile = async (req, res) => {
  try {
    // example: crmKey = homePage.hovers.pm, crmValue = 100
    const { email: rawEmail, crmKey, crmValue } = req.body;
    const email = (rawEmail === "randomPerson") ? `user_${req.ip}` : rawEmail;
    let returnMessage = "";

    let crmProfile = await CRM.findOne({ email });

    if (!crmProfile) {
      // create one for the user
      crmProfile = await CRM.create({
        email: email,
      });
      returnMessage += "Created CRM Profile for user. ";
    }

    // parse the crmKey and update the value
    let base = crmProfile;
    for (let path of crmKey.split(".")){
      base = base[path];
    }
    base.push(crmValue);
    
    await crmProfile.save();
    res.status(200).json({ message: returnMessage + "CRM Values Updated." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: error.message});
  }
}

module.exports = {
  updateCRMProfile
}