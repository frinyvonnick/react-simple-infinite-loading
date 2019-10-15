import React, { useState } from 'react'

import InfiniteLoading from 'react-simple-infinite-loading'

export default function App() {
  const [items, setItems] = useState([...Array(100)].map((_, index) => index))

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
    <div style={{ width: 300, height: 300 }}>
      <InfiniteLoading
        hasMoreItems
        itemHeight={40}
        loadMoreItems={loadMoreItems}
      >
        {items.map(item => <div key={item}>{item}</div>)}
      </InfiniteLoading>
    </div>
  )
}
