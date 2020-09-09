# react-simple-infinite-loading

[![NPM](https://img.shields.io/npm/v/react-simple-infinite-loading.svg)](https://www.npmjs.com/package/react-simple-infinite-loading) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![gitmoji-changelog](https://img.shields.io/badge/Changelog-gitmoji-brightgreen.svg)](https://github.com/frinyvonnick/gitmoji-changelog)

## Why?

I wrote an article about [creating an infinite loading list with React and GraphQL](https://dev.to/yvonnickfrin/create-an-infinite-loading-list-with-react-and-graphql-19hh). Someone pointed out the React implementation of the list was a bit complex. I figure out it was possible to write an abstraction for this particular case. Here it is!

This component aims to stay easy to use. If your use case needs more options I recommend using directly awesome libraries from [Brian Vaughn](https://github.com/bvaughn) listed in dependencies section.

## Demo

You can find a demo [here](https://codesandbox.io/s/magical-shockley-vhkz8).

## Install

```bash
npm install --save react-simple-infinite-loading
```

## Usage

```jsx
import React from 'react'

import InfiniteLoading from 'react-simple-infinite-loading'

function Example({ items, fetchMore, hasMore }) {
  return (
    <div style={{ width: 300, height: 300 }}>
      <InfiniteLoading
        hasMoreItems={hasMore}
        itemHeight={40}
        loadMoreItems={fetchMore}
      >
        {items.map(item => <div key={item}>{item}</div>)}
      </InfiniteLoading>
    </div>
  )
}
```

[Link to example](/example/README.md)

## Dependencies

`react-simple-infinite-loading` has only three dependencies:

- [react-window](https://github.com/bvaughn/react-window) is made to display efficiently large lists. It only creates components for the visible elements and reuse nodes.
- [react-window-infinite-loader](https://github.com/bvaughn/react-window-infinite-loader/) is a HOC that loads elements just-in-time as user scrolls down the list
- [react-virtualized-auto-sizer](https://github.com/bvaughn/react-virtualized-auto-sizer/) helps you displaying your list so it fits the space available in its parent container.

## Properties

| property name | required | type     | description                                                                                                                                                                                               |
| ------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children      | yes      | function | The children function should return the jsx for an item of the list. An object is passed as parameter containing `item`, `index`, `style`. _You must pass the style to top-level tag of your item's jsx_. |
| items         | yes      | array    | An array of elements. Any type of elements is accepted.                                                                                                                                                   |
| itemHeight    | yes      | number   | The height of an item. All items should have the same height.                                                                                                                                             |
| itemsCount    | no       | number   | The count of items to be loaded, if known. Prevents the scrollbar from changing its size as the items are being loaded.                                                                             |
| hasMoreItems  | no       | boolean  | A boolean that determines if there are still items to load using `loadMoreItems` function.                                                                                                                |
| loadMoreItems | no       | function | A function that will be called each time the list need to load more items.                                                                                                                                |
| placeholder   | no       | node     | Any render-able value like strings or React.Nodes to be displayed while `children` is loading                                                                                                             |
| customScrollbar   | no       | boolean     | A boolean that determines if [react-custom-scrollbars](https://github.com/malte-wessel/react-custom-scrollbars) is used instead of native one                                                      |
| elementClassName   | no       | string     | A React className prop that will be applied to every child container
| ref   | no       | ref or function     | A ref or a callback ref to get component instance so you can call instance's methods (see [Methods section](/README.md#methods))                                                     |

## Methods

**scrollTo(scrollOffset: number): void**

see [FixedSizeList](https://react-window.now.sh/#/api/FixedSizeList) methods section.

**scrollToItem(index: number, align: string = "auto"): void**

see [FixedSizeList](https://react-window.now.sh/#/api/FixedSizeList) methods section.

**resetloadMoreItemsCache(): void**

Clear previously loaded items from cache.

example
```jsx
import React from 'react'

import InfiniteLoading from 'react-simple-infinite-loading'

function Example({ items, fetchMore, hasMore }) {
  const ref = React.useRef()
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

  return (
    <>
      <button onClick={scrollToTop}>Scroll to top</button>
      <button onClick={scrollTo50}>Scroll to 50</button>
      <button onClick={resetCache}>Reset cache</button>
      <div style={{ width: 300, height: 300 }}>
        <InfiniteLoading
          hasMoreItems={hasMore}
          itemHeight={40}
          loadMoreItems={fetchMore}
          ref={ref}
        >
          {items.map(item => <div key={item}>{item}</div>)}
        </InfiniteLoading>
      </div>
    </>
  )
}
```

## License

Apache-2.0 © [frinyvonnick](https://github.com/frinyvonnick)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://yvonnickfrin.dev"><img src="https://avatars0.githubusercontent.com/u/13099512?v=4" width="100px;" alt=""/><br /><sub><b>Yvonnick FRIN</b></sub></a><br /><a href="https://github.com/frinyvonnick/react-simple-infinite-loading/commits?author=frinyvonnick" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/AugustoConti"><img src="https://avatars1.githubusercontent.com/u/8778672?v=4" width="100px;" alt=""/><br /><sub><b>Augusto</b></sub></a><br /><a href="https://github.com/frinyvonnick/react-simple-infinite-loading/commits?author=AugustoConti" title="Documentation">📖</a></td>
    <td align="center"><a href="https://henry-ns.github.io/portfolio/"><img src="https://avatars0.githubusercontent.com/u/16365204?v=4" width="100px;" alt=""/><br /><sub><b>Henrique Martins</b></sub></a><br /><a href="https://github.com/frinyvonnick/react-simple-infinite-loading/commits?author=henry-ns" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Taranys"><img src="https://avatars2.githubusercontent.com/u/4621525?v=4" width="100px;" alt=""/><br /><sub><b>Yoann Prot</b></sub></a><br /><a href="https://github.com/frinyvonnick/react-simple-infinite-loading/commits?author=Taranys" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Orodan"><img src="https://avatars1.githubusercontent.com/u/7422824?v=4" width="100px;" alt=""/><br /><sub><b>Jimmy Kasprzak</b></sub></a><br /><a href="https://github.com/frinyvonnick/react-simple-infinite-loading/commits?author=Orodan" title="Code">💻</a></td>
    <td align="center"><a href="https://about.me/hallackerem"><img src="https://avatars3.githubusercontent.com/u/6216601?v=4" width="100px;" alt=""/><br /><sub><b>Kerem Hallaç</b></sub></a><br /><a href="https://github.com/frinyvonnick/react-simple-infinite-loading/commits?author=keremh" title="Code">💻</a></td>
    <td align="center"><a href="https://timrybicki.com"><img src="https://avatars3.githubusercontent.com/u/39889198?v=4" width="100px;" alt=""/><br /><sub><b>Tim</b></sub></a><br /><a href="https://github.com/frinyvonnick/react-simple-infinite-loading/commits?author=trybick" title="Documentation">📖</a> <a href="https://github.com/frinyvonnick/react-simple-infinite-loading/commits?author=trybick" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/gVirtu"><img src="https://avatars1.githubusercontent.com/u/15658199?v=4" width="100px;" alt=""/><br /><sub><b>Giancarlo França</b></sub></a><br /><a href="https://github.com/frinyvonnick/react-simple-infinite-loading/commits?author=gVirtu" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/gilesbradshaw"><img src="https://avatars0.githubusercontent.com/u/597115?v=4" width="100px;" alt=""/><br /><sub><b>Giles</b></sub></a><br /><a href="https://github.com/frinyvonnick/react-simple-infinite-loading/commits?author=gilesbradshaw" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
