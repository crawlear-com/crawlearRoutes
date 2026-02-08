import type React from "react";

type ItemsCardListProps<T> = {
  card: (item: T) => React.ReactElement,
  items: Array<T>,
  infiniteScroll?: boolean
}

export type { ItemsCardListProps };