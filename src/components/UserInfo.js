export class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._profileName = userNameSelector;
        this._profileInfo = userInfoSelector;
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