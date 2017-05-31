import superagent from 'superagent'

let today = new Date(),
    fetchCrimesTimer = null

export function storeCrimes(crimes) {
    return {
        type: 'STORE_CRIMES',
        crimes
    }
}

export function fetchCrimes(date=`${today.getFullYear()}-${today.getMonth()-1}`) {
    return (dispatch, getState) => {
        let state = getState().appReducer,
            lat   = state.crimeLocation.lat,
            lng   = state.crimeLocation.lng

        clearTimeout(fetchCrimesTimer)
        fetchCrimesTimer = setTimeout(() => {
            dispatch({
                type: 'FETCH_CRIMES'
            })

            superagent.get(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${date}`)
                .end((err, res) => {
                    dispatch(storeCrimes(res.body))
                })
        }, 300);
    }
}
