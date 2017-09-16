export default (state = null, action) => {
    if (action.error) {
        console.error(action.payload);
        return action.payload;
    } else if (action.type === "RESET_ERROR") {
        return null;
    }
    return state;
};
