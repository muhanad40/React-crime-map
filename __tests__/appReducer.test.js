import appReducer from '../src/js/reducers/appReducer'
import testResponses from './test_responses'

describe('`appReducer` reducer', () => {
    it('should store a crime date', () => {
        let initialState = {
                crimeDate: []
            },
            newState = appReducer(initialState, {
                type: 'SET_CRIME_DATE',
                date: '01-01-2017'
            })

        expect(newState.crimeDate).toEqual('01-01-2017')
    })

    it('should store a list of crimes', () => {
        let initialState = {
                crimes: []
            },
            newState = appReducer(initialState, {
                type: 'STORE_CRIMES',
                crimes: testResponses.crimes
            })

        expect(newState.crimes).toEqual(testResponses.crimes)
    })
})