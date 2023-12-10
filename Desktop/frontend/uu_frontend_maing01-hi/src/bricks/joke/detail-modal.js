//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi, useLanguage, useUserPreferences } from "uu5g05";
import { Modal, Box, Line, Text, DateTime } from "uu5g05-elements";
import { PersonPhoto } from "uu_plus4u5g02-elements";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  content: () =>
    Config.Css.css({
      width: "100%",
    }),

  image: () =>
    Config.Css.css({
      display: "block",
      width: "100%",
      margin: "auto",
    }),

  text: (modal) =>
    Config.Css.css({
      display: "block",
      marginLeft: modal.style.paddingLeft,
      marginRight: modal.style.paddingRight,
      marginTop: modal.style.paddingTop,
      marginBottom: modal.style.paddingTop,
    }),

  infoLine: (modal) =>
    Config.Css.css({
      display: "block",
      marginLeft: modal.style.paddingLeft,
      marginTop: 8,
    }),

  footer: (modal) =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginTop: 8,
      paddingTop: modal.style.paddingBottom,
      paddingBottom: modal.style.paddingBottom,
      paddingLeft: modal.style.paddingLeft,
      paddingRight: modal.style.paddingRight,
    }),

  photo: () =>
    Config.Css.css({
      marginRight: 8,
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

function InfoLine(props) {
  const { elementProps } = Utils.VisualComponent.splitProps(props);

  return (
    <Text
      {...elementProps}
      category="interface"
      segment="content"
      type="medium"
      significance="subdued"
      colorScheme="building"
    >
      {props.children}
    </Text>
  );
}

function buildCategoryNames(categoryIdList, categoryList) {
  // for faster lookup
  let categoryIds = new Set(categoryIdList);
  return categoryList
    .reduce((acc, category) => {
      if (categoryIds.has(category.id)) {
        acc.push(category.name);
      }
      return acc;
    }, [])
    .join(", ");
}
//@@viewOff:helpers

const DetailModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    categoryList: PropTypes.array,
    onClose: PropTypes.func,
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
    const [language] = useLanguage();
    const lsi = useLsi(importLsi, [DetailModal.uu5Tag]);

    function getRatingCountLsi(ratingCount) {
      const pluralRules = new Intl.PluralRules(language);
      const rule = pluralRules.select(ratingCount);
      return lsi[`${rule}Votes`];
    }

    function getActions() {
      const isActionDisabled = props.jokeDataObject.state === "pending";
      const canManage = hasManagePermission(props.jokeDataObject.data, props.identity, props.profileList);
      let actionList = [];

      if (canManage) {
        actionList.push({
          icon: "mdi-pencil",
          children: lsi.update,
          onClick: () => props.onUpdate(props.jokeDataObject),
          disabled: isActionDisabled,
          primary: true,
        });

        actionList.push({
          icon: "mdi-delete",
          children: lsi.delete,
          onClick: () => props.onDelete(props.jokeDataObject),
          disabled: isActionDisabled,
          collapsed: true,
        });
      }

      return actionList;
    }
    //@@viewOff:private

    //@@viewOn:render
    const joke = props.jokeDataObject.data;

    return (
      <Modal header={joke.name} onClose={props.onClose} actionList={getActions()} open>
        {(modal) => (
          <div className={Css.content()}>
            {joke.text && (
              <Text
                category="interface"
                segment="content"
                type="medium"
                colorScheme="building"
                className={Css.text(modal)}
              >
                {joke.text}
              </Text>
            )}

            {joke.imageUrl && <img src={joke.imageUrl} alt={joke.name} className={Css.image()} />}

            <Line significance="subdued" />

            {joke.categoryIdList?.length > 0 && (
              <InfoLine className={Css.infoLine(modal)}>
                {buildCategoryNames(joke.categoryIdList, props.categoryList)}
              </InfoLine>
            )}

            <InfoLine className={Css.infoLine(modal)}>
              <DateTime value={joke.sys.cts} dateFormat="short" timeFormat="none" />
            </InfoLine>

            <InfoLine className={Css.infoLine(modal)}>
              {Utils.String.format(getRatingCountLsi(joke.ratingCount), joke.ratingCount)}
            </InfoLine>

            <Box significance="distinct" className={Css.footer(modal)}>
              <span>
                <PersonPhoto uuIdentity={joke.uuIdentity} size="xs" className={Css.photo()} />
                <Text category="interface" segment="content" colorScheme="building" type="medium">
                  {joke.uuIdentityName}
                </Text>
              </span>
              <span>
                {Utils.String.format(
                  lsi.averageRating,
                  Utils.Number.format(joke.averageRating.toFixed(joke.averageRating % 1 ? 1 : 0), {
                    groupingSeparator: preferences.numberGroupingSeparater,
                    decimalSeparator: preferences.numberDecimalSeparator,
                  })
                )}
              </span>
            </Box>
          </div>
        )}
      </Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailModal };
export default DetailModal;
//@@viewOff:exports