export default class UserInfo {
    constructor(nameSelector, infoSelector, avatarSelector) {
        this._userName = document.querySelector(`.${nameSelector}`);
        this._userInfo = document.querySelector(`.${infoSelector}`);
        this._avatarSelector = document.querySelector(`.${avatarSelector}`);
    
      }
      
      getUserInfo() {
        return {
          userName: this._userName.textContent,
          userDescription: this._userInfo.textContent,
          userId: this._userId
        }
      }
    
      setUserInfo(newName, newInfo,userId) {
        this._userName.textContent = newName;
        this._userInfo.textContent = newInfo;
        this._userId = userId;
      } 

      setUserAvatar(newSrc) {
        this._avatarSelector.src = newSrc;
      } 
}
