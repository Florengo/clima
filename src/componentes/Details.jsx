import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDetails, getNextWeather } from "../redux/action";
import style from './details.module.css'
import moment from "moment";
import hum from '../images/humidity.png';
import pressure from '../images/pressure.png';
import wind from '../images/wind.png';
import NextDays from "./NextDaysCard";
import MapView from './MapView'

export default function Details(props) {
    const dispatch = useDispatch();
    const details2 = useSelector(state => state.cities);
    const nextDaysInfo = useSelector(state => state.nextdays);
    let id = props.match.params.id;
    let details = details2.filter(e => e.id == id)
    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getNextWeather(details[0].coord.lat, details[0].coord.lon))
    }, [details[0]])

    console.log(details[0])

    const timeinminutes = details[0].timezone / 60
    const currenttime = moment().utcOffset(timeinminutes).format('h:mm A')

    return (
        details[0].name ? (
            <div>
                <div className={style.card} >
                    <div className={style.rows}>
                        <div>
                            <h1>{details[0].name}</h1>
                            <h2>{currenttime}</h2>
                            <h2 className={style.deleteMargin}>{details[0].weather[0].description.split(' ').map(e => e[0].toUpperCase() + e.slice(1) + ' ')}</h2>
                            <img src={`http://openweathermap.org/img/wn/${details[0].weather[0].icon}@2x.png`} width='100px' height='100px' />
                        </div>
                        <div className={style.allCon}>
                            <div className={style.conditions}>
                                <img src={hum} alt="" width="40px" height="40px" className={style.hum} />
                                <div className={style.each}>
                                    <h4 className={style.noMargin}>Humidity</h4>
                                    <h4 className={style.noMargin}>{details[0].main.humidity}%</h4>
                                </div>
                            </div>
                            <div className={style.conditions}>
                                <img src={pressure} alt="" width="40px" height="40px" className={style.hum} />
                                <div className={style.each}>
                                    <h4 className={style.noMargin}>Pressure</h4>
                                    <h4 className={style.noMargin}>{details[0].main.pressure}hPa</h4>
                                </div>
                            </div>
                            <div className={style.conditions}>
                                <img src={wind} alt="" width="40px" height="40px" className={style.hum} />
                                <div className={style.each}>
                                    <h4 className={style.noMargin}>Wind</h4>
                                    <h4 className={style.noMargin}>{details[0].wind.speed} M/S</h4>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className={style.temp}>{details[0].main.temp.toString().slice(0, 2)}°</h1>
                            <div className={style.twoTemps}>
                                <p className={style.maxTemp}>The high will be: {details[0].main.temp_max.toString().slice(0, 2)}°</p>
                                {/* <h3 className={style.minTemp}>{details[0].main.temp_min.toString().slice(0, 2)}°</h3> */}
                            </div>
                            <p>FeelsLike: {details[0].main.feels_like.toString().slice(0, 2)}°</p>
                        </div>
                    </div>
                </div >
                <div className={style.nextdays}>
                    {
                        nextDaysInfo && nextDaysInfo.daily.map(d => {
                            return <NextDays pop={d.pop} time={d.dt} icon={d.weather[0].icon} min={Math.round(d.temp.min)} max={Math.round(d.temp.max)} />
                        }
                        )
                    }
                </div>
                <MapView lat={details[0].coord.lat} lon={details[0].coord.lon} />
            </div>
        ) : <h1>Loading...</h1>


    )
}
