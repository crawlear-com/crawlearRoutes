
const ItemListPaginator = (totalItems: number, itemsPerPage: number,
  currentPage: number, onPageClick: (page: number) => void): [ Array<React.JSX.Element>,
    number, (e: React.MouseEvent) => void ] => {
  const pages: Array<React.JSX.Element> = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const onPageEventHandler = (e: React.MouseEvent) => {
    const page = Number((e.target as HTMLSpanElement).dataset.page);

    if (page >= 0 && page !== currentPage && page < totalPages) {
      onPageClick(page);
    }
  }

  for(let i=0; i<totalPages; i++) {
    pages.push(<span key={ i } className={`${ currentPage === i ? "font-bold" : "cursor-pointer" }`} data-page={ i } onClick={ onPageEventHandler }> { i + 1 } </span>);
  }

  return [ pages, totalPages, onPageEventHandler ];

}

export default ItemListPaginator;