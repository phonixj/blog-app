import BlogApi from '../services/blogApi';

import {
  ARTICLES_LOAD,
  CHANGE_PAGE,
  GET_ARTICLE_BY_ID,
  ADD_USER_INFO,
  LOGIN_ERROR,
  LOGOUT,
  EDIT_ERROR,
} from './actionsTypes';

const blogApi = new BlogApi();

export const articlesLoad = (page) => {
  return (dispatch) => {
    blogApi.getArticleList(page).then((data) => {
      dispatch({ type: ARTICLES_LOAD, articles: data.articles, count: data.articlesCount });
    });
  };
};

export const changePage = (page) => {
  return { type: CHANGE_PAGE, page };
};

export const getArticleById = (id) => {
  return (dispatch) => {
    blogApi.getArticle(id).then((dataArticle) => {
      dispatch({ type: GET_ARTICLE_BY_ID, article: dataArticle.article });
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
    if (!token) {
      dispatch(logoutUser());
    }
    blogApi.getUser().then((user) => {
      dispatch(addUserInfo(user));
    });
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
