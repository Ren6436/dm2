//@@viewOn:imports
import { createVisualComponent, useSession } from "uu5g05";
import { useSubAppData, useSystemData } from "uu_plus4u5g02";
import { RouteController } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import ListProvider from "../bricks/joke/list-provider";
import ListTitle from "../bricks/joke/list-title";
import ListView from "../bricks/joke/list-view";
import CreateView from "../bricks/joke/create-view";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  container: () => Config.Css.css({ maxWidth: 640, margin: "0px auto" }),
  createView: () => Config.Css.css({ margin: "24px 0px" }),
};
//@@viewOff:css

let Jokes = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Jokes",
  //@@viewOff:statics

  render() {
    //@@viewOn:private
    const subAppDataObject = useSubAppData();
    const systemDataObject = useSystemData();
    const { identity } = useSession();

    const profileList = systemDataObject.data.profileData.uuIdentityProfileList;
    const canCreate = profileList.includes("Authorities") || profileList.includes("Executives");
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <ListProvider>
          {(jokeDataList) => (
            <RouteController routeDataObject={jokeDataList}>
              <div className={Css.container()}>
                {canCreate && (
                  <CreateView
                    jokeDataList={jokeDataList}
                    categoryList={subAppDataObject.data.categoryList}
                    className={Css.createView()}
                  />
                )}
                <ListView
                  jokeDataList={jokeDataList}
                  categoryList={subAppDataObject.data.categoryList}
                  profileList={profileList}
                  identity={identity}
                />
                <ListTitle jokeList={jokeDataList.data} />
              </div>
            </RouteController>
          )}
        </ListProvider>
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Jokes };
export default Jokes;
//@@viewOff:exports