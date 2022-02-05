const URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const KEY = '4ae2636d8dfbdc3044bede63951a019b';

export default async function Api(city) {
    const r = await fetch(`${URL}${city}&appid=${KEY}&units=metric`);
    const data = await r.json();
    return data;
}