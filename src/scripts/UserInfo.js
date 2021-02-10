export default class UserInfo {
    constructor(nameEl, jobEl) {
        this._nameEl = nameEl;
        this._jobEl = jobEl;
        this._name  = this._nameEl.value;
        this._job = this._jobEl.value;
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
    }
}
