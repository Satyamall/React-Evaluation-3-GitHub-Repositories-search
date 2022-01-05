

export const loginSuccess = (auth) => {
    return {
      type: "LOGIN_SUCCESS",
      payload: {
        isAuth: auth
      }
    };
  };
  