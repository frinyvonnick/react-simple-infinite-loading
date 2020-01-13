import React, { useState, useRef, useEffect } from 'react'
import InfiniteLoading from 'react-simple-infinite-loading'

function useStarWarsCharacters() {
  const [characters, setCharacters] = useState([])
  const [nextCharactersUrl, setNextCharactersUrl] = useState()

  useEffect(() => {
    fetch('https://swapi.co/api/people/?page=1')
      .then(res => res.json())
      .then(({ next, results }) => {
        setCharacters(results)
        setNextCharactersUrl(next)
      })
  }, [])

  const loadMoreCharacters = () => {
    fetch(nextCharactersUrl)
      .then(res => res.json())
      .then(({ next, results }) => {
        setCharacters([...characters, ...results])
        setNextCharactersUrl(next)
      })
  }

  return [{ characters, hasMoreCharacters: Boolean(nextCharactersUrl) }, loadMoreCharacters]
}

export default function App() {
  const ref = useRef()
  const [{ characters, hasMoreCharacters }, loadMoreCharacters] = useStarWarsCharacters()
  const scrollToTop = () => {
    if (ref.current) {
      ref.current.scrollTo(0)
    }
  }
  const scrollTo50 = () => {
    if (ref.current) {
      ref.current.scrollToItem(50)
    }
  }
  const resetCache = () => {
    if (ref.current) {
      ref.current.resetloadMoreItemsCache()
    }
  }

  return (
    <div className="app">
      <h1>React simple infinite loading example</h1>

      <button onClick={scrollToTop}>Scroll to top</button>
      <button onClick={scrollTo50}>Scroll to 50</button>
      <button onClick={resetCache}>Reset cache</button>
      <h2>Start scrolling here :</h2>
      <InfiniteLoading
        hasMoreItems={hasMoreCharacters}
        itemHeight={40}
        loadMoreItems={loadMoreCharacters}
        placeholder={<div className="item">Loading...</div>}
        customScrollbar
        ref={ref}
      >
        {characters.map(character => <div className="item" key={character.name}>{character.name}</div>)}
      </InfiniteLoading>
    </div>
  )
}
