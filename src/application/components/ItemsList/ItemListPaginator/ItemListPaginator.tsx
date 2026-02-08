import { ITEMS_PAGE } from "@/infrastructure/supabaseClient";
import type { ItemListPaginatorProps } from "./ItemListPaginator.types";
import useItemListPaginator from "./hooks/useItemListPaginator";

const ItemListPaginator = ({ currentPage, totalItems, itemsPerPage = ITEMS_PAGE, onPageClick }: ItemListPaginatorProps) => {
  const [ pages, totalPages, onPageEventHandler ] = useItemListPaginator(totalItems, itemsPerPage, currentPage, onPageClick);
  return (<div className="flex container mb-5"> 
    { totalItems > 0 ? <span className="flex-2 text-left mx-auto">Total: { totalItems }</span> : <></> }
    <span className="flex-2 text-right">
      { currentPage-1 >= 0 ? <span className="cursor-pointer" data-page={ Math.max(currentPage-1, 0) } onClick={ onPageEventHandler }>&lt;</span> : <></> }
      { pages }
      { currentPage +1 < totalPages ? <span className="cursor-pointer" data-page={ Math.min(currentPage+1, totalPages) } onClick={ onPageEventHandler }>&gt;</span> : <></> }
    </span>
  </div>);
}

export default ItemListPaginator;