const mongoose = require("mongoose");

const crmSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  homePage: {
    viewTime: {type: [Number], default: []},
    hovers: {
      pm: {type: [Number], default: []},
      habit: {type: [Number], default: []},
      life: {type: [Number], default: []},
    },
  },
  templateIntroPage: {
    viewTime: {type: [Number], default: []},
    fullScrolls: {
      pm: {type: [Number], default: []},
      habit: {type: [Number], default: []},
      life: {type: [Number], default: []},
    },
  },
  loginPage: {
    viewTime: {type: [Number], default: []},
  },
  signupSecondPage: {
    viewTime: {type: [Number], default: []},
  },
  aboutUsPage: {
    viewTime: {type: [Number], default: []},
  },
  templateDeliverPage: {
    viewTime: {type: [Number], default: []},
  },
  userProfilePage: {
    viewTime: {type: [Number], default: []},
  }
});

const CRM = mongoose.model("CRM", crmSchema);

module.exports = CRM;