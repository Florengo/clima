const initialState = {
    cities: [],
    details: {},
    nextdays: [],
    detailsLocate: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SEARCH_CITY':
            return {
                ...state,
                cities: [...state.cities, action.payload]
            }

        case 'DELETE_CITY':

            let newarray = state.cities.filter(e => e.cardid !== action.payload)
            return {
                ...state,
                cities: newarray
            }

        case 'GET_DETAILS':
            let details = state.cities.find(e => e.id == action.payload)
            return {
                ...state,
                details: details

            }

        case 'GET_NEXY_WEATHER':
            return {
                ...state,
                nextdays: action.payload
            }
        case 'GET_BY_COORD':
            return {
                ...state,
                detailsLocate: action.payload
            }
        case 'REMOVE_DETAIL':
            return {
                ...state,
                details: []
            }
        default: return state
    }
}





export default rootReducer