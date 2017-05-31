import appReducer from '../src/js/reducers/appReducer'
import testResponses from './test_responses'

describe('`appReducer` reducer', () => {
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