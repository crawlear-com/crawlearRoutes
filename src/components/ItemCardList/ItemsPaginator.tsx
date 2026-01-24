import { ITEMS_PAGE } from "@/database/supabaseClient";
import type { ItemsPaginatorProps } from "./types/ItemsPaginator.types";
import useItemsPaginator from "./hooks/useItemsPaginator";

const ItemsPaginator = ({ currentPage, totalItems, itemsPerPage = ITEMS_PAGE, onPageClick }: ItemsPaginatorProps) => {
  const [ pages, totalPages, onPageEventHandler ] = useItemsPaginator(totalItems, itemsPerPage, currentPage, onPageClick);
  return (<div className="flex container mb-5"> 
    <span className="flex-2 text-left mx-auto">Total: { totalItems }</span>
    <span className="flex-2 text-right">
      { currentPage-1 >= 0 ? <span className="cursor-pointer" data-page={ Math.max(currentPage-1, 0) } onClick={ onPageEventHandler }>&lt;</span> : <></> }
      { pages }
      { currentPage +1 < totalPages ? <span className="cursor-pointer" data-page={ Math.min(currentPage+1, totalPages) } onClick={ onPageEventHandler }>&gt;</span> : <></> }
    </span>
  </div>);
}

export default ItemsPaginator;