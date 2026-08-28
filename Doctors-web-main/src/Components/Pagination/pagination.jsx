

import ReactPaginate from 'react-paginate';
import './pagination.css';

export default function PaginatedItems({ pageCount , setCurrentPage, currentPage }) {

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={null}
        forcePage={currentPage - 1}
        onPageChange={(e)=>setCurrentPage(e.selected + 1)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        previousLabel={null}
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        pageLinkClassName="pagination-link"
        activeLinkClassName="active"
      />
    </>
  );
}
