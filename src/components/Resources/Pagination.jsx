import React from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({ pageIndex, totalPages, onPageChange }) {
  return (
    <div className="w-full flex justify-center mt-6">
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        previousLabel="< Prev"
        onPageChange={(e) => onPageChange(e.selected)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        forcePage={pageIndex}
        containerClassName="flex gap-2"
        pageClassName="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
        activeClassName="!bg-blue-600 !text-white"
        previousClassName="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
        nextClassName="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
        disabledClassName="cursor-not-allowed opacity-50"
      />
    </div>
  );
}
