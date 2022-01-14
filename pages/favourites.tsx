import React, { useState, useEffect } from 'react'
import s from '../styles/favourites.module.css'
import BlockFilm from '../components/BlockFilm.tsx'
import Link from 'next/link'

export default function Home() {
  const [favouriteFilms, setFavouriteFilms] = useState([]);

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("markedFilms")) !== "[]" && localStorage.getItem("markedFilms")){
      JSON.parse(localStorage.getItem("markedFilms")).forEach(el => {
        fetch(`https://api.themoviedb.org/3/movie/${el}?api_key=82317c5aa540a6308c278894685205da&language=en-US`)
        .then(data => data.json())
        .then(json => {
          setFavouriteFilms(old => [...old, json])
        })
      })
    }
  }, [])

  return (
    <div className={s.container}>
      <Link href="/">
        <a className={s.home}>&#8735;</a>
      </Link>
      <h2>Your Favourite</h2>
      <div className={s.blocks}>
        {
          favouriteFilms.length !== 0 ? favouriteFilms.map(el => <BlockFilm key={el.id} dataFilm={el} />) :
          "It's empty"
        }
      </div>
    </div>
  )
}
