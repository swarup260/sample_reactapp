
export default {
    STATE: 'STATE',
    get() {
        return JSON.parse(localStorage.getItem(this.STATE))
    },
    set(val) {
        localStorage.setItem(this.STATE, JSON.stringify(val))
    }
}

