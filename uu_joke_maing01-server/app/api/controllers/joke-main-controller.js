"use strict";
const JokeMainAbl = require("../../abl/joke-main-abl.js");

class JokeMainController {
  init(ucEnv) {
    return JokeMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return JokeMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return JokeMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new JokeMainController();
