import React, { useState, useRef, useEffect } from 'react'
import InfiniteLoading from 'react-simple-infinite-loading'

function useStarWarsCharacters() {
  const [characters, setCharacters] = useState([])
  const [nextCharactersUrl, setNextCharactersUrl] = useState()

  useEffect(() => {
    fetch('https://swapi.dev/api/people/?page=1')
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
        setNextCharactersUrl(next)
        if (characters.some(char => char.name === results[0].name)) return
        setCharacters([...characters, ...results])
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

      <div className="buttons">
        <button onClick={scrollToTop}>Scroll to top</button>
        <button onClick={scrollTo50}>Scroll to 50</button>
        <button onClick={resetCache}>Reset cache</button>
      </div>

      <div className="list-container">
        <InfiniteLoading
          hasMoreItems={hasMoreCharacters}
          itemHeight={40}
          loadMoreItems={loadMoreCharacters}
          placeholder={<div className="item">Loading...</div>}
          customScrollbar
          ref={ref}
        >
          {characters.map((character, index) => (
            <div
              className={`item${index % 2 === 0 ? ' item-striped' : ''}`}
              key={character.name}
            >
              {character.name}
            </div>
          ))}
        </InfiniteLoading>
      </div>
      <hr/>
        <p className="credit">This list was made with <span role="img" aria-label="hearth">❤️</span> by <a href="https://github.com/frinyvonnick/react-simple-infinite-loading">react-simple-infinite-loading</a><br/>Feel free to leave a <span role="img" aria-label="star">⭐️</span></p>
    </div>
  )
}
