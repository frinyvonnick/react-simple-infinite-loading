import React from 'react'

import InfiniteLoading from 'react-simple-infinite-loading'

export default function App() {
  const items = [...Array(100)].map((_, index) => index)

  return (
    <div style={{ width: 300, height: 300 }}>
      <InfiniteLoading
        items={items}
        itemHeight={40}
        hasMoreItems={false}
        loadMoreItems={() => {}}
      >
        {({ item }) => <div>{item}</div>}
      </InfiniteLoading>
    </div>
  )
}
