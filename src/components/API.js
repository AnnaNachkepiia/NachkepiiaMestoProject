export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
                headers: {
                    authorization: 'a21500ca-3216-4c89-8f3a-5037d5204e6f'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    };

    addNewCard(card) {
        return fetch(`${this._baseUrl}cards`, {
                method: 'POST',
                headers: {
                    authorization: 'a21500ca-3216-4c89-8f3a-5037d5204e6f'
                },
                body: JSON.stringify(card)
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    // другие методы работы с API
}