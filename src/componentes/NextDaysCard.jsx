import React from "react";
import drop from '../images/drop.png'
import style from './nextdays.module.css'

export default function NextDays({ time, icon, min, max, pop }) {

    const tiempo = new Date(time * 1000)
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const date = tiempo.getDate();
    const day = `${week[tiempo.getDay()]} ${date}`;

    return (
        <div className={style.card}>
            <p className={style.noMargin}>{day}</p>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} width='80px' height='80px'  className={style.img} />
            <div className={style.pop} >
                <div>
                    <img src={drop} width='15px' height='15px' />
                </div>
                <p className={style.noMargin}>{Math.floor(pop)}%</p>
            </div>
            <div className={style.temps}>
                <p className={style.noMargin}>{max}°/</p>
                <p className={style.noMargin}>{min}°</p>
            </div>
        </div>
    )
}