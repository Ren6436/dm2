import { Utils } from "uu5g05";
import lsiEn from "./en.json";
import lsiCs from "./cs.json";

const libraryCode = "uu-jokes-maing01-hi";

const importLsi = (language) => import(`./${language}.json`);
importLsi.libraryCode = libraryCode;

Utils.Lsi.setDefaultLsi(libraryCode, { en: lsiEn, cs: lsiCs });

export default importLsi;