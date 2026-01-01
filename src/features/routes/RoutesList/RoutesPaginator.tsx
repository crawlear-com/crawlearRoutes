import { ITEMS_PAGE } from "../../../database/supabaseClient";
import type { RoutesPaginatorProps } from "./RoutesPaginator.types";

const RoutesPaginator = ({ currentPage, totalItems, onPageClick }: RoutesPaginatorProps) => {
  const pages: Array<React.JSX.Element> = [];
  const totalPages = Math.ceil(totalItems / ITEMS_PAGE);
  const onPageEventHandler = (e: React.MouseEvent) => {
    const page = Number((e.target as HTMLSpanElement).dataset.page);

    if (page >= 0 && page !== currentPage && page < totalPages) {
      onPageClick(page);
    }
  }

  for(let i=0; i<totalPages; i++) {
    pages.push(<span className={`${ currentPage === i ? "font-bold underline" : "cursor-pointer" }`} data-page={ i } onClick={ onPageEventHandler }> { i + 1 } </span>);
  }

  return (<div className="">  
    { currentPage-1 >= 0 ? <span className="cursor-pointer" data-page={Math.max(currentPage-1, 0)} onClick={ onPageEventHandler }>&lt;</span> : <></> }
    { pages }
    { currentPage +1 < totalPages ? <span className="cursor-pointer" data-page={Math.min(currentPage+1, totalPages)} onClick={ onPageEventHandler }>&gt;</span> : <></> }
  </div>);
}

export default RoutesPaginator;