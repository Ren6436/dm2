//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useEffect, useLsi, useUserPreferences } from "uu5g05";
import { Box, Text, Button, Pending } from "uu5g05-elements";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }),

  header: () =>
    Config.Css.css({
      display: "block",
      padding: 16,
      height: 48,
    }),

  content: (image) =>
    Config.Css.css({
      display: "flex",
      alignItems: image ? "center" : "left",
      justifyContent: image ? "center" : "flex-start",
      height: "calc(100% - 48px - 48px)",
      overflow: "hidden",
    }),

  text: () =>
    Config.Css.css({
      display: "block",
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 16,
    }),

  image: () => Config.Css.css({ width: "100%" }),

  footer: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 48,
      paddingLeft: 16,
      paddingRight: 8,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
function hasManagePermission(joke, identity, profileList) {
  const isAuthority = profileList.includes("Authorities");
  const isExecutive = profileList.includes("Executives");
  const isOwner = joke.uuIdentity === identity.uuIdentity;
  return isAuthority || (isExecutive && isOwner);
}
//@@viewOff:helpers

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    categoryList: PropTypes.array,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryList: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [preferences] = useUserPreferences();
    const lsi = useLsi(importLsi, [Tile.uu5Tag]);

    useEffect(() => {
      if (
        props.jokeDataObject.data.image &&
        !props.jokeDataObject.data.imageUrl &&
        props.jokeDataObject.state === "ready" &&
        props.jokeDataObject.handlerMap?.getImage
      ) {
        props.jokeDataObject.handlerMap
          .getImage(props.jokeDataObject.data)
          .catch((error) => Tile.logger.error("Error loading image", error));
      }
    }, [props.jokeDataObject]);

    function handleDelete(event) {
      event.stopPropagation();
      props.onDelete(props.jokeDataObject);
    }

    function handleUpdate(event) {
      event.stopPropagation();
      props.onUpdate(props.jokeDataObject);
    }

    function handleDetail() {
      props.onDetail(props.jokeDataObject);
    }
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props, Css.main());
    const joke = props.jokeDataObject.data;
    const canManage = hasManagePermission(joke, props.identity, props.profileList);
    const isActionDisabled = props.jokeDataObject.state === "pending";

    return (
      <Box {...elementProps} onClick={handleDetail}>
        <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
          {joke.name}
        </Text>

        <div className={Css.content(joke.image)}>
          {joke.text && !joke.image && (
            <Text category="interface" segment="content" type="medium" colorScheme="building" className={Css.text()}>
              {joke.text}
            </Text>
          )}
          {joke.imageUrl && <img src={joke.imageUrl} alt={joke.name} className={Css.image()} />}
          {joke.image && !joke.imageUrl && <Pending size="xl" />}
        </div>

        <Box significance="distinct" className={Css.footer()}>
          {Utils.String.format(
            lsi.averageRating,
            Utils.Number.format(joke.averageRating.toFixed(joke.averageRating % 1 ? 1 : 0), {
              groupingSeparator: preferences.numberGroupingSeparater,
              decimalSeparator: preferences.numberDecimalSeparator,
            })
          )}
          {canManage && (
            <div>
              <Button
                icon="mdi-pencil"
                onClick={handleUpdate}
                significance="subdued"
                tooltip={lsi.updateTip}
                disabled={isActionDisabled}
              />
              <Button
                icon="mdi-delete"
                onClick={handleDelete}
                significance="subdued"
                tooltip={lsi.deleteTip}
                disabled={isActionDisabled}
              />
            </div>
          )}
        </Box>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Tile };
export default Tile;
//@@viewOff:exports