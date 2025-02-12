const Template = require("../models/template.model.js");

const createTemplate = async (req, res) => {
    try {
        const template = await Template.create(req.body);
        res.status(200).json(template);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllTemplates = async (req, res, next) => {
    try {
        // const response = "Hello World";
        const response = await Template.find({});
        // console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

  

module.exports = {
    createTemplate,
    getAllTemplates
};


  