import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCity } from "../redux/action";
import style from './card.module.css'
import moment from 'moment'
import hum from '../images/humidity2.png';
import pressure from '../images/pressure2.png';
import wind from '../images/wind2.png';



export default function Card(props) {
    const dispatch = useDispatch()
    let cardid = props.info.cardid
    const timeinminutes = props.info.timezone / 60
    const currenttime = moment().utcOffset(timeinminutes).format('h:mm A')

    function handleOnClick(id) {
        dispatch(deleteCity(id))
    }
    let idStyle = `c${props.info.weather[0].icon}`;
    let link = `/details/${props.info.id}`
    return (
        <div className={style.card} id={style[idStyle]}>
            <div className={style.button}>
                <button onClick={() => handleOnClick(cardid)}>x</button>
            </div>
            <Link to={link} className={style.text}>
                <div className={style.rows}>
                    <div>
                        <h1>{props.info.name}</h1>
                        <h2>{currenttime}</h2>
                        <h2 className={style.deleteMargin}>{props.info.weather[0].description.split(' ').map(e => e[0].toUpperCase() + e.slice(1) + ' ')}</h2>
                        <img src={`http://openweathermap.org/img/wn/${props.info.weather[0].icon}@2x.png`} width='100px' height='100px' />
                    </div>
                    <div className={style.allCon}>
                        <div className={style.conditions}>
                            <img src={hum} alt="" width="40px" height="40px" className={style.hum} />
                            <div className={style.each}>
                                <h4 className={style.noMargin}>Humidity</h4>
                                <h4 className={style.noMargin}>{props.info.main.humidity}%</h4>
                            </div>
                        </div>
                        <div className={style.conditions}>
                            <img src={pressure} alt="" width="40px" height="40px" className={style.hum} />
                            <div className={style.each}>
                                <h4 className={style.noMargin}>Pressure</h4>
                                <h4 className={style.noMargin}>{props.info.main.pressure}hPa</h4>
                            </div>
                        </div>
                        <div className={style.conditions}>
                            <img src={wind} alt="" width="40px" height="40px" className={style.hum} />
                            <div className={style.each}>
                                <h4 className={style.noMargin}>Wind</h4>
                                <h4 className={style.noMargin}>{props.info.wind.speed} M/S</h4>

                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className={style.temp}>{props.info.main.temp.toString().slice(0, 2)}°</h1>
                        <div className={style.twoTemps}>
                            <h3 className={style.maxTemp}>{props.info.main.temp_max.toString().slice(0, 2)}°</h3>
                            <h3 className={style.minTemp}>{props.info.main.temp_min.toString().slice(0, 2)}°</h3>
                        </div>
                        <h5>FeelsLike: {props.info.main.feels_like.toString().slice(0, 2)}°</h5>
                    </div>
                </div>
            </Link>
        </div >
    )
}