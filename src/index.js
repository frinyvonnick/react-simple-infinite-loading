import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteLoader from 'react-window-infinite-loader'

InfiniteLoading.propTypes = {
  hasMoreItems: PropTypes.bool,
  loadMoreItems: PropTypes.func,
  children: PropTypes.array.isRequired,
  itemHeight: PropTypes.number.isRequired,
  placeholder: PropTypes.node
}

InfiniteLoading.defaultProps = {
  hasMoreItems: false,
  loadMoreItems: () => {}
}

function InfiniteLoading({
  children,
  hasMoreItems,
  itemHeight,
  loadMoreItems,
  placeholder
}, ref) {
  const itemsCount = hasMoreItems ? children.length + 1 : children.length
  const isItemLoaded = index => !hasMoreItems || index < children.length

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemsCount}
          loadMoreItems={loadMoreItems}
          ref={ref}
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
                  {children[index] != null ? children[index] : placeholder}
                </div>
              )}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  )
}

export default forwardRef(InfiniteLoading)
