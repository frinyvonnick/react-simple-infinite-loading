import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'

import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteLoader from 'react-window-infinite-loader'
import { Scrollbars } from 'react-custom-scrollbars'

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
))

class InfiniteLoading extends Component {
  static propTypes = {
    hasMoreItems: PropTypes.bool,
    loadMoreItems: PropTypes.func,
    itemsCount: PropTypes.number,
    children: PropTypes.array.isRequired,
    itemHeight: PropTypes.number.isRequired,
    placeholder: PropTypes.node,
    customScrollbar: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.infiniteLoaderRef = createRef()
    this.fixedSizeListRef = null
  }

  resetloadMoreItemsCache() {
    if (this.infiniteLoaderRef.current) {
      this.infiniteLoaderRef.current.resetloadMoreItemsCache()
    } else {
      throw Error('The InfiniteLoader component is not mounted yet')
    }
  }

  scrollTo(...args) {
    if (this.fixedSizeListRef) {
      this.fixedSizeListRef.scrollTo(...args)
    } else {
      throw Error('The FixedSizeList component is not mounted yet')
    }
  }

  scrollToItem(...args) {
    if (this.fixedSizeListRef) {
      this.fixedSizeListRef.scrollToItem(...args)
    } else {
      throw Error('The FixedSizeList component is not mounted yet')
    }
  }

  render() {
    const {
      children,
      hasMoreItems,
      itemsCount,
      itemHeight,
      loadMoreItems,
      placeholder,
      customScrollbar
    } = this.props

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
            ref={this.infiniteLoaderRef}
          >
            {({ onItemsRendered, ref: setListRef }) => (
              <List
                height={height}
                itemCount={effectiveCount}
                itemSize={itemHeight}
                onItemsRendered={onItemsRendered}
                ref={listRef => {
                  this.fixedSizeListRef = listRef
                  setListRef(listRef)
                }}
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
  }
}

CustomScrollbars.propTypes = {
  onScroll: PropTypes.func.isRequired,
  forwardedRef: PropTypes.func.isRequired,
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

export default InfiniteLoading
