export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // Получить начальные карточки (GET)
    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
            headers: this._headers,
        }).then(this._checkRes);
    }

    // Добавить новую карточку (POST)
    addNewCard(card) {
        return fetch(`${this._baseUrl}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            }),
        }).then(this._checkRes);
    }

    // Удалить карточку (DELETE)
    deleteCard(id) {
        return fetch(`${this._baseUrl}cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkRes);
    }

    // Получить данные пользователя (GET)
    getUserData() {
        return fetch(`${this._baseUrl}users/me`, {
            method: "GET",
            headers: this._headers,
        }).then(this._checkRes);
    }

    // Заменить данные пользователя (PATCH)
    editUserData(data) {
        return fetch(`${this._baseUrl}users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then(this._checkRes);
    }

    // Заменить аватар (PATCH)
    editUserAvatar(avatar) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar['link']
            }),
        }).then(this._checkRes);
    }

    // Поставть лайк карточке (PUT)
    likeHandler(id) {
        return fetch(`${this._baseUrl}cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._checkRes);
    }

    // Удалить лайк карточки (DELETE)
    deleteLikeHandler(id) {
        return fetch(`${this._baseUrl}cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkRes);
    }

    // Отрисовка всех данных на начальной странице
    getInitialData() {
        return Promise.all([this.getUserData(), this.getInitialCards()]);
    }
}