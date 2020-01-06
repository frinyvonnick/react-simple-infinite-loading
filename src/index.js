import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteLoader from 'react-window-infinite-loader'
import { Scrollbars } from 'react-custom-scrollbars'

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
))

const InfiniteLoading = forwardRef((
  {
    children,
    hasMoreItems,
    itemsCount,
    itemHeight,
    loadMoreItems,
    placeholder,
    customScrollbar
  },
  ref
) => {
  let effectiveCount = itemsCount
  if (effectiveCount === undefined) {
    effectiveCount = hasMoreItems ? children.length + 1 : children.length
  }

  const isItemLoaded = index => !hasMoreItems || index < children.length

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={effectiveCount}
          loadMoreItems={loadMoreItems}
          ref={ref}
        >
          {({ onItemsRendered, ref }) => (
            <List
              height={height}
              itemCount={effectiveCount}
              itemSize={itemHeight}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={width}
              outerElementType={customScrollbar ? CustomScrollbarsVirtualList : null}
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
})

CustomScrollbars.propTypes = {
  onScroll: PropTypes.func.isRequired,
  forwardedRef: PropTypes.node.isRequired,
  style: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

function CustomScrollbars ({ onScroll, forwardedRef, style, children }) {
  const refSetter = scrollbarsRef => {
    if (scrollbarsRef) {
      forwardedRef(scrollbarsRef.view)
    } else {
      forwardedRef(null)
    }
  }

  return (
    <Scrollbars
      ref={refSetter}
      style={{ ...style, overflow: 'hidden' }}
      onScroll={onScroll}
    >
      {children}
    </Scrollbars>
  )
}

InfiniteLoading.propTypes = {
  hasMoreItems: PropTypes.bool,
  loadMoreItems: PropTypes.func,
  itemsCount: PropTypes.number,
  children: PropTypes.array.isRequired,
  itemHeight: PropTypes.number.isRequired,
  placeholder: PropTypes.node,
  customScrollbar: PropTypes.bool
}

export default InfiniteLoading
