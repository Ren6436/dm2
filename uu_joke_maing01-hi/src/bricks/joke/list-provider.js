//@@viewOn:imports
import { createComponent, Utils, useState } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

const initialJokeList = [
  {
    id: Utils.String.generateId(),
    name: "Shopping list for holidays by Orlando",
    text: "In this shopping list you see all products for holidays, ho-ho-ho",
    numberOfMember: 4,
    uuIdentityName: "Orlando Blum",
    sys: { cts: "2022-03-17T09:48:38.990Z" },
  },
  {
    id: Utils.String.generateId(),
    name: "Shopping list",
    text: "Shopping list for every days",
    numberOfMember: 3,
    uuIdentityName: "Marry",
    sys: { cts: "2022-02-14T10:48:38.990Z" },
  },
];

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [jokeList, setJokeList] = useState(initialJokeList);

    function remove(joke) {
      setJokeList((prevJokeList) => prevJokeList.filter((item) => item.id !== joke.id));
    }

    function create(values) {
      const joke = {
        ...values,
        id: Utils.String.generateId(),
        numberOfMember: Math.round(Math.random() * 5), // <0, 5>
        uuIdentityName: "Gerald of Rivia",
        sys: {
          cts: new Date().toISOString(),
        },
      };

      setJokeList((prevJokeList) => [...prevJokeList, joke]);
      return joke;
    }

    function update() {
      throw new Error("Shopping list update is not implemented yet.");
    }
    //@@viewOff:private

    //@@viewOn:render
    const value = { jokeList, remove, update, create };
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports