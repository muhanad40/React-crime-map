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
