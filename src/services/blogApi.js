export default class BlogApi {
  _apiBase = 'https://blog.kata.academy/api/';

  async getArticleList(page = 1) {
    const response = await fetch(`${this._apiBase}articles?limit=5&offset=${page - 1 === 0 ? 0 : (page - 1) * 5}`);
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  }

  async getArticle(slug) {
    const response = await fetch(`${this._apiBase}articles/${slug}`);
    if (!response.ok) {
      throw new Error();
    }
    const dataArticle = await response.json();
    return dataArticle;
  }
}
