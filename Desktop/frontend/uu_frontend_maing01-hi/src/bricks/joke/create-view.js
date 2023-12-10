//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState, useLsi } from "uu5g05";
import { Button, useAlertBus } from "uu5g05-elements";
import CreateForm from "./create-form.js";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  button: () => Config.Css.css({ display: "block", margin: "0px auto" }),
};
//@@viewOff:css

//@@viewOn:constants
const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};
//@@viewOff:constants

//@@viewOn:helpers
function CreateButton(props) {
  return (
    <Button {...props} colorScheme="primary" significance="highlighted" className={Css.button()}>
      {props.children}
    </Button>
  );
}
//@@viewOff:helpers

const CreateView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    categoryList: PropTypes.array,
    onCreate: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryList: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [mode, setMode] = useState(Mode.BUTTON);
    const { addAlert } = useAlertBus();
    const lsi = useLsi(importLsi, [CreateView.uu5Tag]);

    async function handleSubmit(event) {
      let joke;

      try {
        joke = await props.jokeDataList.handlerMap.create(event.data.value);
      } catch (error) {
        CreateView.logger.error("Error while creating joke", error);
        addAlert({
          header: lsi.createFail,
          message: error.message,
          priority: "error",
        });
        return;
      }

      addAlert({
        message: Utils.String.format(lsi.createDone, joke.name),
        priority: "success",
        durationMs: 2000,
      });

      setMode(Mode.BUTTON);

      props.jokeDataList.handlerMap.load();
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    let content;

    switch (mode) {
      case Mode.BUTTON:
        content = <CreateButton onClick={() => setMode(Mode.FORM)}>{lsi.createJoke}</CreateButton>;
        break;
      default:
        content = (
          <CreateForm onSubmit={handleSubmit} onCancel={() => setMode(Mode.BUTTON)} categoryList={props.categoryList} />
        );
        break;
    }

    return <div {...attrs}>{content}</div>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreateView };
export default CreateView;
//@@viewOff:exports