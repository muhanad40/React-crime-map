let today = new Date()

let initialState = {
    crimeLocation: {
        lat: 52.629729,
        lng: -1.131592
    },
    crimeDate: `${today.getFullYear()}-${today.getMonth()-1}`,
    crimes: []
}

export default (state = initialState, action) => {
    let newState = Object.assign({}, state)

    switch (action.type) {
        case 'SET_CRIME_DATE':
            newState.crimeDate = action.date

            return newState

        case 'STORE_CRIMES':
            newState.crimes = action.crimes

            return newState
        default:
            return state
    }
}
