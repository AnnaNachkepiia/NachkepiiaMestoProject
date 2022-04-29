export class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._profileName = userNameSelector;
        this._profileInfo = userInfoSelector;
        this._popupForm = document.querySelector('.popup__form-container');
        this._userNameInput = this._popupForm.querySelector('.popup__edit-form_type_name');
        this._userAboutInput = this._popupForm.querySelector('.popup__edit-form_type_about');
    }
    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._profileName.textContent;
        this._userInfo.about = this._profileInfo.textContent;
        return this._userInfo;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileInfo.textContent = data.about;
    }

}