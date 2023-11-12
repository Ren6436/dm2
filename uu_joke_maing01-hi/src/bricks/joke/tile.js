//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Box, Text, Line, Button, DateTime } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string,
      imageUrl: PropTypes.string,
      numberOfMember: PropTypes.number.isRequired,
      uuIdentityName: PropTypes.string.isRequired,
      sys: PropTypes.shape({
        cts: PropTypes.string,
      }),
    }).isRequired,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function handleDelete(event) {
      props.onDelete(new Utils.Event(props.joke, event));
    }

    function handleUpdate(event) {
      props.onUpdate(new Utils.Event(props.joke, event));
    }
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <Box {...elementProps}>
        <Text category="interface" segment="title" type="minor" colorScheme="building">
          {props.joke.name}
        </Text>
        <div>
          <Text category="interface" segment="content" type="medium" colorScheme="building">
            {props.joke.text}
          </Text>
        </div>
        <div>
          <img src={props.joke.imageUrl} />
        </div>
        <Line significance="subdued" />
        <div>
          <Text category="interface" segment="content" type="medium" significance="subdued" colorScheme="building">
            {props.joke.uuIdentityName}
          </Text>
        </div>
        <div>
          <Text category="interface" segment="content" type="medium" significance="subdued" colorScheme="building">
            <DateTime value={props.joke.sys.cts} />
          </Text>
        </div>
        <Box significance="distinct">
          {`Number of member: ${props.joke.numberOfMember.toFixed(props.joke.numberOfMember % 1 ? 1 : 0)} / 5`}
          <Button icon="mdi-pencil" onClick={handleUpdate} significance="subdued" tooltip="Update" />
          <Button icon="mdi-delete" onClick={handleDelete} significance="subdued" tooltip="Delete" />
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