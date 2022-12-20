import BlogApi from '../services/blogApi';

import {
  ARTICLES_LOAD,
  GET_ARTICLE_BY_ID,
  ADD_USER_INFO,
  LOGIN_ERROR,
  LOGOUT,
  EDIT_ERROR,
  DISPLAY_LOADING_ON,
  DISPLAY_LOADING_OFF,
  DISPLAY_ERROR_ON,
  CREATE_ARTICLE,
} from './actionsTypes';

const blogApi = new BlogApi();

export const loaderOn = () => {
  return { type: DISPLAY_LOADING_ON };
};

export const loaderOff = () => {
  return { type: DISPLAY_LOADING_OFF };
};

export const errorOn = (error) => {
  return { type: DISPLAY_ERROR_ON, error };
};

export const articlesLoad = (page) => {
  return (dispatch) => {
    dispatch(loaderOn());
    blogApi
      .getArticleList(page)
      .then((data) => {
        dispatch({ type: ARTICLES_LOAD, articles: data.articles, count: data.articlesCount });
        dispatch(loaderOff());
      })
      .catch(() => {
        dispatch(loaderOff());
        dispatch(errorOn('Something wrong..'));
      });
  };
};

export const getArticleById = (id) => {
  return (dispatch) => {
    dispatch(loaderOn());
    blogApi
      .getArticle(id)
      .then((dataArticle) => {
        dispatch({ type: GET_ARTICLE_BY_ID, article: dataArticle.article });
        dispatch(loaderOff());
      })
      .catch(() => {
        dispatch(loaderOff());
        dispatch(errorOn('Something wrong..'));
      });
  };
};

export const addUserInfo = (userInfo) => {
  return { type: ADD_USER_INFO, userInfo };
};

export const loginError = (error) => {
  return { type: LOGIN_ERROR, error };
};

export const loginUser = (userData) => {
  return (dispatch) => {
    blogApi.loginUser(userData).then((user) => {
      if (user.user) {
        return dispatch(addUserInfo(user));
      }
      return dispatch(loginError(user.errors));
    });
  };
};

export const logoutUser = () => {
  return { type: LOGOUT };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      return blogApi.getUser().then((user) => {
        dispatch(addUserInfo(user));
      });
    }
    return dispatch(logoutUser());
  };
};

export const editError = (error) => {
  return { type: EDIT_ERROR, error };
};

export const editUser = (userData) => {
  return (dispatch) => {
    blogApi.updateUser(userData).then((user) => {
      if (user.user) {
        dispatch(addUserInfo(user));
      }
      if (user.errors) {
        dispatch(editError(user.errors));
      }
    });
  };
};

export const likeArticle = (data) => {
  return { type: 'LIKE_ARTICLE', data };
};

export const unlikeArticle = (data) => {
  return { type: 'UNLIKE_ARTICLE', data };
};

export const toggleLikeArticle = (slug, favorited) => {
  return (dispatch) => {
    if (favorited) {
      blogApi.unlikeArticle(slug).then((res) => {
        dispatch(unlikeArticle(res));
      });
    } else {
      blogApi.likeArticle(slug).then((res) => {
        dispatch(likeArticle(res));
      });
    }
  };
};

export const createArticle = () => {
  return { type: CREATE_ARTICLE };
};
