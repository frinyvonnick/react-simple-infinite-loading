import React from 'react'
import PropTypes from 'prop-types'

import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import AutoSizer from 'react-virtualized-auto-sizer'

InfiniteLoading.propTypes = {
  children: PropTypes.array.isRequired,
  hasMoreItems: PropTypes.bool,
  itemHeight: PropTypes.number.isRequired,
  loadMoreItems: PropTypes.func
}

InfiniteLoading.defaultProps = {
  hasMoreItems: false,
  loadMoreItems: () => {}
}

export default function InfiniteLoading({
  children,
  hasMoreItems,
  itemHeight,
  loadMoreItems
}) {
  const itemsCount = hasMoreItems ? children.length + 1 : children.length
  const isItemLoaded = index => !hasMoreItems || index < children.length

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemsCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              height={height}
              itemCount={itemsCount}
              itemSize={itemHeight}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={width}
            >
              {({ index, style }) => (
                <div style={style}>
                  {children[index]}
                </div>
              )}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  )
}
