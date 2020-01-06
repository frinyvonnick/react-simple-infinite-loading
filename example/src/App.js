import React, { useState, useRef } from 'react'
import InfiniteLoading from 'react-simple-infinite-loading'

export default function App() {
  const [items, setItems] = useState([...Array(100)].map((_, index) => index))
  const ref = useRef()
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

  const loadMoreItems = () => {
    const newItems = [...Array(100)].map((_, index) => items.length + index)

    return new Promise((resolve) => {
      setTimeout(() => {
        setItems([...items, ...newItems])
        resolve()
      }, 300)
     })
  }

  return (
    <div className="app">
      <h1>React simple infinite loading example</h1>

      <button onClick={scrollToTop}>Scroll to top</button>
      <button onClick={scrollTo50}>Scroll to 50</button>
      <button onClick={resetCache}>Reset cache</button>
      <h2>Start scrolling here :</h2>
      <InfiniteLoading
        hasMoreItems
        itemHeight={40}
        loadMoreItems={loadMoreItems}
        customScrollbar
        ref={ref}
      >
        {items.map(item => <div className="item" key={item}>{item}</div>)}
      </InfiniteLoading>
    </div>
  )
}
