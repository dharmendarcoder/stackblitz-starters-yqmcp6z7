"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex -space-x-px">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 border ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {page}
          </button>
        ))}
      </nav>
    </div>
  );
}
