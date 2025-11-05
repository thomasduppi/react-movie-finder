interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export function Pagination({ page, totalPages, setPage }: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const total = totalPages;

        if (total <= 10) {
            for (let i = 1; i <= total; i++) pages.push(i);
            return pages;
        }

        pages.push(1);

        if (page > 4) {
            pages.push("...");
        }

        const start = Math.max(2, page - 2);
        const end = Math.min(total - 1, page + 2);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < total - 3) {
            pages.push("...");
        }

        pages.push(total);
        return pages;
    };


  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <button
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-2 bg-gray-800 text-white border-none rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Prev
      </button>

      {getPageNumbers().map((num, index) =>
        num === "..."
          ? <span key={index} className="text-gray-400 px-2">...</span>
          : (
            <button
              key={index}
              onClick={() => setPage(num as number)}
              className={`px-3 py-2 rounded-xl border-none ${
                page === num
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {num}
            </button>
          )
      )}

      <button
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-2 bg-gray-800 text-white border-none rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Next
      </button>
    </div>
  );
}
