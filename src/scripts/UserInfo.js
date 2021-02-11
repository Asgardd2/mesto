export default class UserInfo {
    constructor(nameElVal,jobElVal,profileTitleTextEl,profileSubtitleTextEl) {
        this._name  = nameElVal;
        this._job = jobElVal;
        this._profileTitleTextEl = profileTitleTextEl;
        this._profileSubtitleTextEl = profileSubtitleTextEl;
    }

    getUserInfo () {
        return {
            name: this._name,
            job: this._job
        }
    }

    setUserInfo(newName,newJob) {
        this._name = newName;
        this._job = newJob; 
        const tekUserInfo = this.getUserInfo();
        this._profileTitleTextEl.textContent = tekUserInfo.name;
        this._profileSubtitleTextEl.textContent = tekUserInfo.job;
    }
}
