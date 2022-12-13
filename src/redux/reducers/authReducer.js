import { ADD_USER_INFO, EDIT_ERROR, LOGIN_ERROR, LOGOUT } from '../actionsTypes';

const initialState = {
  isLogged: false,
  email: null,
  token: null,
  username: null,
  avatarImage: '',
  loginErrorMessage: null,
  usernameTaken: null,
  emailTaken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_INFO: {
      const { email, token, username, image } = action.userInfo.user;
      return {
        ...state,
        email,
        token,
        username,
        avatarImage: image,
        isLogged: true,
        loginErrorMessage: null,
        usernameTaken: null,
        emailTaken: null,
      };
    }
    case LOGIN_ERROR: {
      return { ...state, loginErrorMessage: action.error };
    }
    case LOGOUT: {
      return { ...state, isLogged: false, email: null, token: null, username: null };
    }
    case EDIT_ERROR: {
      const { username, email } = action.error;
      return { ...state, usernameTaken: username, emailTaken: email };
    }
    default:
      return state;
  }
};

export default authReducer;
