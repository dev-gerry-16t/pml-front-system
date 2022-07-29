const setDataUserProfile = (dataProfile) => ({
  type: "SET_DATA_USER_PROFILE",
  dataProfile,
});

const setDataUserMenu = (dataProfileMenu) => ({
  type: "SET_DATA_USER_MENU",
  dataProfileMenu,
});

export { setDataUserProfile, setDataUserMenu };
