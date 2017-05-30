import superagent from 'superagent'

export function setCrimeDate(date) {
    return {
        type: 'SET_CRIME_DATE',
        date
    }
}

export function storeCrimes(crimes) {
    return {
        type: 'STORE_CRIMES',
        crimes
    }
}

export function fetchCrimes() {
	return (dispatch, getState) => {
		let state = getState().appReducer,
			lat   = state.crimeLocation.lat,
			lng   = state.crimeLocation.lng,
			date  = state.crimeDate

		dispatch({
			type: 'FETCH_CRIMES'
		})

		superagent.get(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${date}`)
			.end((err, res) => {
				dispatch(storeCrimes(res.body))
			})
	}
}
