import produce from "immer";

const initialDataProfile = {};
const initialDataMenu = {
  dataProfileMenu: [],
};

const dataProfile = (state = initialDataProfile, action) => {
  return produce(state, (draft) => {
    const darftState = draft;
    switch (action.type) {
      case "SET_DATA_USER_PROFILE":
        darftState.dataProfile = action.dataProfile;
        break;
      default:
        return state;
    }
  });
};

const dataProfileMenu = (state = initialDataMenu, action) => {
  return produce(state, (draft) => {
    const darftState = draft;
    switch (action.type) {
      case "SET_DATA_USER_MENU":
        darftState.dataProfileMenu = action.dataProfileMenu;
        break;
      default:
        return state;
    }
  });
};

export { dataProfile, dataProfileMenu };
