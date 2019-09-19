import React from 'react'

import InfiniteLoading from 'react-simple-infinite-loading'

export default function App() {
  const items = [...Array(100)].map((_, index) => index)

  return (
    <div style={{ width: 300, height: 300 }}>
      <InfiniteLoading
        hasMoreItems={false}
        itemHeight={40}
        loadMoreItems={() => {}}
      >
        {items.map(item => <div key={item}>{item}</div>)}
      </InfiniteLoading>
    </div>
  )
}
