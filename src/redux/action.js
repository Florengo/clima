import axios from 'axios'
const URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const KEY = '4ae2636d8dfbdc3044bede63951a019b';
let cardid = 1
export function searchCity(city) {
    return function (dispatch) {
        return axios.get(`${URL}${city}&appid=${KEY}&units=metric`)
            .then((response) => {
                dispatch({
                    type: 'SEARCH_CITY',
                    payload: { ...response.data, cardid: cardid++ }
                })
            })
    }
}

export function deleteCity(id) {
    return {
        type: 'DELETE_CITY',
        payload: id
    }

}

export function getDetails(id) {
    return {
        type: 'GET_DETAILS',
        payload: id
    }
}

export function getNextWeather(lat, lon) {
    return async function (dispatch) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=4ed91553e8521732e806aee7a1072022&units=metric`)
        dispatch({
            type: 'GET_NEXY_WEATHER',
            payload: response.data
        })
    }
}

export function getCityByCoords(lon, lat) {
    return async function (dispatch) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4ae2636d8dfbdc3044bede63951a019b&units=metric`)
        console.log('action')
        dispatch({
            type: 'GET_BY_COORD',
            payload: response.data
        })
    }
}

export function deleteDetail() {
    return {
        type: 'REMOVE_DETAIL'
    }
}