export class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._userNameSelector = userNameSelector;
        this._userInfoSelector = userInfoSelector;
        this._popupForm = document.querySelector('.popup__form-container');
        this._userNameInput = this._popupForm.querySelector('.popup__edit-form_type_name');
        this._userAboutInput = this._popupForm.querySelector('.popup__edit-form_type_about');
    }
    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._userNameSelector.textContent;
        this._userInfo.about = this._userInfoSelector.textContent;
        return this._userInfo;
    }

    setUserInfo() {
        this._userNameSelector.textContent = this._userNameInput.value;
        this._userInfoSelector.textContent = this._userAboutInput.value;
    }

}