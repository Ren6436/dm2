"use strict";
const FrontendMainAbl = require("../../abl/frontend-main-abl.js");

class FrontendMainController {
  init(ucEnv) {
    return FrontendMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return FrontendMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return FrontendMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new FrontendMainController();
