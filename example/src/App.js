import React, { Component } from 'react'

import InfiniteLoading from 'react-simple-infinite-loading'

export default class App extends Component {
  render () {
    const items = Array.from({ length: 100 }).map((_, index) => index)

    return (
      <div style={{ width: 300, height: 300 }}>
        <InfiniteLoading items={items} itemHeight={40} hasMoreItems={false} loadMoreItems={() => {}}>
          {({ item, style }) => (
            <div style={style}>{item}</div>
          )}
        </InfiniteLoading>
      </div>
    )
  }
}
