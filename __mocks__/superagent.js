'use strict'

/*
 * I've modified this to have a better testing API. Original source:
 * https://gist.github.com/pherris/aa74aa9b8b1a55ea053b
*/

var mockDelay
var mockError
var responses = {}
var requests = []

var MockSuperagent = {
    post(url) {
        this.url = url
        this.method = 'POST'
        this._addToRequestsQueue()
        return this
    },
    get(url) {
        this.url = url
        this.method = 'GET'
        this._addToRequestsQueue()
        return this
    },
    delete(url) {
        this.url = url
        this.method = 'DELETE'
        this._addToRequestsQueue()
        return this
    },
    patch(url) {
        this.url = url
        this.method = 'PATCH'
        this._addToRequestsQueue()
        return this
    },
    _addToRequestsQueue() {
        requests.push({
            url: this.url,
            method: this.method
        })
    },
    send(data) {
        requests[requests.length-1].data = data
        return this
    },
    query() {
        return this
    },
    field() {
        return this
    },
    set() {
        return this
    },
    accept() {
        return this
    },
    timeout() {
        return this
    },
    end: jest.genMockFunction().mockImplementation(function(callback) {
        let responseObj = responses[`${this.url}[${this.method}]`],
            response

        if(!responseObj) {
            response = null
            mockError = 'REQUEST ERROR!'
        } else {
            mockError = null
            response = {
                body: responseObj
            }
        }

        if (mockDelay) {
            this.delayTimer = setTimeout(callback, 0, mockError, response)

            return
        }

        if(callback) {
            callback(mockError, response)
        }
    }),
    //expose helper methods for tests to set
    clearResponses() {
        responses = {}
    },
    getResponses() {
        return responses
    },
    getRequests() {
        return requests
    },
    clearRequests() {
        requests = []
    },
    __setMockDelay(boolValue) {
        mockDelay = boolValue
    },
    setMockResponse(url, method, response) {
        responses[`${url}[${method}]`] = {}
        responses[`${url}[${method}]`] = response
    },
    __setMockError(mockErr) {
        mockError = mockErr
    }
}

module.exports = MockSuperagent
