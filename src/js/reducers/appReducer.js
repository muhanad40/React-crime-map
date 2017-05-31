let initialState = {
    crimeLocation: {
        lat: 52.629729,
        lng: -1.131592
    },
    crimes: []
}

export default (state = initialState, action) => {
    let newState = Object.assign({}, state)

    switch (action.type) {
        case 'STORE_CRIMES':
            newState.crimes = action.crimes

            return newState
        default:
            return state
    }
}
