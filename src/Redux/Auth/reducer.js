
const initState = {
  isAuth: false
};

function reducer(state = initState, {type}) {
  switch (type) {
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isAuth: true,
      };
    }
    default:
      return state;
  }
}

export default reducer;
