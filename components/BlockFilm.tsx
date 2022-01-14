import React, { useState, useEffect } from 'react'
import s from '../styles/BlockFilm.module.css'

function safeJSONParse<T>(val: string): T | null {
    try {
        return JSON.parse(val);
    } catch {
        return null;
    }
}

const BlockFilm = (props) => {
    const dataFilm = props.dataFilm;
    const [activeStar, setActiveStar] = useState(false);
    const changeArrInLocal = (key) => localStorage.setItem("markedFilms", key)

    const changeActeveStar = () => {
        const localData = safeJSONParse<number[]>(localStorage.getItem("markedFilms"))
        if(activeStar){
            setActiveStar(false);
            if (localData && localData.length) {
                changeArrInLocal(JSON.stringify(localData.filter(element => element !== dataFilm.id)))
            }
        }else{
            setActiveStar(true);
            if(!localData) changeArrInLocal(JSON.stringify([dataFilm.id]))
            else changeArrInLocal(JSON.stringify([...localData, dataFilm.id]))
        }
    } 
    
    useEffect(() => {
        const localData = safeJSONParse<number[]>(localStorage.getItem("markedFilms"))
        localData && localData.forEach(el => el === dataFilm.id && setActiveStar(true))
    }, [])

    return (
        <div className={s.blockFilm}>
            <div className={s.img} 
                style={
                    dataFilm.backdrop_path &&
                     {background: `url('https://www.themoviedb.org/t/p/w300_and_h450_bestv2${dataFilm.poster_path}') center/cover`}
            }>
                <div className={s.starLink}>
                    <a href={`https://www.themoviedb.org/movie/${dataFilm.id}`}>
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                    </a>
                    <div className={activeStar ? `${s.star} ${s.active}` : s.star} onClick={changeActeveStar}>
                        <svg enableBackground="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M29.895,12.52c-0.235-0.704-0.829-1.209-1.549-1.319l-7.309-1.095l-3.29-6.984C17.42,2.43,16.751,2,16,2  s-1.42,0.43-1.747,1.122l-3.242,6.959l-7.357,1.12c-0.72,0.11-1.313,0.615-1.549,1.319c-0.241,0.723-0.063,1.507,0.465,2.046  l5.321,5.446l-1.257,7.676c-0.125,0.767,0.185,1.518,0.811,1.959c0.602,0.427,1.376,0.469,2.02,0.114l6.489-3.624l6.581,3.624  c0.646,0.355,1.418,0.311,2.02-0.114c0.626-0.441,0.937-1.192,0.811-1.959l-1.259-7.686l5.323-5.436  C29.958,14.027,30.136,13.243,29.895,12.52z" id="XMLID_328_"/></svg>
                    </div>
                </div>
               
                <div className={s.rating}>
                    <p>{dataFilm.vote_average}</p>
                </div>
            </div>
            <div className={s.text}>
                <h4>{dataFilm.original_title}</h4>
                <p>{dataFilm.release_date}</p>
            </div>
        </div>
    )
}

export default BlockFilm