export default class BlogApi {
  _apiBase = 'https://blog.kata.academy/api/';

  async getArticleList(page = 1) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this._apiBase}articles?limit=5&offset=${page - 1 === 0 ? 0 : (page - 1) * 5}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  }

  async getArticle(slug) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this._apiBase}articles/${slug}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) {
      throw new Error();
    }
    const dataArticle = await response.json();
    return dataArticle;
  }

  async registerUser({ username, email, password }) {
    const newUser = JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    });
    const response = await fetch(`${this._apiBase}users`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: newUser,
    });
    const result = await response.json();
    return result;
  }

  async loginUser({ email, password }) {
    const response = await fetch(`${this._apiBase}users/login`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    const result = await response.json();
    return result;
  }

  async getUser() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this._apiBase}user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = response.json();
    return result;
  }

  async updateUser({ username, email, newPassword, avatarUrl }) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this._apiBase}user`, {
      method: 'put',

      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        user: {
          username,
          email,
          password: newPassword,
          image: avatarUrl,
        },
      }),
    });
    const result = await response.json();
    return result;
  }

  async createArticle({ title, text, shortDescription, tags }) {
    const token = localStorage.getItem('token');
    const tagList = tags.map((tag) => {
      return tag.name;
    });

    const response = await fetch(`${this._apiBase}articles`, {
      method: 'post',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        article: {
          title,
          description: shortDescription,
          body: text,
          tagList,
        },
      }),
    });
    const result = await response.json();
    return result;
  }

  async editArticle({ title, shortDescription, text, tags }, slug) {
    const token = localStorage.getItem('token');
    const tagList = tags.map((tag) => {
      return tag.name;
    });

    const response = await fetch(`${this._apiBase}articles/${slug}`, {
      method: 'put',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        article: {
          title,
          description: shortDescription,
          body: text,
          tagList,
        },
      }),
    });
    const result = await response.json();
    return result;
  }

  async deleteArticle(slug) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${this._apiBase}articles/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json;charset=utf-8' },
      });
      if (response.status === 403) {
        throw new Error('Error');
      }
      return response;
    } catch (e) {
      return e.message;
    }
  }

  async likeArticle(slug) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this._apiBase}articles/${slug}/favorite`, {
      method: 'post',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json;charset=utf-8' },
    });
    return response.json();
  }

  async unlikeArticle(slug) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this._apiBase}articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json;charset=utf-8' },
    });
    return response.json();
  }
}
