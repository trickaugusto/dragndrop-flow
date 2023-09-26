export function saveLocalStorage(dataObj) {
    localStorage.setItem('state', JSON.stringify(dataObj));
}

export function getStateFromLocalStorage() {
    let data = localStorage.getItem('state');
    if (data !== undefined) {
        return JSON.parse(data);
    }
}
