
export default {
    STATE: 'STATE',
    get() {
        return JSON.parse(localStorage.getItem(this.STATE))
    },
    set(val) {
        localStorage.setItem(this.STATE, JSON.stringify(val))
    },
    getSession(key) {
        return JSON.parse(sessionStorage.getItem(key))
    },
    setSession(key,val) {
        sessionStorage.setItem(key, JSON.stringify(val))
    }
}

