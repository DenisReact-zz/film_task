import React, { useState, useEffect } from 'react'
import s from '../styles/Home.module.css'
import BlockFilm from '../components/BlockFilm'
import Filter from '../components/Filter'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilms, setCurrentFilms] = useState([]);
  const [filter, setFlter] = useState<string>("descending");
  const changeFilterHandler = (str: string) => setFlter(str); 


const fetchFilms = (currentFilter: string) => {
  const checkFilter = currentFilter === "descending" ? currentPage : 26 - currentPage;
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=82317c5aa540a6308c278894685205da&language=en-US&page=${checkFilter}`)
    .then(data => data.json())
    .then(json => {
      setCurrentFilms(json.results)
  })
  }
   
  useEffect(() => {
    if(!router.isReady) return
    const queryPage = router.query.page;
    if(Number(queryPage) < 26){
      queryPage && setCurrentPage(Number(queryPage))
    }else if(Number(queryPage) > 25){
      setCurrentPage(25)
    }
  }, [router.isReady])

  useEffect(() => {
    fetchFilms(filter);
    router.push(`/?page=${currentPage}`)
  }, [currentPage, filter])

  const prevPage = () =>  currentPage > 1 && setCurrentPage(currentPage - 1);
  const nextPage = () => currentPage <= 24 && setCurrentPage(currentPage + 1);
  
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
