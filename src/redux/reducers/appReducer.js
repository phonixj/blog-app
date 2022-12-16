import { DISPLAY_ERROR_ON, DISPLAY_LOADING_OFF, DISPLAY_LOADING_ON } from '../actionsTypes';

const initialState = {
  loading: false,
  error: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING_ON: {
      return { ...state, loading: true };
    }
    case DISPLAY_LOADING_OFF: {
      return { ...state, loading: false };
    }
    case DISPLAY_ERROR_ON: {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
};

export default appReducer;
