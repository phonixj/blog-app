import BlogApi from '../services/blogApi';

import { ARTICLES_LOAD, CHANGE_PAGE, GET_ARTICLE_BY_ID } from './actionsTypes';

const loadApi = new BlogApi();

export const articlesLoad = (page) => {
  return (dispatch) => {
    loadApi.getArticleList(page).then((data) => {
      dispatch({ type: ARTICLES_LOAD, articles: data.articles, count: data.articlesCount });
    });
  };
};

export const changePage = (page) => {
  return { type: CHANGE_PAGE, page };
};

export const getArticleById = (id) => {
  return (dispatch) => {
    loadApi.getArticle(id).then((dataArticle) => {
      dispatch({ type: GET_ARTICLE_BY_ID, article: dataArticle.article });
    });
  };
};
