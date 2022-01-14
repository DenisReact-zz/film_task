import React, { useState, useEffect } from 'react'
import s from '../styles/Home.module.css'
import BlockFilm from '../components/BlockFilm.tsx'
import Filter from '../components/Filter'
import Link from 'next/link'

export default function Home() {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentFilms, setCurrentFilms] = useState([]);

  const [filter, setFlter] = useState<string>("descending");
  const changeFilterHandler = (str: string) => setFlter(str); 


  const fetchFilms = (currentFilter: string) => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=82317c5aa540a6308c278894685205da&language=en-US&page=
    ${currentFilter === "descending" ? currentPage : 26 - currentPage}`)
      .then(data => data.json())
      .then(json => {
        setCurrentFilms(json.results)
    })
  }
  useEffect(() => {
    if (/\?page\=\d+/.test(window.location.href)) {
      let thisPage: number = Number(window.location.href.match(/(?<=page=)\d+/)[0]);
      if(thisPage > 25){
        thisPage = 25
        let baseUrl = window.location.href.split("?")[0];
        setTimeout(() => {
          window.history.pushState('name', '', baseUrl + `?page=25`);
        },200)
      }
      setCurrentPage(thisPage);
    }else{
      fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=82317c5aa540a6308c278894685205da&language=en-US&page=1")
      .then(data => data.json())
      .then(json => {
        setCurrentFilms(json.results)
      })
    }
  }, [])

  useEffect(() => {
    fetchFilms(filter);
    let baseUrl = window.location.href.split("?")[0];
    window.history.pushState('name', '', baseUrl + `?page=${currentPage}`);
  }, [currentPage, filter])

  const prevPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  } 
  const nextPage = () => {
    if(currentPage <= 24){
      setCurrentPage(old => old + 1)
    }
  } 
  
  return (
    <div className={s.container}>
      <Link href="/favourites">
        <a className={s.favourite}>
          <img src="/images/star.svg" alt="" />
        </a>
      </Link>
      <h2>Top 500 films on TMDB</h2>
      <Filter onChangeFilter={changeFilterHandler} />
      <div className={s.blocks}>
        {
          currentFilms.map(el => <BlockFilm key={el.id} dataFilm={el} />)
        }
      </div>
      <div className={s.navigation}>
          <button onClick={prevPage} className={s.prev}>&#8735;</button>
            <p>{currentPage}</p>
          <button onClick={nextPage} className={s.next}>&#8735;</button>
        </div>
    </div>
  )
}
