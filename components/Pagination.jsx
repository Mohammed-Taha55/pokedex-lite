"use client";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // show a window of up to 5 page numbers around the current page
  function getPageNumbers() {
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 py-6 flex-wrap">

      <button
        id="pagination-prev"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        ← Prev
      </button>

      {pageNumbers[0] > 1 && (
        <>
          <PageBtn num={1} current={page} onClick={onPageChange} />
          {pageNumbers[0] > 2 && <span className="text-gray-400 text-sm px-1">…</span>}
        </>
      )}

      {pageNumbers.map((num) => (
        <PageBtn key={num} num={num} current={page} onClick={onPageChange} />
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="text-gray-400 text-sm px-1">…</span>
          )}
          <PageBtn num={totalPages} current={page} onClick={onPageChange} />
        </>
      )}

      <button
        id="pagination-next"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Next →
      </button>

    </div>
  );
}

function PageBtn({ num, current, onClick }) {
  const isActive = num === current;
  return (
    <button
      id={`pagination-page-${num}`}
      onClick={() => onClick(num)}
      className={`w-9 h-9 rounded-lg text-sm font-medium transition
        ${isActive ? "bg-red-500 text-white border border-red-500" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
    >
      {num}
    </button>
  );
}
