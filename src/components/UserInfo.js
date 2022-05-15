export class UserInfo {
    constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
        this._profileName = userNameSelector;
        this._profileInfo = userInfoSelector;
        this._profileAvatar = userAvatarSelector;
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
        this._profileAvatar.src = data.avatar;
        console.log(data)
    }

    // setUserAvatar(item) {
    //     this._profileAvatar.src = item;
    // }
}