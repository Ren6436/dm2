import Calls from "../src/calls.js";
import { Client } from "uu_appg01";

const appAssetsBaseUri = (
  document.baseURI ||
  (document.querySelector("base") || {}).href ||
  location.protocol + "//" + location.host + location.pathname
).replace(/^(.*)\/.*$/, "$1/"); // strip what's after last slash

const mockBaseUri = (process.env.MOCK_DATA_BASE_URI || appAssetsBaseUri) + "mock/data/";
const originalGet = Client.get;

Client.get = async (url, dtoIn, clientOpts) => {
  if (url.includes("sys/uuAppWorkspace/load")) {
    const mockUrl = mockBaseUri + "sys/uuAppWorkspace/load.json";
    console.log(mockUrl)
    const response = await fetch(mockUrl);
    return { ...response, data: await response.json() };
  } else {
    return originalGet(url, dtoIn, clientOpts);
  }
};

Calls.call = async (...args) => {
  const url = args.at(1);

  if (url === "uu-app-binarystore/getBinaryData") {
    const response = await fetch("http://placekitten.com/600/600");
    return await response.blob();
  } else {
    const mockUrl = mockBaseUri + url + ".json";
    const response = await fetch(mockUrl);
    return await response.json();
  }
};

Calls.getCommandUri = (useCase) => {
  return useCase;
};

export default Calls;