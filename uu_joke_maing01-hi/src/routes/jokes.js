//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import ListProvider from "../bricks/joke/list-provider";
import ListView from "../bricks/joke/list-view";
import CreateView from "../bricks/joke/create-view";
//@@viewOff:imports

let Jokes = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Jokes",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <ListProvider>
          {({ jokeList, remove, update, create }) => (
            <>
              <CreateView onCreate={create} style={{ maxWidth: 400, margin: "24px auto", display: "block" }} />
              <ListView jokeList={jokeList} onDelete={remove} onUpdate={update} />
            </>
          )}
        </ListProvider>
      </>
    );
    //@@viewOff:render
  },
});

Jokes = withRoute(Jokes, { authenticated: true });

//@@viewOn:exports
export { Jokes };
export default Jokes;
//@@viewOff:exports