import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

InfiniteLoading.propTypes = {
  children: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  itemHeight: PropTypes.number.isRequired,
  loadMoreItems: PropTypes.func,
  hasMoreItems: PropTypes.bool
};

InfiniteLoading.defaultProps = {
  loadMoreItems: () => {},
  hasMoreItems: false
};

const cloneWithStyle = (child, style) =>
  cloneElement(child, { style: { ...style, ...child.props.style } });

export default function InfiniteLoading({
  items,
  hasMoreItems,
  loadMoreItems,
  itemHeight,
  children
}) {
  const itemsCount = hasMoreItems ? items.length + 1 : items.length;
  const isItemLoaded = index => !hasMoreItems || index < items.length;

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
              {({ index, style }) =>
                cloneWithStyle(children({ item: items[index], index }), style)
              }
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
}
