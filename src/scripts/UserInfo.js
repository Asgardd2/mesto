export default class UserInfo {
    constructor(nameSelector, infoSelector) {
        this._userName = document.querySelector(`.${nameSelector}`);
        this._userInfo = document.querySelector(`.${infoSelector}`);
      }
    
      getUserInfo() {
        return {
          userName: this._userName.textContent,
          userDescription: this._userInfo.textContent
        }
      }
    
      setUserInfo(newName, newInfo) {
        this._userName.textContent = newName;
        this._userInfo.textContent = newInfo;
      } 
}
