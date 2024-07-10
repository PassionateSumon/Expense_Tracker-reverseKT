export const loadState = () => {
    const serializeState = localStorage.getItem('budgetState')
    // console.log(typeof(serializeState))
    if(serializeState) {
        return JSON.parse(serializeState)
    } else {
        return undefined;
    }
}

export const saveState = (state) => {
    const serializeState = JSON.stringify(state);
    localStorage.setItem('budgetState', serializeState)
}